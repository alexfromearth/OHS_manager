import React from 'react';
import {CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems from './ListItems';
import {useSelector} from "react-redux";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Route, Switch} from "react-router-dom";
import EmployeeForm from "../Forms/EmployeeForm";
import LoginPage from "../LoginPage";
import Employees from "../Employees";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    list: {
        minHeight: "90vh"
    }
}));

export default function Dashboard() {
    const isAuth = useSelector(state => state.auth.isAuth);
    console.log(isAuth);
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && isAuth && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        OHS Manager
                    </Typography>
                </Toolbar>
            </AppBar>
            <>
                {isAuth &&
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List className={classes.list}><MainListItems/></List>
                    <Divider/>
                </Drawer>
                }
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12}>
                                <Switch>
                                    {/* <PrivateRoute exact path='/home'> <Form /> </PrivateRoute> */}
                                    <Route exact path='/employee/new'> <EmployeeForm/> </Route>
                                    <Route exact path='/'> {!isAuth ? <LoginPage/> : null}</Route>
                                    <Route exact path='/company'> </Route>
                                    <Route exact path='/timetable'> </Route>
                                    <Route exact path='/note'> </Route>
                                    <Route exact path='/employees'> <Employees/> </Route>
                                    {/* <Route exact path='/employee/:id'> <Employees /> </Route> */}
                                </Switch>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </>
        </div>
    );
}


// <button><Link to='/company'>Компания</Link></button> {/* информация о компании */}
// <button><Link to='staff'>Cотрудники</Link></button> {/* список сотрудников */}
// <button><Link to='/timetable'>Расписание</Link></button> {/* расписание на неделю */}
// <button><Link to='/note'>Памятка</Link></button> {/* памятка охранника труда */}
