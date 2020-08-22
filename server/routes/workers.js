import express from 'express';
import CompanyModel from '../models/companyModel.js';
import WorkerModel from '../models/workerModel.js';
import multer from "multer";
import { scanStorage } from "../middleware/multer.js";
import OhsDocModel from "../models/ohsDocModel.js";
import MedicalDocModel from '../models/medicalExamModel.js'
import fillTemplates from "../templater/fillTemplates.js";
import fs from "fs";
import { medStorage } from "../middleware/multer.js";
import fileUpload from "express-fileupload";
import parseXlsx from '../xlParcer/index.js';
import bcrypt from 'bcrypt';
import rimraf from 'rimraf';


const router = express.Router();

router.post('/uploadWorkers', fileUpload(), async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('NO files were uploaded');
  }
  try {
    const file = req.files.xlsx.data;
    const company = await CompanyModel.findById(req.session.company._id);
    await parseXlsx(file, company);
    return res.status(200).end();
  } catch (error) {
    console.log(error)
    return res.status(500).send('sorry')
  }
})

router.get('/:companyId/list', async (req, res) => {
  const { companyId } = req.params;
  try {
    const company = await CompanyModel.findOne({ _id: companyId }).populate('workers');
    if (company) {
      const list = company.workers.map(worker => ({
        _id: worker._id,
        name: worker.generalInfo.lastName + ' ' + worker.generalInfo.firstName + ' ' + worker.generalInfo.middleName,
        profession: worker.profInfo.position
      }));
      return res.status(200).json({ list });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Load failed!", serverMsg: error.message });
  }
  res.sendStatus(404);
})

router.get('/:companyId/worker/:workerId', async (req, res) => {
  const { companyId, workerId } = req.params;
  // if (req.session.company._id !== companyId) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  const worker = await WorkerModel.findById(workerId);
  if (worker) {
    return res.status(200).json(worker);
  }
  return res.status(404).json({ msg: "Not Found" })
});

router.delete('/:companyId/worker/:workerId', async (req, res) => {
  const { companyId, workerId } = req.params;
  const {secret} = req.headers;
  // if (req.session.company._id !== companyId) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  const company = await CompanyModel.findById(companyId);
  const path = `${process.env.PWD}/fileStore/${companyId}/${workerId}`;
  if (await bcrypt.compare(secret, company.fireSecret)) {
    try {
      await rimraf(path, {}, (error) => {console.log(error)});
      await WorkerModel.findByIdAndRemove(workerId);
      await CompanyModel.findByIdAndUpdate(companyId, { $pull: { workers: { $in: [workerId] } } });
      res.status(200).end()
    } catch (error) {
      res.status(500).json({ msg: 'Failed to remove worker', serverMsg: error.message });
    }
  } else {
    res.status(264).json({msg: "Неправильный секретный ключ"})
  }

});

router.patch('/:companyId/worker/:workerId', async (req, res) => {
  const { companyId, workerId } = req.params;
  const { generalInfo, profInfo } = req.body;
  // if (req.session.company._id !== companyId) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  try {
    await WorkerModel.findByIdAndUpdate(workerId, { $set: { "generalInfo": generalInfo, "profInfo": profInfo } });
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ msg: 'Failed to remove worker', serverMsg: error.message });
  }

});

router.post('/:companyId/worker', async (req, res) => {
  const { companyId } = req.params;
  const { generalInfo, profInfo } = req.body;

  // Security
  // if (req.session.company._id !== companyId) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  // берем компанию
  const company = await CompanyModel.findById(companyId);

  // новый воркер без файлов
  const newWorker = new WorkerModel({
    generalInfo,
    profInfo,
    medicalExams: [],
    ohsDocs: []
  });
  // генерируем все файлы и возвращаем урлы из функции
  const { basePath, downloadPath } = await fillTemplates(company, newWorker._id, generalInfo, profInfo);
  // читаем директорию с сгенерированными файлами
  let files = await fs.promises.readdir(basePath);
  // приводим все файлы к объекту с правильными полями
  files = files.map(file => {
    const meta = fs.statSync(basePath + file);
    file = {
      filename: file, size: meta.size, originalname: file,
      path: `${basePath}${file}`,
      downloadPath: `${downloadPath}${file}`,
    };
    return file;
  })
  // создаем на каждый обьект file mongo document
  files.forEach((file) => {
    const doc = new OhsDocModel({
      metadata: file,
    })
    newWorker.unsignedOhsIds.push(doc._id);
    newWorker.ohsDocs.push(doc);
  })
  // сохраняем
  try {
    await newWorker.save();
    await CompanyModel.findByIdAndUpdate(companyId, { $push: { workers: newWorker } });
    return res.status(200).end();
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Load failed!", serverMsg: error.message });
  }
});


router.put('/:companyId/worker/:workerId', multer({ storage: scanStorage }).single('fileStore[]'),
  async (req, res) => {
    const { workerId, companyId } = req.params;
    const metadata = {
      ...req.file,
      downloadPath: `http://localhost:3001/fileStore/${companyId}/${workerId}/${req.file.originalname}`
    };
    try {
      const doc = new OhsDocModel({
        metadata,
        isSigned: true,
      });

      await WorkerModel.findByIdAndUpdate(workerId, { $push: { ohsDocs: doc, signedOhsIds: doc._id } });
      res.status(200).json({ msg: 'document successfully been added to fileStorage and database.' });
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ msg: error.message });
    }
  });

router.post('/:companyId/worker/:workerId/med/:medType',
  multer({ storage: medStorage }).array('files', 2),
  async (req, res) => {
    const {workerId, companyId, medType} = req.params;

    const {dateofmed, isalreadyexist} = req.headers;
    if (isalreadyexist) {
      return res.status(200).json({
        msg: `Medical document for worker ID: ${workerId} has the same name then previous one`
      });
    }
    try {
      const medDoc = new MedicalDocModel({
        type: medType,
        passportMetadata: {
          ...req.files[0],
          downloadPath: `http://localhost:3001/fileStore/${companyId}/${workerId}/meds/${req.files[0].originalname}`
        },
        doctorOpinionMetadata: {
          ...req.files[1],
          downloadPath: `http://localhost:3001/fileStore/${companyId}/${workerId}/meds/${req.files[1].originalname}`
        },
        createdAt: new Date(dateofmed),
      });
      await WorkerModel.findByIdAndUpdate(workerId, { $push: { medicalExams: medDoc } });
      res.status(200).json({
        msg: `Medical document for worker ID: ${workerId} successfully been added to fileStorage and database.`
      });
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ msg: error.message });
    }
  })

export default router;
