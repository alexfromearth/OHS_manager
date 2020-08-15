import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { allStaffThunk } from '../../redux/thunks/allStaffThunk.js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    justifyContent: "center",
  },
  hdr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItem: 'center'
  },
  btns: {
    height: 50,
  },
  employee: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  wrapper: {
    minWidth: 650,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonGroup: {
    minWidth: 800,
  },
  wrapperHead: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    fontWeight: 800,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 21,
    paddingRight: 21,
  },
  index: {
    minWidth: 20,
    marginRight: 10,
  },
  fio: {
    minWidth: 350,
    textAlign: "left",
  },
  prof: {
    minWidth: 350,
    textAlign: "left",
  },
  icon:{
    marginRight: 5
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
        <Button variant="contained" color="primary"
          className={classes.btns}
          onClick={() => history.push('/employee/new')}>
          <AddIcon className={classes.icon}/>
          Добавить работника
        </Button>
        <h1>Cотрудники</h1>
        <Button variant="contained" color="primary" className={classes.btns}>
          <FilterListIcon className={classes.icon}/>
          Фильтр
        </Button>
      </div>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <div className={classes.wrapperHead}>
            <span className={classes.index}>№</span>
            <span className={classes.fio}>ФИО</span>
            <span className={classes.prof}>Профессия</span>
          </div>
          <ButtonGroup
            orientation="vertical"
            color="primary"
            className={classes.buttonGroup}
            aria-label="vertical outlined primary button group"
            size="large"
            variant="outlined"
          >
            {employees && employees.map((el, index) => {
              return <Button key={el._id}
                className={classes.employee}
                onClick={() => handleClick(el._id)}>
                <span className={classes.index}>{index + 1}</span>
                <span className={classes.fio}>{el.name}</span>
                <span className={classes.prof}>{el.profession} </span>
              </Button>
            })}
          </ButtonGroup>
        </div>
      </div>
    </>
  )
}

