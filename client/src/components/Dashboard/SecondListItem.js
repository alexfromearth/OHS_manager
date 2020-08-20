import React from 'react';
import {useDispatch} from "react-redux";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import {logoutSC} from "../../redux/actionCreators/ActionCreators";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

const SecondaryListItems = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Link to="/" className={classes.link}>
        <ListItem onClick={() => dispatch(logoutSC())} button>
          <ListItemIcon>
            <MeetingRoomIcon/>
          </ListItemIcon>
          <ListItemText primary="Выход"/>
        </ListItem>
      </Link>
    </div>
  )
}

export default SecondaryListItems;
