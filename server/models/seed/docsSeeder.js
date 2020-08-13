import mongoose from 'mongoose';
import OhsDocsModel from "../ohsDocModel.js";
import MedicalExamModel from '../medicalExamModel.js';
import workerModel from '../workerModel.js';
import CompanyModel from '../companyModel.js';
import docTemplateModel from '../docTemplatesModel.js';
import bcrypt from 'bcrypt';

// mongoose.pluralize(null);
mongoose.connect('mongodb://localhost/ohs_manager', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'Ошибка соединения с MongoDB'));

(async () => {

  console.log("seeding started")
  // Creating ohsDocs
  const ohsDoc1 = new OhsDocsModel({
    metadata: {
      message: "ohsDoc One"
    },
    isSigned: false
  })
  const ohsDoc2 = new OhsDocsModel({
    metadata: {
      message: "ohsDoc Two"
    },
    isSigned: true
  })
  const ohsDoc3 = new OhsDocsModel({
    metadata: {
      message: "ohsDoc Three"
    },
    isSigned: false
  })

  // Creating medicalExams
  const medicalExam1 = new MedicalExamModel({
    metadata: {
      message: "medicalExam 1"
    }
  })
  const medicalExam2 = new MedicalExamModel({
    metadata: {
      message: "medicalExam 2"
    }
  })
  const medicalExam3 = new MedicalExamModel({
    metadata: {
      message: "medicalExam 3"
    }
  })

  // Creating workers
  const worker1 = new workerModel({
    generalInfo: {
      firstName: "Vasya",
      lastName: "Vasin",
      middleName: "Vasilyev"
    },
    profInfo: {
      profession: "Plumber"
    },
    medicalExams: [medicalExam1, medicalExam2],
    ohsDocs: [ohsDoc1]
  })
  const worker2 = new workerModel({
    generalInfo: {
      firstName: "Grigoriy",
      lastName: "Grigoriev",
      middleName: "Grigoryan"
    },
    profInfo: {
      profession: "Software developer"
    },
    medicalExams: [medicalExam3],
    ohsDocs: [ohsDoc2, ohsDoc3]
  })

  // Creating a company
  const company = new CompanyModel({
    name: "Company Name",
    generalInfo: {
      message: 'Company gen'
    },
    fireSecret: await bcrypt.hash('fireSecret', 10),
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
