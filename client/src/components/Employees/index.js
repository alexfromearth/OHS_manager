import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { allStaffThunk } from '../../redux/thunks/allStaffThunk.js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '70vw',
    marginTop: '4vw',
    marginLeft: '15vw',
    marginRight: '15vw',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  hdr: {
    maxWidth: '70vw',
    marginLeft: '15vw',
    marginRight: '15vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center'
  },
  love: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: '70vw',
    fontSize: '30px'
  }
}));


export default function Employees() {
  const dispatch = useDispatch()
  const history = useHistory()
  const employees = useSelector(state => state.allStaff.list)
  const id = useSelector(state => state.auth.companyId)
  const classes = useStyles()

  useEffect(() => {
    dispatch(allStaffThunk(id))
  }, [dispatch, id])

  function handleClick(id) {
    setTimeout(() => {
      history.push(`/employee/${id}`)
    }, 210);
  }

  return (
    <>
      <div className={classes.hdr}>
        <Button variant="contained" color="primary" onClick={() => history.push('/employee/new')}>Добавить работника</Button>
        <h1>Cотрудники</h1>
        <Button variant="contained" color="primary">Фильтр</Button>
      </div>
      <List className={classes.root}>
        {employees && employees.map((el, index) => {
          return <ListItem key={el._id} dense button className={classes.love} onClick={() => handleClick(el._id)}>
            <div>{index + 1}</div>
            <div>{el.name}</div>
            <div>{el.profession}</div>
          </ListItem>
        })}
      </List>
    </>
  )
}
