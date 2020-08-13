import mongoose from 'mongoose';

const docTemplateScheme = mongoose.Schema({
  name: String,
  file: String
})

export default mongoose.model('docTemplates', docTemplateScheme);
