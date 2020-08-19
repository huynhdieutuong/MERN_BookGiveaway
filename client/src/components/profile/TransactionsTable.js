import React, { useContext, useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { TableCell } from '@material-ui/core';

import Spinner from '../layout/Spinner';
import BookContext from '../../contexts/book/bookContext';
import BasicTable from '../table/BasicTable';

const headCells = [
  { id: 'book', numeric: false, disablePadding: true, label: 'Book' },
  { id: 'giver', numeric: true, disablePadding: false, label: 'Giver' },
  { id: 'receiver', numeric: true, disablePadding: false, label: 'Receiver' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'createAt', numeric: true, disablePadding: false, label: 'Create At' },
];

const createData = (_id, book, giver, receiver, status, createAt) => {
  return { _id, book, giver, receiver, status, createAt };
};

const TransactionsTable = () => {
  const { loading, myTransactions, getMyTransactions } = useContext(
    BookContext
  );
  const [transactions, setTransactions] = useState([]);

  const onSearch = (e) => {
    const filtered = myTransactions.filter(
      (transaction) =>
        transaction.book.title
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) !== -1
    );

    setTransactions(filtered);
  };

  const rows = transactions.map((transaction) =>
    createData(
      transaction._id,
      transaction.book,
      transaction.giver.name,
      transaction.receiver.name,
      transaction.status,
      transaction.createAt
    )
  );

  useEffect(() => {
    if (!myTransactions) getMyTransactions();
    if (myTransactions) setTransactions(myTransactions);
    // eslint-disable-next-line
  }, [myTransactions]);

  if (loading) return <Spinner />;

  return (
    <BasicTable
      tableName='Transactions'
      headCells={headCells}
      rows={rows}
      onSearch={onSearch}
      viewButton='/transactions'
    >
      {(row, labelId) => (
        <Fragment>
          <TableCell component='th' id={labelId} scope='row' padding='none'>
            <Link to={`/${row.book._id}`}>{row.book.title}</Link>
          </TableCell>
          <TableCell align='right'>{row.giver}</TableCell>
          <TableCell align='right'>{row.receiver}</TableCell>
          <TableCell align='right'>{row.status}</TableCell>
          <TableCell align='right'>
            <Moment format='DD/MM/YYYY'>{row.createAt}</Moment>
          </TableCell>
        </Fragment>
      )}
    </BasicTable>
  );
};

export default TransactionsTable;
