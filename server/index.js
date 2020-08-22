import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import FS from "session-file-store";
import { cookiesCleaner, sessionChecker } from "./middleware/auth.js";
import useErrorHandlers from "./middleware/error.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import workersRouter from "./routes/workers.js"
import downloadRouter from './routes/download.js'
import docRouter from './routes/documents.js';
import multer from "multer";
import fs from "fs";

//db setup
const dbUrl = "mongodb://localhost:27017/ohs_manager";

const db = mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const FileStore = FS(session);

const app = express();

// const storage = multer.diskStorage({
//
//     destination: async function (req, file, cb) {
//         const {companyId, workerId} = req.params;
//         console.log(companyId, workerId);
//         const isDirCreated = await fs.promises.readdir(`${process.env.PWD}/../fileStore/`)
//             .find((folder) => folder === companyId);
//         if (!isDirCreated) {
//             await fs.promises.mkdir(`${process.env.PWD}/../fileStore/${companyId}`);
//             await fs.promises.mkdir(`${process.env.PWD}/../fileStore/${companyId}/${workerId}`);
//             cb(null, `${process.env.PWD}/../fileStore/${companyId}/${workerId}`);
//         } else if (isDirCreated) {
//             const isWorkerDirCreated = await fs.promises.readdir(`${process.env.PWD}/../fileStore/${companyId}`)
//                 .find((folder) => folder === workerId);
//             if (!isWorkerDirCreated) {
//                 await fs.promises.mkdir(`${process.env.PWD}/../fileStore/${companyId}/${workerId}`);
//                 cb(null, `${process.env.PWD}/../fileStore/${companyId}/${workerId}`);
//             } else {
//                 cb(null, `${process.env.PWD}/../fileStore/${companyId}/${workerId}`);
//             }
//         }
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })




// Body POST запросов.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
    session({
        store: new FileStore(),
        key: "company_sid",
        secret: "anything here",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000000,
        },
    })
);

app.use(cookiesCleaner);
app.use(sessionChecker)

app.use('/fileStore', express.static(process.env.PWD + '/fileStore'));

app.use("/api/auth", authRouter);
app.use("/api/workers", workersRouter);
app.use("/api/download", downloadRouter);
app.use("/api/documents", docRouter);

useErrorHandlers(app);

const port = process.env.PORT ?? 3001;

app.listen(port, () => {
    console.log(`Server is on ${port}`);
});
