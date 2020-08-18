import mongoose from 'mongoose';

export const medicalExamScheme = mongoose.Schema({
  type: String,
  passportMetadata: Object,
  doctorOpinionMetadata: Object,
  createdAt: String,
})

export default mongoose.model('medicalExams', medicalExamScheme);
