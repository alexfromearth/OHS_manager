import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ModalPortal from "../../ModalPortal/ModalPortal";
import portalStyles from "../../ModalPortal/styles.module.sass";
import UploadScans from "../../UploadScans/UploadScans";
import { useDispatch } from "react-redux";
import { clearFileList } from "../../../redux/actionCreators/ActionCreators";

import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import Template from './ template';
import Docs from './docs';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  list: {
    width: '25vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  purple: {
    backgroundColor: 'rgb(64, 86, 181)',
  },
  listitem: {
    width: '70%',
    textAlign: 'center'
  },
  middle: {
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  }
});

function Documents() {
  const classes = useStyles();
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
      {/* <div className={classes.main}>
        <h1>Документы</h1>
        <h2>Сотрудник: Ударников Лопес Игоревич</h2>
        {worker && <h6> <h2>Сотрудник: {worker.generalInfo.lastName + ' ' + worker.generalInfo.firstName + ' ' + worker.generalInfo.middleName}</h2>
      </div> */}
      <div className={classes.root}>
        <List component="nav" aria-labelledby="nested-list-subheader" className={classes.list} >
          <Template />
          <Template />
          <Template />
        </List>
        <div>
          <Button variant="contained" color="primary" className={classes.middle} onClick={handleClick}>Загрузить скан</Button>
          {showUploadModal && <ModalPortal className={portalStyles.myModal}>
            <UploadScans workerId={id} handleClose={handleClick} setShowUploadModal={setShowUploadModal} />
          </ModalPortal>}
        </div>
        <List component="nav" aria-labelledby="nested-list-subheader" className={classes.list} >
          <Docs />
          <Docs />
          <Docs />
        </List>
      </div>
    </>
  );
}

export default Documents;
