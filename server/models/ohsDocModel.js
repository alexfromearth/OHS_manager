import mongoose from 'mongoose';

export const ohsDocScheme = mongoose.Schema({
  metadata: Object,
  isSigned: Boolean
});

export default mongoose.model('ohsDocs', ohsDocScheme);
