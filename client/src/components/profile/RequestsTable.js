import React, { useContext, useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { TableCell } from '@material-ui/core';

import Spinner from '../layout/Spinner';
import BookContext from '../../contexts/book/bookContext';
import BasicTable from '../table/BasicTable';

const headCells = [
  {
    id: 'book',
    numeric: false,
    disablePadding: true,
    label: 'Book',
  },
  { id: 'owner', numeric: true, disablePadding: false, label: 'Owner' },
  { id: 'createAt', numeric: true, disablePadding: false, label: 'Create At' },
];

const createData = (_id, book, owner, createAt) => {
  return { _id, book, owner, createAt };
};

const RequestsTable = () => {
  const { loading, myRequests, getMyRequests, deleteRequest } = useContext(
    BookContext
  );
  const [requests, setRequests] = useState([]);

  const onSearch = (e) => {
    const filtered = myRequests.filter(
      (request) =>
        request.book.title
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) !== -1
    );

    setRequests(filtered);
  };

  const rows = requests.map((request) =>
    createData(
      request._id,
      request.book,
      request.book.user.name,
      request.createAt
    )
  );

  useEffect(() => {
    if (myRequests.length === 0) getMyRequests();
    setRequests(myRequests);
    // eslint-disable-next-line
  }, [myRequests]);

  if (loading) return <Spinner />;

  return (
    <BasicTable
      tableName='Requests'
      headCells={headCells}
      rows={rows}
      onSearch={onSearch}
      onDelete={deleteRequest}
    >
      {(row, labelId) => (
        <Fragment>
          <TableCell component='th' id={labelId} scope='row' padding='none'>
            <Link to={`/${row.book._id}`}>{row.book.title}</Link>
          </TableCell>
          <TableCell align='right'>{row.owner}</TableCell>
          <TableCell align='right'>
            <Moment format='DD/MM/YYYY'>{row.createAt}</Moment>
          </TableCell>
        </Fragment>
      )}
    </BasicTable>
  );
};

export default RequestsTable;
