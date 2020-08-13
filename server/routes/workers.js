import express from 'express';
import CompanyModel from '../models/companyModel.js';
import WorkerModel from '../models/workerModel.js';

const router = express.Router();

router.get('/:companyId/list', async (req, res) => {
  const { companyId } = req.params;
  try {
    const company = await CompanyModel.findOne({ _id: companyId }).populate('workers');
    console.log()
    if (company) {
      const list = company.workers.map(worker => ({
        _id: worker._id,
        name: worker.generalInfo.lastName + ' ' + worker.generalInfo.firstName + ' ' + worker.generalInfo.middleName,
        profession: worker.profInfo.profession
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

router.post('/:companyId/worker', async (req, res) => {
  const { companyId } = req.params;
  const { generalInfo, profInfo } = req.body;
  console.log(generalInfo, profInfo)
  // Security
  // if (req.session.company._id !== companyId) {
  //   return res.status(401).json({ msg: "Unauthorized" });
  // }
  const newWorker = new WorkerModel({
    generalInfo,
    profInfo,
    medicalExams: [],
    ohsDocs: []
  })
  try {
    await newWorker.save();
    await CompanyModel.findByIdAndUpdate(companyId, { $push: { workers: newWorker } });
    return res.status(200).end();
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Load failed!", serverMsg: error.message });
  }
});

export default router;
