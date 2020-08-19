import React from 'react';
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
  scanRemove, seedSC,
  uploadScansSC
} from "../../redux/actionCreators/ActionCreators";
import sleep from "../../utils/sleep";

function FillDataBaseExelModal({ handleClose, setShowExelModal}) {
  const fileList = useSelector(state => state.allStaff.fileList);
  const uploadingScans = useSelector(state => state.allStaff.uploadingScans);
  const history = useHistory();
  const dispatch = useDispatch();


  async function handleUpload() {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('xlsx', file);
    });
    dispatch(seedSC(formData));
    await sleep(2000);
    dispatch(loadSuccess());
    setShowExelModal(false);
    history.push(`/employees`);
  };


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
      <Typography variant="subtitle1" >Загрузите Exel документ</Typography>
      <Upload {...props} listType="picture">
        <Button disabled={fileList.length !== 0} >
          <UploadOutlined/>Выберете файл
        </Button>
      </Upload>
      <div>
        <Button
          className={styles.upload}
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploadingScans}
        >
          {uploadingScans ? 'Загрузка' : 'Начать загрузку'}
        </Button>
        <Button className={styles.exit} onClick={handleClose}>Отмена</Button>
      </div>
    </div>
  );
}

export default FillDataBaseExelModal;
