import express from 'express';
import WorkerModel from '../models/workerModel.js';

const router = express.Router();

router.patch('/:workerId/ohsList', async (req, res) => {
  console.log('here123');
  const { signedOhsIds } = req.body;
  console.log(signedOhsIds);
  const { workerId } = req.params;
  try {
    await WorkerModel.findByIdAndUpdate(workerId, { $set: { signedOhsIds } });
    return res.status(200).json({ signedOhsIds });
  } catch (error) {
    return res.status(500).json({ msg: "Updating failed!", serverMsg: error.message });
  }
});

export default router;
