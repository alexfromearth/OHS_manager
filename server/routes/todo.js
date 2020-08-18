import express from 'express';
import CompanyModel from '../models/companyModel';

const router = express.Router();

router.get('/todo', async (req, res) => {
  const companyId = req.session.company._id
  try {
    const company = await CompanyModel.findById(companyId);
    res.status(200).json({
      toDoList: company.toDoList,
    })
  } catch (error) {
    res.status(500).json({ msg: 'Failed to load TODO list', serverMsg: error.message });
  }
});

router.patch('/todo', async (req, res) => {
  const toDoList = req.body;
  const companyId = req.session.company._id
  try {
    await CompanyModel.findByIdAndUpdate(companyId, { $set: { toDoList } });
    res.send(200).end();
  } catch (error) {
    res.send(500).json({ message: 'Failed to update the list', serverMsg: error.message });
  }
});

export default router;
