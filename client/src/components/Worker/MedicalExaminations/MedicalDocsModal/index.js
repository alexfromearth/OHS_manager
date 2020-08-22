import React, {useState} from 'react';
import {Typography} from "@material-ui/core";
import 'antd/dist/antd.css';
import {Upload, Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import styles from './styles.module.sass';
import {useHistory} from 'react-router-dom';
import {
  beforeUpload,
  loadSuccess,
  scanRemove,
  uploadMedsSC,
} from "../../../../redux/actionCreators/ActionCreators";
import sleep from "../../../../utils/sleep";
import TextField from "@material-ui/core/TextField";


function MedicalDocsModal({worker, handleClick, handleClose}) {
  const fileList = useSelector(state => state.allStaff.fileList);
  const uploadingScans = useSelector(state => state.allStaff.uploadingScans);
  const companyId = useSelector(state => state.auth.companyId);
  const history = useHistory();
  const dispatch = useDispatch();

  const [dateOf, setDateOf] = useState('');
  const [medType, setMedType] = useState('');


  async function handleUpload() {
    if (!dateOf || !medType) return;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file);
    });
    dispatch(uploadMedsSC(formData, dateOf, medType, companyId, worker._id));
    await sleep(2000);
    dispatch(loadSuccess());
    handleClick();
    history.push(`/employee/${worker._id}/medicInfo`);
  };

  function handleChange(e) {
    setMedType(e.target.value);
  }


  const props = {
    onRemove: file => {
      dispatch(scanRemove(file));
    },
    beforeUpload: file => {
      dispatch(beforeUpload(file));
    },
    customRequest: () => {
      return;
    },
    fileList,
  };


  return (
    <div className={styles.modalUploadWrapper}>
      <Typography variant="h6">Загрузка медицинских документов работника</Typography>
      <div className={styles.requirements}>
        <strong>Сначала</strong> загрузите паспорт здоровья сотрудника, <br/><strong>а следом</strong> заключение врача.
      </div>
      <TextField
        required
        id="type"
        name="type"
        label="Тип медицинского осмотра"
        autoComplete="Тип медицинского осмотра"
        value={medType}
        onChange={handleChange}
        className={styles.textField}
      />

      <TextField
        id="date"
        label="Дата прохождения мед.осмотра"
        type="date"
        variant={"standard"}
        value={dateOf}
        onChange={(e) => setDateOf(e.target.value)}
        className={styles.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Upload {...props} listType="picture" className={styles.select}>
        <Button disabled={fileList.length >= 2}>
          <UploadOutlined/>Выберите файлы
        </Button>
      </Upload>
      <div>
        <Button
          className={styles.upload}
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length < 2 || dateOf.length < 5 || medType < 1}
          loading={uploadingScans}
        >
          {uploadingScans ? 'Загрузка' : 'Начать загрузку'}
        </Button>
        <Button className={styles.exit} onClick={handleClose}>Отмена</Button>
      </div>
    </div>
  );
}

export default MedicalDocsModal;
