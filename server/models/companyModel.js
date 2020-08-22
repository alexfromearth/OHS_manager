import mongoose from 'mongoose';
import workerModel from '../models/workerModel.js';

const companyScheme = new mongoose.Schema({
  companyEmail: String,
  companyName: String,
  companyType: String,
  city: String,
  director: String,
  generalInfo: Object,
  fireSecret: String,
  toDoList: Object,
  workers: [{ type: mongoose.Schema.Types.ObjectId, ref: workerModel }]
})

export default mongoose.model('Company', companyScheme);
