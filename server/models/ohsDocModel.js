import mongoose from 'mongoose';

export const ohsDocScheme = mongoose.Schema({
  metadata: Object,
});

export default mongoose.model('ohsDocs', ohsDocScheme);
