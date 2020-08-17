import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
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
  switch: {
    position: 'absolute',
    right: 50,
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    color: 'rgb(64, 86, 181)',
  },
  grid: {
    fontSize: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
      <FormControl className={classes.switch}>
        <FormLabel className={classes.label}>Выбор темы в зависимости от компа</FormLabel>
        <Typography component="div" >
          <Grid component="label" container alignItems="center" spacing={1} className={classes.grid}>
            <Grid item >Для слабых</Grid>
            <Grid>
              <FormControlLabel
                control={<Switch color='primary' checked={state.gilad} onChange={handleChange} name="gilad" />}
              />
            </Grid>
            <Grid item>Для сильных</Grid>
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
