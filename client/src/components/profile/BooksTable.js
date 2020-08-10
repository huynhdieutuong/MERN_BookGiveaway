import React, { useContext, useEffect, Fragment } from 'react';
import Moment from 'react-moment';
import { TableCell } from '@material-ui/core';

import Spinner from '../layout/Spinner';
import BookContext from '../../contexts/book/bookContext';
import EnhancedTable from '../enhanced-table/EnhancedTable';

const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'requests', numeric: true, disablePadding: false, label: 'N.Requests' },
  { id: 'createAt', numeric: true, disablePadding: false, label: 'Create At' },
];

const createData = (_id, title, status, requests, createAt) => {
  return { _id, title, status, requests, createAt };
};

const BooksTable = () => {
  const { loading, myBooks, getMyBooks } = useContext(BookContext);

  const rows = myBooks.map((book) =>
    createData(book._id, book.title, book.isGave, book.requests, book.createAt)
  );

  useEffect(() => {
    getMyBooks();
  }, []);

  if (loading) return <Spinner />;

  return (
    <EnhancedTable tableName='Books' headCells={headCells} rows={rows}>
      {(row, labelId) => (
        <Fragment>
          <TableCell component='th' id={labelId} scope='row' padding='none'>
            {row.title}
          </TableCell>
          <TableCell align='right'>{row.status ? 'Gave' : 'Instock'}</TableCell>
          <TableCell align='right'>{row.requests}</TableCell>
          <TableCell align='right'>
            <Moment format='DD/MM/YYYY'>{row.createAt}</Moment>
          </TableCell>
        </Fragment>
      )}
    </EnhancedTable>
  );
};

export default BooksTable;