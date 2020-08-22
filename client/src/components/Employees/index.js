import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { allStaffThunk } from '../../redux/thunks/allStaffThunk.js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ModalPortal from "../ModalPortal/ModalPortal";
import FillDataBaseExelModal from "../FillDataBaseExelModal";
import portalStyles from "../ModalPortal/styles.module.sass";
import { clearFileList } from "../../redux/actionCreators/ActionCreators";
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import Table from "./Table";

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
  btnExel: {
    // backgroundColor: "dodgerblue"
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
  icon: {
    fontSize: 20,
    marginRight: 5
  },
  progress: {
    justifySelf: "center",
    alignSelf: "center",
    minHeight: "74vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));


export default function Employees() {
  const dispatch = useDispatch()
  const history = useHistory()
  const employees = useSelector(state => state.allStaff.list)
  const uploadingScans = useSelector(state => state.allStaff.uploadingScans);
  const id = useSelector(state => state.auth.companyId)
  const classes = useStyles()

  const [showExelModal, setShowExelModal] = useState(false);

  useEffect(() => {
    if (!uploadingScans) {
      dispatch(allStaffThunk(id))
    }
  }, [dispatch, id, uploadingScans])

  function handleClick(id) {
    // setTimeout(() => {
      history.push(`/employee/${id}`)
    // }, 210);
  }

  function handleToggle() {
    setShowExelModal(state => !state);
  }


  function handleClose() {
    if (showExelModal) {
      dispatch(clearFileList());
    }
    setShowExelModal((state) => (!state));
  }


  return (
    <>
      <div className={classes.hdr}>
        <Button variant="contained" color="primary"
          className={classes.btns}
          onClick={() => history.push('/employee/new')}>
          <AddIcon className={classes.icon} />
          Добавить работника
        </Button>
        <h1>Cотрудники</h1>
        <Button variant="contained"
          className={classes.btnExel}
          color="secondary"
          onClick={() => {
            setShowExelModal(state => !state)
          }}
        >
          <FontAwesomeIcon icon={faFileExcel} className={classes.icon} />
          Загрузить базу данных сотрудников
        </Button>
        {showExelModal
          && <ModalPortal className={portalStyles.myModal}>
            <FillDataBaseExelModal handleToggle={handleToggle} handleClose={handleClose} />
          </ModalPortal>}
      </div>
      {/* <div className={classes.root}>
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
            {uploadingScans
              ? <div className={classes.progress}><CircularProgress color={"secondary"} size={160}/></div>
              : employees && employees.map((el, index) => {
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
      </div> */}
      {uploadingScans
        ? <div className={classes.progress}><CircularProgress color={"secondary"} size={160} /></div>
        : employees &&
        <Table employees={employees} handleClick={handleClick} />
      }
    </>
  )
}

