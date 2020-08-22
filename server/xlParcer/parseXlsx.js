import XLSX from 'xlsx';

const names = ['firstName', 'lastName', 'middleName', 'birthday', 'birthPlace', 'address', 'sex', 'education', 'position', 'workExperience', 'structuralSubdivision', 'startWorkDate'];

export default (file) => {
  const { Sheets: { Sheet1 } } = XLSX.read(file);
  const workersArr = [];
  for (let i = 2; i < (Object.keys(Sheet1).length - 2) / 13 + 1; i++) {
    const newWorker = {
      generalInfo: {},
      profInfo: {}
    };
    for (let j = 66; j < 73; j++) {
      newWorker.generalInfo[names[j - 66]] = Sheet1[`${String.fromCharCode(j)}${i}`].w;
    }
    for (let j = 73; j < 78; j++) {
      newWorker.profInfo[names[j - 66]] = Sheet1[`${String.fromCharCode(j)}${i}`].w;
    }
    workersArr.push(newWorker);
  }
  return workersArr;
}
