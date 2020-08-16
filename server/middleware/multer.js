import multer from 'multer';
import fs from 'fs';

export const scanStorage = multer.diskStorage({

    destination: async function (req, file, cb) {
        const {companyId, workerId} = req.params;
        const isDirCreated = fs.readdirSync(`${process.env.PWD}/fileStore/`, {encoding: "utf-8"})
            .find((folder) => folder === companyId);
        if (!isDirCreated) {
            await fs.promises.mkdir(`${process.env.PWD}/fileStore/${companyId}`);
            await fs.promises.mkdir(`${process.env.PWD}/fileStore/${companyId}/${workerId}`);
            cb(null, `${process.env.PWD}/fileStore/${companyId}/${workerId}`);
        } else if (isDirCreated) {
            const isWorkerDirCreated = fs.readdirSync(`${process.env.PWD}/fileStore/${companyId}`)
                .find((folder) => folder === workerId);
            if (!isWorkerDirCreated) {
                await fs.promises.mkdir(`${process.env.PWD}/fileStore/${companyId}/${workerId}`);
                cb(null, `${process.env.PWD}/fileStore/${companyId}/${workerId}`);
            } else {
                cb(null, `${process.env.PWD}/fileStore/${companyId}/${workerId}`);
            }
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})