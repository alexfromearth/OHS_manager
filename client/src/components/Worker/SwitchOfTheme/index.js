import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { eachWorkerThunk } from '../../../redux/thunks/eachWorkerThunk';
import DocumentsCopy from "../DocumentsCopy"
import Documents from "../Documents/Documents"

import Button from "@material-ui/core/Button";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  iconOnBTN: {
    marginRight: 5
  },
  back: {
    fontSize: 18,
    position: 'absolute',
    marginTop: 20,
  },
  zagolovok: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  switch: {
    position: 'absolute',
    right: '10vw',
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    color: 'rgb(64, 86, 181)',
    textAlign: 'center',
    marginBottom: 3,
  },
  grid: {
    fontSize: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});


export default function SwitchOfTheme() {
  const { id } = useParams();
  const history = useHistory()
  const dispatch= useDispatch()
  const classes = useStyles();
  const companyId = useSelector(state => state.auth.companyId);
  const worker = useSelector(state => state.allStaff.worker);
  const [state, setState] = useState(false);

  useEffect(() => {
      dispatch(eachWorkerThunk(companyId, id));
  }, [dispatch, companyId, id])

  const handleChange = () => {
    setState((state) => !state);
  };

  return (
    <>
      <FormControl className={classes.switch}>
        <FormLabel className={classes.label}>Выбор темы</FormLabel>
        <Typography component="div" >
          <Grid component="label" container alignItems="center" spacing={4} className={classes.grid}>
            <Grid item >Стандартная</Grid>
            <Grid>
              <FormControlLabel
                control={<Switch color='primary' checked={state} onChange={handleChange} />}
              />
            </Grid>
            <Grid >Продвинутая</Grid>
          </Grid>
        </Typography>
      </FormControl>

      <Button variant="contained" color="secondary" className={classes.back} onClick={() => history.push(`/employee/${id}/`)}>
        <ArrowBackIosRoundedIcon fontSize={'large'} className={classes.iconOnBTN} />
          Назад
      </Button>

      <div className={classes.zagolovok}>
        <h1>Документы</h1>
        {worker.generalInfo
          &&
          <h2>Сотрудник: {worker.generalInfo.lastName + ' ' + worker.generalInfo.firstName + ' ' + worker.generalInfo.middleName}</h2>}
      </div>

      {state
        ? <Documents />
        : <DocumentsCopy />
      }
    </>
  )
}
