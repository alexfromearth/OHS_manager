import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default function EnhancedTableHead(props) {

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
