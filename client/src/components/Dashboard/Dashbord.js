import React, {useEffect} from 'react';
import { CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems from './ListItems';
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Redirect, Route, Switch } from "react-router-dom";
import EmployeeForm from "../Forms/EmployeeForm";
import LoginPage from "../LoginPage";
import Employees from "../Employees";
import PrivateRoute from "../PrevateRoute";
import Worker from '../Worker';
import Timetable from '../Timetable'
import Company from '../Company';
import MedicalExaminations from "../Worker/MedicalExaminations";
import ModalPortal from "../ModalPortal/ModalPortal";
import portalStyles from '../ModalPortal/styles.module.sass'
import UploadScans from "../UploadScans/UploadScans";
import Note from '../Note';
import SwitchOfTheme from '../Worker/SwitchOfTheme';
import TestTable from '../Employees/Table';
import EditEmployeeForm from "../Forms/EditEmployeeForm";
import { authSC } from "../../redux/actionCreators/ActionCreators.js";
import SecondaryListItems from "./SecondListItem";
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
    height: "76vh",
  },
  logo: {
    height: 65
  },
}));

export default function Dashboard() {
  const isAuth = useSelector(state => state.auth.isAuth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    dispatch(authSC());
  }, [dispatch])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && isAuth && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            OHS Manager
                    </Typography>
          <img src="mainLogo8.png" className={classes.logo} />
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
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List><MainListItems /></List>
            <Divider />
            <List className={classes.list}><SecondaryListItems /></List>
          </Drawer>
        }
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Switch>
                  {/* <PrivateRoute exact path='/home'> <Form /> </PrivateRoute> */}
                  <PrivateRoute exact path='/employee/new'> <EmployeeForm /> </PrivateRoute>
                  <Route exact path='/'> {!isAuth ? <LoginPage /> : <Redirect to="/company" />}</Route>
                  <PrivateRoute exact path='/company'><Company /></PrivateRoute>
                  <PrivateRoute exact path='/timetable'><Timetable /> </PrivateRoute>
                  <PrivateRoute exact path='/note'> <Note /> </PrivateRoute>
                  <PrivateRoute exact path='/employees'> <Employees /> </PrivateRoute>
                  <PrivateRoute exact path='/employee/:id'> <Worker /> </PrivateRoute>
                  <PrivateRoute exact path='/employee/:id/medicInfo'> <MedicalExaminations /> </PrivateRoute>
                  <PrivateRoute exact path='/employee/:id/documents'> <SwitchOfTheme /> </PrivateRoute>
                  <PrivateRoute exact path='/employee/:id/update'> <EditEmployeeForm /> </PrivateRoute>
                  <PrivateRoute exact path='/test'>
                    <ModalPortal className={portalStyles.myModal}>
                      <UploadScans />
                    </ModalPortal>
                  </PrivateRoute>
                  <Route exact path='/test2'> <TestTable /> </Route>
                </Switch>
              </Grid>
            </Grid>
          </Container>
        </main>
      </>
    </div>
  );
}
