import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import BusinessIcon from '@material-ui/icons/Business';
import GroupIcon from '@material-ui/icons/Group';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventNoteIcon from '@material-ui/icons/EventNote';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import {useDispatch} from 'react-redux'
import {logoutSC} from '../../redux/actionCreators/ActionCreators.js';
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "black",
  }
}));

const MainListItems = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div>
      <Link to="/company" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <BusinessIcon/>
          </ListItemIcon>
          <ListItemText primary="Компания"/>
        </ListItem>
      </Link>
      <Link to="/employees" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <GroupIcon/>
          </ListItemIcon>
          <ListItemText primary="Cотрудники"/>
        </ListItem>
      </Link>
      {/*<Link to="/timetable" className={classes.link}>*/}
      {/*  <ListItem button>*/}
      {/*    <ListItemIcon>*/}
      {/*      <ListAltIcon />*/}
      {/*    </ListItemIcon>*/}
      {/*    <ListItemText primary="Расписание" />*/}
      {/*  </ListItem>*/}
      {/*</Link>*/}
      <Link to="/note" className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <EventNoteIcon/>
          </ListItemIcon>
          <ListItemText primary="Памятка"/>
        </ListItem>
      </Link>
    </div>
  )
};

export default MainListItems;




