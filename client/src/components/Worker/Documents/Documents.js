import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ModalPortal from "../../ModalPortal/ModalPortal";
import portalStyles from "../../ModalPortal/styles.module.sass";
import UploadScans from "../../UploadScans/UploadScans";
import { useDispatch } from "react-redux";
import { clearFileList } from "../../../redux/actionCreators/ActionCreators";

import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

const useStyles = makeStyles({
  iconOnBTN: {
    marginRight: 5
  },
  back: {
    fontSize: 18,
    position: 'absolute',
    marginTop: 20,
  }
});

function Documents() {
  const classes = useStyles();
  const history = useHistory()
  const [showUploadModal, setShowUploadModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  function handleClick() {
    if (showUploadModal) {
      dispatch(clearFileList());
    }
    setShowUploadModal((state) => (!state));
  }
  return (
    <>
      <Button variant="contained" color="secondary" className={classes.back} onClick={() => history.goBack()}>
        <ArrowBackIosRoundedIcon fontSize={'large'} className={classes.iconOnBTN} />
          Назад
      </Button>
      <div>
        <button onClick={handleClick}>Показать Upload Modal</button>
        {showUploadModal && <ModalPortal className={portalStyles.myModal}>
          <UploadScans workerId={id} handleClose={handleClick} setShowUploadModal={setShowUploadModal} />
        </ModalPortal>}
      </div>
    </>
  );
}

export default Documents;
