import mongoose from 'mongoose';
import { medicalExamScheme } from './medicalExamModel.js';
import { ohsDocScheme } from './ohsDocModel.js';

const workerScheme = new mongoose.Schema({
  generalInfo: Object,
  profInfo: Object,
  medicalExams: [medicalExamScheme],
  ohsDocs: [ohsDocScheme]
})

export default mongoose.model('Worker', workerScheme);
