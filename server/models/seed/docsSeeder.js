import mongoose from 'mongoose';
import OhsDocModel from "../ohsDocModel.js";
import MedicalExamModel from '../medicalExamModel.js';
import workerModel from '../workerModel.js';
import CompanyModel from '../companyModel.js';
import docTemplateModel from '../docTemplatesModel.js';
import fillTemplates from '../../templater/fillTemplates.js';
import bcrypt from 'bcrypt';
import fs from 'fs';

// mongoose.pluralize(null);
mongoose.connect('mongodb://localhost/ohs_manager', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'Ошибка соединения с MongoDB'));

(async () => {

  console.log("seeding started")
  // Creating workers
  const worker1 = new workerModel({
    generalInfo: {
      firstName: "Василий",
      lastName: "Беляев",
      middleName: "Иванович",
      birthday: "1950-12-31",
      birthPlace: "деревня Грязь, дом 23 к2",
      address: "деревня Грязь, дом 22",
      sex: "Мужской",
    },
    profInfo: {
      education: "Среднее специальное",
      position: "Слесарь",
      workExperience: "40 лет",
      structuralSubdivision: "Служба хоз. обеспечения",
      startWorkDate: "2020-12-1"
    },
    medicalExams: [],
    ohsDocs: [],
    unsignedOhsIds: [],
    signedOhsIds: [],
  })
  const worker2 = new workerModel({
    generalInfo: {
      firstName: "Елена",
      lastName: "Ленина",
      middleName: "Иосифна",
      birthday: "1978-9-15",
      birthPlace: "Деревня Синьково",
      address: "Сыктывкар, Окрябрьский пр. дом 5",
      sex: "Мужской",
    },
    profInfo: {
      education: "Высшее магистратура",
      position: "Бухгалтер",
      workExperience: "5 лет",
      structuralSubdivision: "Служба хоз. обеспечения",
      startWorkDate: "2019-5-10"
    },
    medicalExams: [],
    ohsDocs: [],
    unsignedOhsIds: [],
    signedOhsIds: [],
  })

  // Creating a company
  const company = new CompanyModel({
    companyEmail: 'croc@croc.io',
    companyName: 'КРОК',
    companyType: 'АО',
    director: "Безобразов Григорий Андреевич",
    generalInfo: {
      site: 'https://www.croc.ru/',
      year: 1999,
      legal_address: 'Москва, Ленинский 17',
      actual_address: 'Москва, Вавилова 1',
      // countOfStaff: 52,
      OGRN: '1053600591197',
      BIK: '044540132',
      INN: '3664069397',
      tel: '79271669'
    },
    fireSecret: await bcrypt.hash('croc', 10),
    workers: [worker1._id, worker2._id]
  })

  // Creating doc templates
  const docTemplate1 = new docTemplateModel({
    name: 'template 1',
    file: 'template filename 1'
  })
  const docTemplate2 = new docTemplateModel({
    name: 'template 2',
    file: 'template filename 2'
  })
  const docTemplate3 = new docTemplateModel({
    name: 'template 3',
    file: 'template filename 3'
  })

  // Creating documents from worker1
  let { basePath, downloadPath } = await fillTemplates(company, worker1._id, worker1.generalInfo, worker1.profInfo);
  
  let files1 = await fs.promises.readdir(basePath);

  files1 = files1.map(file => {
    const meta = fs.statSync(basePath + file);
    file = {
      filename: file, size: meta.size, originalname: file,
      path: `${basePath}${file}`,
      downloadPath: `${downloadPath}${file}`,
    };
    return file;
  })

  files1.forEach((file) => {
    const doc = new OhsDocModel({
      metadata: file,
    })
    worker1.unsignedOhsIds.push(doc._id);
    worker1.ohsDocs.push(doc);
  })
  // Creating documents from worker2
  const response = await fillTemplates(company, worker2._id, worker2.generalInfo, worker2.profInfo);
  const basePath2 = response.basePath;
  const downloadPath2 = response.downloadPath;
  let files2 = await fs.promises.readdir(basePath2);

  files2 = files2.map(file => {
    const meta = fs.statSync(basePath2 + file);
    file = {
      filename: file, size: meta.size, originalname: file,
      path: `${basePath2}${file}`,
      downloadPath: `${downloadPath2}${file}`,
    };
    return file;
  })

  files2.forEach((file) => {
    const doc = new OhsDocModel({
      metadata: file,
    })
    worker2.unsignedOhsIds.push(doc._id);
    worker2.ohsDocs.push(doc);
  })

  // Saving workers, templates and company to db
  await worker1.save();
  await worker2.save();
  
  await docTemplate1.save();
  await docTemplate2.save();
  await docTemplate3.save();
  
  await company.save();

  console.log("seeding finished");
  await mongoose.disconnect();
})()
