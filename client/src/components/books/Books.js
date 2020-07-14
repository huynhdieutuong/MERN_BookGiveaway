import React, { useContext, useEffect, Fragment } from 'react';
import { Grid } from '@material-ui/core';

import BookContext from '../../contexts/book/bookContext';
import BookItem from './BookItem';
import Spinner from '../layout/Spinner';
import Pagination from '../layout/Pagination';

const Books = () => {
  const { books, total, limit, getBooks } = useContext(BookContext);

  useEffect(() => {
    getBooks({ page: 1, limit: 20 });
    // eslint-disable-next-line
  }, []);

  if (books.length === 0) return <Spinner />;

  return (
    <Fragment>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid key={book._id} item xs={12} sm={6} md={4} lg={3}>
            <BookItem book={book} />
          </Grid>
        ))}
      </Grid>
      <Grid container style={{ justifyContent: 'flex-end' }}>
        <Pagination total={total} limit={limit} />
      </Grid>
    </Fragment>
  );
};

export default Books;
