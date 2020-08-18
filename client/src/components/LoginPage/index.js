import React from 'react';
import { Avatar, Button, CssBaseline, TextField, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSC } from "../../redux/actionCreators/ActionCreators";
import Alert from "@material-ui/lab/Alert";
import { setError } from "../../redux/actionCreators/ActionCreators.js";




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const errorMessage = useSelector(state => state.auth.errorMessage);

  function handleSubmit(e) {
    e.preventDefault();
    const { companyEmail, password } = e.target;
    if (companyEmail.value === '' || password.value === '') {
      dispatch(setError('Пожалуйста, заполните все поля'))
    } else {
      dispatch(loginSC({ companyEmail: companyEmail.value, password: password.value }))
      history.push('/');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
                </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="companyEmail"
            label="Почтовый адрес"
            name="companyEmail"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
                    </Button>
          {/*<Grid container>*/}
          {/*    <Grid item>*/}
          {/*        <NavLink to="/registration" variant="body2">*/}
          {/*            {"? Sign Up"}*/}
          {/*        </NavLink>*/}
          {/*    </Grid>*/}
          {/*</Grid>*/}
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;
