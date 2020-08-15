import React, { useEffect } from 'react';
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
    // marginLeft: '35%',
    marginTop: '10%',
    marginBottom: '10%',
    fontSize: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
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
    // marginLeft: '33%',
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center'
  },
  icon: {
    marginRight: 5
  }
}));

const worker = {
  generalInfo: {
    lastName: 'Верин',
    firstName: 'Василий',
    middleName: 'Николаевич',
    birth_date: '12.04.1986',
    birth_place: 'село Крыжовники, дом 7',
    locationOfHome: 'Москва, Тропаревский лес, 5 дерево',
    photo: 'https://img2.freepng.ru/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg',
  },
  profInfo: {
    education: 'Среднее специальное',
    position: 'Слесарь',
    experience: '10 лет',
  },
}

export default function Worker() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const company_id = useSelector(state => state.auth.companyId);
  // const worker = useSelector(state => state.allStaff.worker) //когда будет логинизация, через redux

  const classes = useStyles();

  useEffect(() => {
    dispatch(eachWorkerThunk(company_id, id));
  }, [dispatch, company_id, id])

  function handleDeleteWorker() {
    dispatch(deleteWorkerThunk(company_id, id));
    history.push('/employees');
  }

  return (
    <>
      <div className={classes.head}>
        <Avatar
          src={worker.generalInfo.photo}
          className={classes.large}
        />
        <h1>{worker && (worker.generalInfo.lastName + ' ' + worker.generalInfo.firstName + ' ' + worker.generalInfo.middleName)}</h1>
      </div>
      <Typography component="div" variant="body1" className={classes.info}>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Дата рождения:</Box>
          <Box color="info.main">{worker.generalInfo.birth_date}</Box>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Место рождения:</Box>
          <Box color="info.main">{worker.generalInfo.birth_place}</Box>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Место проживания:</Box>
          <Box color="info.main">{worker.generalInfo.locationOfHome}</Box>
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
          <Box color="info.main">{worker.profInfo.experience}</Box>
        </div>
      </Typography>

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
        <Button className={classes.btn} variant="contained" color="secondary" onClick={() => { handleDeleteWorker() }} >
          <ClearIcon className={classes.icon} /> Удалить из списка сотрудников
        </Button>
      </div>
    </>
  )
}
