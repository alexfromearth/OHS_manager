import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import FS from "session-file-store";
import { cookiesCleaner } from "./middleware/auth.js";
import useErrorHandlers from "./middleware/error.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";


//db setup
const dbUrl = "mongodb://localhost:27017/ex";

const db = mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const FileStore = FS(session);

const app = express();

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



app.use("/api/auth", authRouter);

useErrorHandlers(app);

const port = process.env.PORT ?? 3001;

app.listen(port, () => {
    console.log(`Server is on ${port}`);
});
