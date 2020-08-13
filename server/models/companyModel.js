import mongoose from 'mongoose';

const companyScheme = mongoose.Schema({
  name: String,
  generalInfo: Object,
  fireSecret: String,
  Employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employees' }]
})

export default mongoose.model('companies', companyScheme);
