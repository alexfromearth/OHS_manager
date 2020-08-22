import express from 'express';


const router = express.Router();

router.get('/download', async (req, res, next) => {
    const {companyId, workerId, fileName} = req.query;
    const file = await fs.promise.readFile(`${process.env.PWD}/../fileStore/${companyId}/${workerId}/${fileName}`, 'binary');
    res.sendFile(file);
})

export default router;
