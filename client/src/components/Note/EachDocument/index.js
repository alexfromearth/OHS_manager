import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import InsertDriveFileRoundedIcon from '@material-ui/icons/InsertDriveFileRounded';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() =>
  createStyles({
    eachDoc: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    },
    btn: {
      width: 90,
      height: '100%'
    },
    purple: {
      backgroundColor: 'rgb(64, 86, 181)',
    },
    zagr: {
      color: 'rgb(64, 86, 181)',
      height: '100%'
    },
    a: {
      height: '100%'
    }
  }),
);

export default function EachDocument({ document, nameOfDocument, size }) {
  const classes = useStyles();

  return (
    <div className={classes.eachDoc}>
      <ListItem >
        <ListItemAvatar>
          <Avatar className={classes.purple}>
            <InsertDriveFileRoundedIcon />
          </Avatar >
        </ListItemAvatar>
        <ListItemText primary={nameOfDocument} secondary={size} />
      </ListItem>
      <a href={`http://localhost:3001/fileStore/notes/${document}.doc`} download className={classes.a}>
        <Button className={classes.btn}>
          <CloudDownloadOutlinedIcon fontSize={'large'} className={classes.zagr} />
        </Button>
      </a>
    </div>
  )
}
