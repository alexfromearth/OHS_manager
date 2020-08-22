import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from './Header';
import styles from './styles.module.sass';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "20px"
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
  search: {
    marginTop: '1vh',
    marginBottom: '2vh',
    fontSize: 18
  },
  input: {
    border: '1px solid grey',
    width: "13vw",
  }
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

export default function TestTable({ employees, handleClick }) {
  // const employees = useSelector(state => state.allStaff.list);
  // const companyId = useSelector(state => state.auth.companyId);
  const classes = useStyles();
  const [search, setSearch] = useState('');
  // const history = useHistory();
  // const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  // function handleClick(id) {
  //   setTimeout(() => {
  //     history.push(`/employee/${id}`)
  //   }, 210);
  // }

  // useEffect(() => {
  //   if (companyId) {
  //     dispatch(allStaffThunk(companyId))
  //   }
  // }, [dispatch, companyId])

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

  const findFilter = (arr, search) => {
    if (search !== '') {
      return arr.filter(el => {
        return el.name.includes(search) || el.profession.includes(search);
      })
    }
    return arr;
  }

  if (employees) {

    return (
      <div className={classes.root}>
        <div className={classes.search}>
          <strong>Поиск: </strong>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className={classes.input}/>
        </div>
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
                {stableSort(findFilter(employees, search), getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((el, index) => {
                    return (
                      <TableRow key={index} onClick={()=>handleClick(el._id)} className={styles.lol}>
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
            count={findFilter(employees, search).length}
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

