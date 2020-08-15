import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import EachDocument from './EachDocument';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '50vw',
      // maxWidth: '90%',
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    h1:{
      // textAlign: 'center'
    }
  }),
);

export default function Note() {
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.h1}>Памятка сотрудника охраны труда</h1>

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Основные документы
        </ListSubheader>
        }
        className={classes.root}
      >
        <EachDocument className={classes.root}/>
        <EachDocument />
        <EachDocument />
        <EachDocument />
        <EachDocument />
        <EachDocument />
      </List>
    </>
  );
}
