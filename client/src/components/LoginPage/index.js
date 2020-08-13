import React from 'react';
import {Avatar, Button, CssBaseline, TextField, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginSC} from "../../redux/actionCreators/ActionCreators";


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

    function handleSubmit(e) {
        e.preventDefault();
        const {companyEmail, password} = e.target;
        dispatch(loginSC(companyEmail.value, password.value))
        history.push('/');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
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
