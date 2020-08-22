import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from 'react-router-dom'

import styles from './styles.module.sass'
import {withStyles, Theme, createStyles, makeStyles} from '@material-ui/core/styles';

import Button from "@material-ui/core/Button";
import PostAddIcon from '@material-ui/icons/PostAdd';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ModalPortal from "../../ModalPortal/ModalPortal";
import MedicalDocsModal from "./MedicalDocsModal";
import {eachWorkerThunk} from "../../../redux/thunks/eachWorkerThunk";
import {clearFileList} from "../../../redux/actionCreators/ActionCreators";



const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: 'rgb(64, 86, 181)',
      color: theme.palette.common.white,
      fontSize: 20,
    },
    body: {
      fontSize: 16,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

function createData(name, calories) {
  return {name, calories};
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  table: {
    minWidth: 700,
  },
  zagr: {
    color: 'rgb(64, 86, 181)',
    height: '100%',
  },
  btn: {
    width: 150,
    height: '100%'
  },
  addMed: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 18
  },
  iconOnBTN: {
    marginRight: 5
  },
  back: {
    fontSize: 18,
    position: 'absolute',
    marginTop: 20,
  }
});


function MedicalExaminations() {
  const history = useHistory()
  const classes = useStyles();
  const worker = useSelector(state => state.allStaff.worker)
  const companyId = useSelector(state => state.auth.companyId);
  const dispatch = useDispatch();
  const {id} = useParams();
  const [showMedicalModal, setShowMedicalModal] = useState(false);

  const rows = [
    createData('Первичный', '20.01.2018'),
    createData('Повторный', '12.12.2019'),
    createData('Повторный', '12.12.2020'),
  ];

  useEffect(() => {
    if (!showMedicalModal) {
      console.log('i dispatched');
      dispatch(eachWorkerThunk(companyId, id));
    }
  }, [dispatch, companyId, id, showMedicalModal])


  function handleClick() {
    setShowMedicalModal(state => !state);
  }

  function handleClose() {
    if (showMedicalModal) {
      dispatch(clearFileList());
    }
    setShowMedicalModal((state) => (!state));
  }

  return (
    <>
      <Button variant="contained" color="secondary" className={classes.back} onClick={() => history.push(`/employee/${id}/`)}>
        <ArrowBackIosRoundedIcon fontSize={'large'} className={classes.iconOnBTN}/>
        Назад
      </Button>
      <div className={classes.root}>

        <div className={styles.medWrapper}>
          <h1>Медицинские осмотры</h1>
          {worker.generalInfo
          &&
          <h2>Сотрудник: {worker.generalInfo.lastName + ' ' + worker.generalInfo.firstName + ' ' + worker.generalInfo.middleName}</h2>}
        </div>

        <Button variant="contained" color="primary" className={classes.addMed} onClick={handleClick}>
          <PostAddIcon fontSize={'large'} className={classes.iconOnBTN}/>
          Добавить медосмотр
        </Button>
        {showMedicalModal && <ModalPortal className={styles.myModal} >
          <MedicalDocsModal worker={worker} handleClick={handleClick} handleClose={handleClose}/>
        </ModalPortal>}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Тип медицинского осмотра</StyledTableCell>
                <StyledTableCell align="center">Дата осмотра</StyledTableCell>
                <StyledTableCell align="center">Паспорт здоровья</StyledTableCell>
                <StyledTableCell align="center">Заключение</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {worker.medicalExams && worker.medicalExams.map((row) => ( //worker.medInfo
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.type}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button className={classes.btn} href={row.passportMetadata.downloadPath}>
                      <CloudDownloadOutlinedIcon fontSize={'large'} className={classes.zagr}/>
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button className={classes.btn} href={row.doctorOpinionMetadata.downloadPath}>
                      <CloudDownloadOutlinedIcon fontSize={'large'} className={classes.zagr}/>
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    </>
  );
}

export default MedicalExaminations;
