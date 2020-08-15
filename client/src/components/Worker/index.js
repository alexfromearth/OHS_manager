import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { eachWorkerThunk } from '../../redux/thunks/eachWorkerThunk';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
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
  btn: {
    fontSize: 25
  },
  large: {
    width: theme.spacing(12),
    height: 'auto',
    marginRight: 50
  },
  info: {
    marginLeft: '35%',
    marginTop: '10%',
    marginBottom: '15%',
    fontSize: 30,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center', почему не работает?? TODO
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  inbox: {
    marginRight: 20
  },
  head:{
    justifyContent: 'center',
    // marginLeft: '33%',
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center'
  },
  icon:{
    marginRight: 5
  }
}));

export default function Worker() {
  const history = useHistory()
  const { id } = useParams();
  const company_id = useSelector(state => state.auth.companyId);
  const dispatch = useDispatch();
  const worker = useSelector(state => state.allStaff.worker)

  const classes = useStyles();

  useEffect(() => {
    dispatch(eachWorkerThunk(company_id, id));
  }, [dispatch, company_id, id])

  if (worker) {
    const fullname = worker.generalInfo.lastName + ' ' + worker.generalInfo.firstName + ' ' + worker.generalInfo.middleName
    console.log(fullname);
  }
  console.log(worker);
  return (
    <>
      <div className={classes.head}>
        <Avatar
          src={`https://img2.freepng.ru/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg`} //TODO
          className={classes.large}
        />
        <h1>{worker && (worker.generalInfo.lastName + ' ' + worker.generalInfo.firstName + ' ' + worker.generalInfo.middleName)}</h1>
      </div>
      <Typography component="div" variant="body1" className={classes.info}>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Дата рождения:</Box>
          <Box color="info.main">20.01.20</Box>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Место рождения:</Box>
          <Box color="info.main">Тверь</Box>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Место проживания:</Box>
          <Box color="info.main">Москва</Box>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Образование:</Box>
          <Box color="info.main">Среднее специально</Box>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Должность:</Box>
          <Box color="info.main">Столяр</Box>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Стаж работы:</Box>
          <Box color="info.main">15 лет</Box>
        </div>
      </Typography>

      <div className={classes.root}>
        <Button className={classes.btn} variant="contained" color="primary" onClick={() => history.push(`/employee/${id}/medicInfo`)} >
          <LocalHospitalIcon className={classes.icon}/> Медицинский осмотр
        </Button>
        <Button className={classes.btn} variant="contained" color="primary" onClick={() => history.push(`/employee/${id}/documents`)}>
          <InsertDriveFileIcon className={classes.icon}/> Документы
        </Button>
        <Button className={classes.btn} variant="contained" color="primary" onClick={() => history.push(`/employee/${id}/update`)}>
          <ReplayIcon className={classes.icon}/> Обновить информацию
        </Button>
      </div>
    </>
  )
}
