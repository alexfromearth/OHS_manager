import mongoose from 'mongoose';
import OhsDocsModel from "../ohsDocModel.js";
import MedicalExamModel from '../medicalExamModel.js';
import EmployeeModel from '../employeeModel.js';
import CompanyModel from '../companyModel.js';
import bcrypt from 'bcrypt';

mongoose.pluralize(null);
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

  // Creating employees
  const employee1 = new EmployeeModel({
    generalInfo: {
      message: 'employee 1 gen'
    },
    profInfo: {
      message: 'employee 1 prof'
    },
    medicalExams: [medicalExam1, medicalExam2],
    ohsDocs: [ohsDoc1]
  })
  const employee2 = new EmployeeModel({
    generalInfo: {
      message: 'employee 2 gen'
    },
    profInfo: {
      message: 'employee 2 prof'
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
    Employees: [employee1._id, employee2._id]
  })

  // Saving employees and company to db
  await employee1.save();
  await employee2.save();
  await company.save();

  console.log("seeding finished");
  await mongoose.disconnect();
})()
