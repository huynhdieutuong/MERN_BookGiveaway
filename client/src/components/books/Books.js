import React, { useContext, useEffect, Fragment } from 'react';
import { Grid } from '@material-ui/core';

import BookContext from '../../contexts/book/bookContext';
import BookItem from './BookItem';
import SortBy from './SortBy';
import BooksPerPage from './BooksPerPage';
import Spinner from '../layout/Spinner';
import Pagination from '../layout/Pagination';
import NoItems from '../layout/NoItems';

const Books = () => {
  const { loading, books, getBooks, filters } = useContext(BookContext);

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, [filters]);

  return (
    <Fragment>
      <Grid container style={{ marginBottom: '20px' }}>
        <div style={{ flexGrow: 1 }}>
          <SortBy />
        </div>
        <BooksPerPage />
      </Grid>
      <Grid container spacing={3}>
        {loading ? (
          <Spinner />
        ) : books.length > 0 ? (
          books.map((book) => (
            <Grid key={book._id} item xs={12} sm={6} md={4} lg={3}>
              <BookItem book={book} />
            </Grid>
          ))
        ) : (
          <NoItems />
        )}
      </Grid>
      <Grid container style={{ justifyContent: 'flex-end' }}>
        <Pagination />
      </Grid>
    </Fragment>
  );
};

export default Books;
