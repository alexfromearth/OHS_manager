import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import path from 'path';
import errorHandler from './errorHandler.js';
import * as fs from "fs";


export default function createTemplate(templateOptions, templatePath, FilledFilePath) {

    const content = fs.readFileSync(`${templatePath}.docx`, 'binary');


    const zip = new PizZip(content);


    let doc;
    try {
        doc = new Docxtemplater(zip);
    } catch (error) {
        // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
        errorHandler(error);
    }

//set the templateconstiables
    doc.setData(templateOptions);

    try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
    } catch (error) {
        // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
        errorHandler(error);
    }
    const buf = doc.getZip()
        .generate({type: 'nodebuffer'});

// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(path.resolve(FilledFilePath + '.docx'), buf);
}

// createTemplate({
//     lastName: 'asdasd',
//     firstName: 'asdasd',
//     middleName: 'asdasd',
//     structuralSubdivision: 'asdasd',
//     position: 'qwe',
//     startWorkDate: '21.23.2012',
//     sex: 'Мужской',
// }, `${process.env.PWD}/docTemplates/workwearСard`, `${process.env.PWD}/docTemplates/workwearСardFilled`);


