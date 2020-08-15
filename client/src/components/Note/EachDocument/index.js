import React from 'react';
import fileDownload from 'js-file-download';

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
    },
    btn: {
      width: 90,
      height: 70
    }
  }),
);

// https://files.stroyinf.ru/Data2/1/4294845/4294845267.pdf
export default function EachDocument() {
  const classes = useStyles();

  return (
    <div className={classes.eachDoc}>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <InsertDriveFileRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Обязанности работодателя по обеспечению безопасных и здоровых условий труда" secondary="19 KB" />
      </ListItem>
      <a href='https://aldebaran.ru/author/bakulin_aleksandr/kniga_gravitaciya_i_yefir/download.a6.pdf' download>
        <Button className={classes.btn}>
          <CloudDownloadOutlinedIcon fontSize={'large'} color={'primary'} />
        </Button>
      </a>
    </div>
  )
}
