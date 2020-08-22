import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { allStaffThunk } from '../../redux/thunks/allStaffThunk.js';

const rows = [
  {
    name: 'вася',
    prof: 'шиномонтажник'
  },
  {
    name: 'вася',
    prof: 'шиномонтажник'
  },
  {
    name: 'вася',
    prof: 'шиномонтажник'
  },
  {
    name: 'вася',
    prof: 'шиномонтажник'
  },
  {
    name: 'вася',
    prof: 'шиномонтажник'
  },
  {
    name: 'вася',
    prof: 'шиномонтажник'
  },
  {
    name: 'вася',
    prof: 'шиномонтажник'
  },
  {
    name: 'вася',
    prof: 'шиномонтажник'
  },
  {
    name: 'вася',
    prof: 'шиномонтажник'
  },
  {
    name: 'вася',
    prof: 'шиномонтажник'
  },
  {
    name: 'женя',
    prof: 'слесарь'
  },
  {
    name: 'женя',
    prof: 'слесарь'
  },
  {
    name: 'вася',
    prof: 'шиномонтажник'
  },
  {
    name: 'гриша',
    prof: 'слесарь'
  },
  {
    name: 'вася',
    prof: 'шиномонтажник'
  },
  {
    name: 'саня',
    prof: 'шиномонтажник'
  },
  {
    name: 'лёха',
    prof: 'шиномонтажник'
  },
  {
    name: 'вася',
    prof: 'бомж'
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {

  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        <TableCell
          sortDirection={orderBy === 'name' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'name'}
            direction={orderBy === 'name' ? order : 'asc'}
            onClick={createSortHandler('name')}
          >
            Сотрудник
            {orderBy === 'name' ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <TableCell
          align='right'
          sortDirection={orderBy === 'profession' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'profession'}
            direction={orderBy === 'profession' ? order : 'asc'}
            onClick={createSortHandler('profession')}
          >
            Должность
            {orderBy === 'profession' ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>

      </TableRow>
    </TableHead>
  )
}


export default function TestTable() {
  const employees = useSelector(state => state.allStaff.list);
  const companyId = useSelector(state => state.auth.companyId);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  function handleClick(id) {
    setTimeout(() => {
      history.push(`/employee/${id}`)
    }, 210);
  }

  useEffect(() => {
    if (companyId) {
      dispatch(allStaffThunk(companyId))
    }
  }, [dispatch, companyId])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (employees) {

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(employees, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((el, index) => {
                    return (
                      <TableRow key={index} >
                        <TableCell align="left">{el.name}</TableCell>
                        <TableCell align="right">{el.profession}</TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={employees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    )
  }
  else {
    return null;
  }
}
