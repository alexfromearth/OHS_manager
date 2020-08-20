import parseXlsx from './parseXlsx.js';
import fillTemplates from '../templater/fillTemplates.js';
import WorkerModel from '../models/workerModel.js';
import OhsDocModel from '../models/ohsDocModel.js';
import CompanyModel from '../models/companyModel.js';
import fs from 'fs'

export default async (file, company) => {
  const workerArr = parseXlsx(file);
  for (let index = 0; index < workerArr.length; index++) {
    const { generalInfo, profInfo } = workerArr[index];
    //////////////////////////
    // workerArr.forEach( async ({ generalInfo, profInfo }, index) => {
    const newWorker = new WorkerModel({
      generalInfo,
      profInfo,
      medicalExams: [],
      ohsDocs: [],
      signedOhsIds: [],
      unsignedOhsIds: [],
    })
    const { basePath, downloadPath } = await fillTemplates(company, newWorker._id, newWorker.generalInfo, newWorker.profInfo);
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
    await newWorker.save();
    await CompanyModel.findByIdAndUpdate(company._id, { $push: { workers: newWorker } });
  }
  // ) /////////////////////////////////////////
  return true;
}
