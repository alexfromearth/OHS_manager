import mongoose from 'mongoose';
import { medicalExamScheme } from './medicalExamModel.js';
import { ohsDocScheme } from './ohsDocModel.js';

const workerScheme = new mongoose.Schema({
  generalInfo: Object,
  profInfo: Object,
  medicalExams: [medicalExamScheme],
  ohsDocs: [ohsDocScheme],
  signedOhsIds: Array,
  unsignedOhsIds: Array,
})

export default mongoose.model('Worker', workerScheme);
