import React, { useContext, useEffect, Fragment, useState } from 'react';
import Moment from 'react-moment';
import { TableCell } from '@material-ui/core';

import Spinner from '../layout/Spinner';
import BookContext from '../../contexts/book/bookContext';
import BasicTable from '../table/BasicTable';

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
  const [books, setBooks] = useState([]);

  const onSearch = (e) => {
    const filtered = myBooks.filter(
      (book) =>
        book.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );

    setBooks(filtered);
  };

  const rows = books.map((book) =>
    createData(book._id, book.title, book.isGave, book.requests, book.createAt)
  );

  useEffect(() => {
    if (myBooks.length === 0) getMyBooks();
    setBooks(myBooks);
  }, [myBooks]);

  if (loading) return <Spinner />;

  return (
    <BasicTable
      tableName='Books'
      headCells={headCells}
      rows={rows}
      addButton='/add-book'
      onSearch={onSearch}
    >
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
    </BasicTable>
  );
};

export default BooksTable;
