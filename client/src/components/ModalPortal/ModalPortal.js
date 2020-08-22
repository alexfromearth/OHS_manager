import React, {useEffect} from 'react';
import {createPortal} from "react-dom";
import classes from './styles.module.sass';

function ModalPortal({children, className}) {
    const UploadScanModalRoot = document.getElementById("uploadModal");
    const element = document.createElement('div');
    element.classList.add(className);

    useEffect(() => {
        UploadScanModalRoot.appendChild(element);

        return () => {
            UploadScanModalRoot.removeChild(element)
        }
    }, [])

    return createPortal(children, element);
}

export default ModalPortal;
