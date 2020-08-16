import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import ModalPortal from "../../ModalPortal/ModalPortal";
import portalStyles from "../../ModalPortal/styles.module.sass";
import UploadScans from "../../UploadScans/UploadScans";
import {useDispatch} from "react-redux";
import {clearFileList} from "../../../redux/actionCreators/ActionCreators";

function Documents() {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const dispatch = useDispatch();
    const {id} = useParams();
    function handleClick() {
        if (showUploadModal) {
            dispatch(clearFileList());
        }
        setShowUploadModal((state) => (!state));
    }
    return (
        <div>
            <button onClick={handleClick}>Показать Upload Modal</button>
            {showUploadModal &&  <ModalPortal className={portalStyles.myModal}>
                <UploadScans workerId={id} handleClose={handleClick} setShowUploadModal={setShowUploadModal}/>
            </ModalPortal>}
        </div>
    );
}

export default Documents;
