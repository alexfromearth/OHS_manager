import React, { useState } from 'react';
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
];

const headCells = [
  { id: 'number', numeric: false, label: 'Номер' },
  { id: 'name', numeric: false, label: 'Сотрудник' },
  { id: 'profession', numeric: true, label: 'Должность' },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          Номер
        </TableCell>
        <TableCell>
          Сотрудник
        </TableCell>
        <TableCell>
          Должность
          <TableSortLabel
          // onClick={createSortHandler(headCell.id)}
          />
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}));

export default function TestTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [order, setOrder] = useState('asc');
  // const [orderBy, setOrderBy] = useState('calories');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((el, index) => {
                  return (
                    <TableRow key={index} >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{el.name}</TableCell>
                      <TableCell align="right">{el.prof}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
