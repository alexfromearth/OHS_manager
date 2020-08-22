import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { eachWorkerThunk } from '../../../redux/thunks/eachWorkerThunk';
import ModalPortal from "../../ModalPortal/ModalPortal";
import portalStyles from "../../ModalPortal/styles.module.sass";
import UploadScans from "../../UploadScans/UploadScans";
import { clearFileList } from "../../../redux/actionCreators/ActionCreators";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import InsertDriveFileRoundedIcon from '@material-ui/icons/InsertDriveFileRounded';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  list1: {
    width: ' 40vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  list2: {
    width: ' 40vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignSelf: 'start'
  },
  purple: {
    backgroundColor: 'rgb(64, 86, 181)',
  },
  middle: {
    fontSize: 18,
  },
  zagr: {
    color: 'rgb(64, 86, 181)',
    height: '100%'
  },
  listitem: {
    width: '80%',
  },
  txt: {
    textAlign: 'right',
    marginRight: 13
  }
});

export default function DocumentsCopy() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const companyId = useSelector(state => state.auth.companyId);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const worker = useSelector(state => state.allStaff.worker);

  useEffect(() => {
    if (!showUploadModal) {
      dispatch(eachWorkerThunk(companyId, id));
    }
  }, [dispatch, companyId, id, showUploadModal])

  function handleClick() {
    if (showUploadModal) {
      dispatch(clearFileList());
    }
    setShowUploadModal((state) => (!state));
  }

  function switchcase(name) {
    switch (name) {
      case 'contingentmedFilled.docx': { return 'Контингенты' }
      case 'flushingDisinfectantsFilled.docx': { return 'Учет выдачи смывающих средств' }
      case 'personalTraningCardFilled.docx': { return 'Форма карточки прохождения обучения' }
      case 'protocolKnowledgeCheckFilled.docx': { return 'Протокол комиссии по проверке знаний' }
      case 'workwearСardFilled.docx': { return 'Карточка учета выдачи СИЗ' }
      default:
        return name
    }
  }

  return (
    <>
      <div className={classes.root}>
        <List component="div" className={classes.list1} >
          {worker.ohsDocs && worker.ohsDocs.map(el => {
            if (worker.unsignedOhsIds.includes(el._id)) {
              return (
                <ListItem button onClick={() => { window.location = el.metadata.downloadPath }} key={el._id} className={classes.listitem}>
                  <ListItemAvatar>
                    <Avatar className={classes.purple}>
                      <InsertDriveFileRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={switchcase(el.metadata.filename)} />
                  <CloudDownloadOutlinedIcon fontSize={'large'} className={classes.zagr} />
                </ListItem>
              )
            }
            else return undefined
          })}
        </List>

        <div>
          <Button variant="contained" color="primary" className={classes.middle} onClick={handleClick}>Загрузить скан</Button>
          {showUploadModal && <ModalPortal className={portalStyles.myModal}>
            <UploadScans workerId={id} handleClose={handleClick} setShowUploadModal={setShowUploadModal} />
          </ModalPortal>}
        </div>

        <List component="div" className={classes.list2} >
          {worker.ohsDocs && worker.ohsDocs.map(el => {
            if (worker.signedOhsIds.includes(el._id)) {
              return (
                <ListItem button className={classes.listitem} onClick={() => { window.location = el.metadata.downloadPath }} key={el._id}>
                  <CloudDownloadOutlinedIcon fontSize={'large'} className={classes.zagr} />
                  <ListItemText primary={el.metadata.filename} className={classes.txt} />
                  <ListItemAvatar>
                    <Avatar className={classes.purple}>
                      <InsertDriveFileRoundedIcon />
                    </Avatar >
                  </ListItemAvatar>
                </ListItem>
              )
            }
            else return undefined
          })}
        </List>
      </div>
    </>
  );
}
