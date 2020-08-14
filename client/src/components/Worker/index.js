import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { eachWorkerThunk } from '../../redux/thunks/eachWorkerThunk';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ReplayIcon from '@material-ui/icons/Replay';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

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
    fontSize: 20
  },
}));

export default function Worker() {
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
  //onClick={() => history.push('/employee/new')}
  console.log(worker);
  return (
    <>
      <h1>{worker && (worker.generalInfo.lastName + ' ' + worker.generalInfo.firstName + ' ' + worker.generalInfo.middleName)}</h1>
      <h1>{worker && worker.profInfo.profession}</h1>
      <div className={classes.root}>
        <Button className={classes.btn} variant="contained" color="primary" >
          <LocalHospitalIcon /> Медицинский осмотр
        </Button>
        <Button className={classes.btn} variant="contained" color="primary" >
          <InsertDriveFileIcon /> Документы
        </Button>
        <Button className={classes.btn} variant="contained" color="primary" >
          <ReplayIcon /> Обновить информацию
        </Button>
      </div>
    </>
  )
}
