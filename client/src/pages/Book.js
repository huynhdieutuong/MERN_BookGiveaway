import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import Spinner from '../components/layout/Spinner';
import BookContext from '../contexts/book/bookContext';
import ImagesSlide from '../components/book/ImagesSlide';
import BookInfo from '../components/book/BookInfo';
import Participants from '../components/book/Participants';
import NotFound from '../components/layout/NotFound';
import Breadcrumb from '../components/book/Breadcrumb';

const Book = ({ match }) => {
  const { loading, book, error, getBook } = useContext(BookContext);
  const id = match.params.slug.slice(-24);

  useEffect(() => {
    getBook(id);
    // eslint-disable-next-line
  }, []);

  if (loading || !book) return <Spinner />;

  if (error) return <NotFound />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Breadcrumb />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <ImagesSlide />
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <BookInfo />
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <Participants />
      </Grid>
    </Grid>
  );
};

export default Book;
