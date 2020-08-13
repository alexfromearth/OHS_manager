import mongoose from 'mongoose';

export const medicalExamScheme = mongoose.Schema({
  metadata: Object
})

export default mongoose.model('medicalExams', medicalExamScheme);
