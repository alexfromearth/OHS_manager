import React from 'react';
import {Typography} from "@material-ui/core";
import 'antd/dist/antd.css';
import {Upload, Button, message} from 'antd';
import { UploadOutlined, CloseSquareOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import styles from './styles.module.sass';
import {beforeUpload, scanRemove, uploadScansSC} from "../../redux/actionCreators/ActionCreators";

function UploadScans({workerId, handleClose}) {
    const fileList = useSelector(state => state.allStaff.fileList);
    const uploadingScans = useSelector(state => state.allStaff.uploadingScans);
    const companyId = useSelector(state => state.auth.companyId);
    const dispatch = useDispatch();

    function handleUpload() {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });
        dispatch(uploadScansSC(formData, companyId, workerId));
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
            <Typography variant="subtitle1" className={styles.title}>Загрузка скана документа</Typography>
            <Upload {...props} listType="picture">
                <Button disabled={fileList.length !== 0} className={styles.select}>
                    <UploadOutlined />Select File
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

export default UploadScans;
