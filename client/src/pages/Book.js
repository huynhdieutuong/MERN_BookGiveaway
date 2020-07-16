import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Spinner from '../components/layout/Spinner';
import BookContext from '../contexts/book/bookContext';

const Book = ({ match }) => {
  const { loading, book, error, getBook } = useContext(BookContext);
  const id = match.params.slug.slice(-24);

  useEffect(() => {
    getBook(id);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  console.log(book);
  console.log(error);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4}>
        <h3>IMAGES</h3>
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <h3>INFO</h3>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <h3>REQUESTS</h3>
      </Grid>
    </Grid>
  );
};

export default Book;
