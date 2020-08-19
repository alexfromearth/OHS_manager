import createTemplate from "./templater.js";
import fs from "fs";


export default async function fillTemplates(company, workerId, generalInfo, profInfo) {
  const {firstName, lastName, middleName, birthday, birthPlace, address, sex} = generalInfo;
  const {education, position, workExperience, structuralSubdivision, startWorkDate} = profInfo;
  try {
    // создаем папки
    const companyDir = fs.readdirSync(`${process.env.PWD}/fileStore/`)
    .find(folder => folder === company._id.toString());
    
    if (!companyDir) {
      await fs.promises.mkdir(`${process.env.PWD}/fileStore/${company._id}`);
    }
    await fs.promises.mkdir(`${process.env.PWD}/fileStore/${company._id}/${workerId}`);
    
    const basePath = `${process.env.PWD}/fileStore/${company._id}/${workerId}/`;
    const downloadPath = `http://localhost:3001/fileStore/${company._id}/${workerId}/`;

    await createTemplate({
      firstName,
      lastName,
      middleName,
      structuralSubdivision,
      position,
      startWorkDate,
      sex,
    }, `${process.env.PWD}/templater/docTemplates/workwearСard`, basePath + 'workwearСardFilled');

    await createTemplate({
      companyType: company.companyType,
      companyName: company.companyName,
      firstName,
      lastName,
      middleName,
      structuralSubdivision,
      position,
    }, `${process.env.PWD}/templater/docTemplates/protocolKnowledgeCheck`, basePath + 'protocolKnowledgeCheckFilled');

    await createTemplate({
      companyType: company.companyType,
      companyName: company.companyName,
      firstName,
      lastName,
      middleName,
      birthday,
      position,
      structuralSubdivision,

    }, `${process.env.PWD}/templater/docTemplates/personalTraningCard`, basePath + 'personalTraningCardFilled');

    await createTemplate({
      firstName,
      lastName,
      middleName,
      structuralSubdivision,
      position,
      startWorkDate
    }, `${process.env.PWD}/templater/docTemplates/flushingDisinfectants`, basePath + 'flushingDisinfectantsFilled');

    await createTemplate({
      companyType: company.companyType,
      companyName: company.companyName,
      city: company.city,
      director: company.director,
    }, `${process.env.PWD}/templater/docTemplates/contingentmed`, basePath + 'contingentmedFilled');
    return {basePath, downloadPath};
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

// const paths = {
//   basePath: `${process.env.PWD}/../fileStore/asdasdqweasdasd/adwqegfhfgnbvnbvn/`,
//   downloadPath: `http://localhost:3001/fileStore/asdasdqweasdasd/adwqegfhfgnbvnbvn/`
// };
// let files = fs.readdirSync(`${process.env.PWD}/../fileStore/asdasdqweasdasd/adwqegfhfgnbvnbvn/`);
//
// files = files.map(file => {
//   const meta = fs.statSync(paths.basePath + file);
//   file = {
//     filename: file, size: meta.size, originalname: file,
//     path: `${paths.basePath}${file}`,
//     downloadPath: `${paths.downloadPath}${file}`,
//   };
//   return file;
// })
// console.log(files);


// fillTemplates({
//   _id: 'asdasdqweasdasd',
//   companyType: 'TEST',
//   companyName: 'TEST',
//   city: 'TEST',
//   director: 'TEST',
// },
//   'adwqegfhfgnbvnbvn',
//   {
//     firstName: 'test',
//     lastName: 'test',
//     middleName: 'test',
//     birthday: 'test',
//     birthPlace: 'test',
//     address: 'test',
//     sex: 'test'
//   },
//   {
//     education: 'test',
//     position: 'test',
//     workExperience: 'test',
//     structuralSubdivision: 'test',
//     startWorkDate: 'test'}
//   ).then((response) => {
//   console.log(response)
// })
