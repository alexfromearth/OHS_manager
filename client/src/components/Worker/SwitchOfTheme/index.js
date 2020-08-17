import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import DocumentsCopy from "../DocumentsCopy"
import Documents from "../Documents/Documents"

import Button from "@material-ui/core/Button";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {
    position: 'absolute',
    right: 50,
  },
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
    justifyContent: 'center',
    marginBottom: 25
  }
});


export default function SwitchOfTheme() {
  const history = useHistory()
  const classes = useStyles();
  const [state, setState] = useState(true);

  const handleChange = () => {
    setState((state) => !state);
  };

  return (
    <>
      <FormControl component="fieldset" className={classes.main}>
        <FormLabel component="legend">Выбор темы</FormLabel>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Для слабых компутеров</Grid>
            <Grid>
              <FormControlLabel
                control={<Switch color='primary' checked={state.gilad} onChange={handleChange} name="gilad" />}
              />
            </Grid>
            <Grid item>Для сильных компуктеров</Grid>
          </Grid>
        </Typography>
      </FormControl>
      <Button variant="contained" color="secondary" className={classes.back} onClick={() => history.goBack()}>
        <ArrowBackIosRoundedIcon fontSize={'large'} className={classes.iconOnBTN} />
          Назад
      </Button>
      <div className={classes.zagolovok}>
        <h1>Документы</h1>
        <h2>Сотрудник: Ударников Лопес Игоревич</h2>
        {/* {worker && <h6> <h2>Сотрудник: {worker.generalInfo.lastName + ' ' + worker.generalInfo.firstName + ' ' + worker.generalInfo.middleName}</h2> */}
      </div>
      {state
        ? <DocumentsCopy />
        : <Documents />
      }
    </>
  )
}
