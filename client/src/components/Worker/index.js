import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { eachWorkerThunk } from '../../redux/thunks/eachWorkerThunk';
import { deleteWorkerThunk } from '../../redux/thunks/deleteWorkerThunk';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ClearIcon from '@material-ui/icons/Clear';
import ReplayIcon from '@material-ui/icons/Replay';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ModalPortal from "../ModalPortal/ModalPortal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import ModalStyles from './../ModalPortal/styles.module.sass'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center'
  },
  retire: {
    marginTop: '5vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItem: 'center'
  },
  btn: {
    fontSize: 25
  },
  large: {
    width: theme.spacing(12),
    height: 'auto',
    marginRight: 50
  },
  info: {
    marginTop: '5%',
    marginBottom: '5%',
    fontSize: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  inbox: {
    marginRight: 20
  },
  head: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center'
  },
  icon: {
    marginRight: 5
  },
  iconOnBTN: {
    marginRight: 5
  },
  back: {
    fontSize: 18,
    position: 'absolute',
    marginTop: 20,
  },
}));
const photo = 'https://img2.freepng.ru/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg'

export default function Worker() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const companyId = useSelector(state => state.auth.companyId);
  const worker = useSelector(state => state.allStaff.worker) //когда будет логинизация, через redux
  const classes = useStyles();

  const [showDeleteModal, setShowDeleteModal] = useState(false);



  useEffect(() => {
    dispatch(eachWorkerThunk(companyId, id));
  }, [dispatch, companyId, id])


  function handleShowModal() {
    setShowDeleteModal(state => !state);
  }



  return (
    <>
      <Button variant="contained" color="secondary" className={classes.back} onClick={() => history.push(`/employees/`)}>
        <ArrowBackIosRoundedIcon fontSize={'large'} className={classes.iconOnBTN} />
          Назад
      </Button>
      <div className={classes.head}>
        <Avatar
          src={photo}
          className={classes.large}
        />
        <h1>{worker.generalInfo && (worker.generalInfo.lastName + ' ' + worker.generalInfo.firstName + ' ' + worker.generalInfo.middleName)}</h1>
      </div>
      {worker.generalInfo &&
        <Typography component="div" variant="body1" className={classes.info}>
          <div className={classes.infoRow}>
            <Box className={classes.inbox} color="text.primary">Дата рождения:</Box>
            <Box color="info.main">{worker.generalInfo.birthday}</Box>
          </div>
          <div className={classes.infoRow}>
            <Box className={classes.inbox} color="text.primary">Место рождения:</Box>
            <Box color="info.main">{worker.generalInfo.birthPlace}</Box>
          </div>
          <div className={classes.infoRow}>
            <Box className={classes.inbox} color="text.primary">Место проживания:</Box>
            <Box color="info.main">{worker.generalInfo.address}</Box>
          </div>
          <div className={classes.infoRow}>
            <Box className={classes.inbox} color="text.primary">Образование:</Box>
            <Box color="info.main">{worker.profInfo.education}</Box>
          </div>
          <div className={classes.infoRow}>
            <Box className={classes.inbox} color="text.primary">Должность:</Box>
            <Box color="info.main">{worker.profInfo.position}</Box>
          </div>
          <div className={classes.infoRow}>
            <Box className={classes.inbox} color="text.primary">Стаж работы:</Box>
            <Box color="info.main">{worker.profInfo.workExperience}</Box>
          </div>
          <div className={classes.infoRow}>
            <Box className={classes.inbox} color="text.primary">Структурное подразделение</Box>
            <Box color="info.main">{worker.profInfo.structuralSubdivision}</Box>
          </div>
          <div className={classes.infoRow}>
            <Box className={classes.inbox} color="text.primary">Дата начала работы:</Box>
            <Box color="info.main">{worker.profInfo.startWorkDate}</Box>
          </div>
        </Typography>
      }
      <div className={classes.root}>
        <Button className={classes.btn} variant="contained" color="primary" onClick={() => history.push(`/employee/${id}/medicInfo`)} >
          <LocalHospitalIcon className={classes.icon} /> Медицинский осмотр
        </Button>
        <Button className={classes.btn} variant="contained" color="primary" onClick={() => history.push(`/employee/${id}/documents`)}>
          <InsertDriveFileIcon className={classes.icon} /> Документы
        </Button>
        <Button className={classes.btn} variant="contained" color="primary" onClick={() => history.push(`/employee/${id}/update`)}>
          <ReplayIcon className={classes.icon} /> Редактировать информацию
        </Button>
      </div>
      <div className={classes.retire}>
        <Button className={classes.btn} variant="contained" color="secondary" onClick={handleShowModal} >
          <ClearIcon className={classes.icon} /> Удалить из списка сотрудников
        </Button>
        {showDeleteModal && <ModalPortal className={ModalStyles.myModal}>
          <DeleteEmployeeModal handleShowModal={handleShowModal} companyId={companyId} workerId={worker._id}/>
        </ModalPortal>}
      </div>
    </>
  )
}
