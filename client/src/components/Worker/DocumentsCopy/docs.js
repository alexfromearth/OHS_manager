import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import InsertDriveFileRoundedIcon from '@material-ui/icons/InsertDriveFileRounded';

const useStyles = makeStyles({
  purple: {
    backgroundColor: 'rgb(64, 86, 181)',
  },
  listitem: {
    width: '70%',
    textAlign: 'center'
  },
});

export default function Docs() {
  const classes = useStyles();
  return (
    <ListItem button className={classes.listitem}>
      <ListItemText primary={'подписанные'} />
      <ListItemAvatar>
        <Avatar className={classes.purple}>
          <InsertDriveFileRoundedIcon />
        </Avatar >
      </ListItemAvatar>
    </ListItem>
  )
}
