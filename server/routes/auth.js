import express from 'express';
import CompanyModel from '../models/companyModel.js'
import bcrypt from 'bcrypt'
const router = express.Router();
const salt = 10;

// router.post("/auth/registration", async (req, res, next) => {
//     const {companyEmail, password, companyName, phone} = req.body;
//     try {
//         let newcompany = new CompanyModel({
//             companyEmail,
//             password: await bcrypt.hash(password, salt),
//             companyName,
//             phone,
//         });
//         await newcompany.save();
//         req.session.company = newcompany;
//         return res.status(200).json({msg: "Successful registration", resultCode: 0});
//     } catch (error) {
//         if (error.msg.includes("E11000")) {
//             return res.status(401).json({msg: "Not Acceptable", resultCode: 10});
//         }
//         res.status(200).json({resultCode: 10});
//     }
// });

router.post("/auth/login", async (req, res) => {
    const {companyEmail, password} = req.body;
    let company = await CompanyModel.findOne({companyEmail});
    if (!company) {
        return res.status(401).json({msg: "Invalid login or password"});
    }
    if (await bcrypt.compare(password, company.password)) {
        req.session.company = company;
        res.json({msg: "Successful login", company});
    } else {
        return res.status(401).json({msg: "Invalid login or password"});
    }

});

router.delete("/auth/login", async (req, res, next) => {
    if (req.session.company) {
        try {
            await req.session.destroy(() => {
                res.clearCookie("company_sid");
                res.status(200).json({msg: "session expired"});
            });
        } catch (error) {
            res.status(401).json({msg: error.message});
        }
    } else {
        res.status(401).json({msg: "something went wrong"});
    }
});

router.get("/auth/me", async (req, res, next) => {
    if (req.session.company) {
        const company = await CompanyModel.findOne({_id: req.session.company._id});
        res.status(200).json({msg: "User is authenticated"});
    } else {
        res.status(401).json({msg: "User not authenticated"});
    }
});


export default router;
