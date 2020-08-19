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

export const medStorage = multer.diskStorage({

  destination: async function (req, file, cb) {
    const {companyId, workerId} = req.params;
    const isDirCreated = fs.readdirSync(`${process.env.PWD}/fileStore/`, {encoding: "utf-8"})
      .find((folder) => folder === companyId);
    if (!isDirCreated) {
      await fs.promises.mkdir(`${process.env.PWD}/fileStore/${companyId}`);
      await fs.promises.mkdir(`${process.env.PWD}/fileStore/${companyId}/${workerId}`);
      await fs.promises.mkdir(`${process.env.PWD}/fileStore/${companyId}/${workerId}/meds/`);
      cb(null, `${process.env.PWD}/fileStore/${companyId}/${workerId}/meds/`);
    } else if (isDirCreated) {
      const isWorkerDirCreated = fs.readdirSync(`${process.env.PWD}/fileStore/${companyId}`)
        .find((folder) => folder === workerId);
      if (!isWorkerDirCreated) {
        await fs.promises.mkdir(`${process.env.PWD}/fileStore/${companyId}/${workerId}`);
        await fs.promises.mkdir(`${process.env.PWD}/fileStore/${companyId}/${workerId}/meds`);
        cb(null, `${process.env.PWD}/fileStore/${companyId}/${workerId}/meds/`);
      } else {
        const isMedCreated = fs.readdirSync(`${process.env.PWD}/fileStore/${companyId}/${workerId}`)
          .find((folder) => folder === 'meds');
        if (!isMedCreated) {
          await fs.promises.mkdir(`${process.env.PWD}/fileStore/${companyId}/${workerId}/meds`);
          cb(null, `${process.env.PWD}/fileStore/${companyId}/${workerId}/meds/`);
        } else {
          const isFileExist = fs.readdirSync(`${process.env.PWD}/fileStore/${companyId}/${workerId}/meds`)
            .find((f) => f === file.originalname);
          if (!isFileExist) {
            cb(null, `${process.env.PWD}/fileStore/${companyId}/${workerId}/meds/`);
          } else {
            req.headers.isalreadyexist = 'true'
            cb(null, `${process.env.PWD}/fileStore/${companyId}/${workerId}/meds/`);
          }
        }
      }
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
