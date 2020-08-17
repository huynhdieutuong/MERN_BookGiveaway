import React, { useContext, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';

import EditBookForm from '../../components/book/EditBookForm';
import Spinner from '../../components/layout/Spinner';
import BookContext from '../../contexts/book/bookContext';
import { Alert } from '@material-ui/lab';

const EditBook = ({ match }) => {
  const { error, book, categories, getCategories, getBook } = useContext(
    BookContext
  );

  useEffect(() => {
    getCategories();
    getBook(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (categories.length === 0 || !book) return <Spinner />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant='h4' gutterBottom>
          Edit Book
        </Typography>
      </Grid>
      {error && (
        <Alert severity='error' style={{ width: '100%', margin: '10px 0' }}>
          {error}
        </Alert>
      )}
      <Grid item xs={12} sm={12} md={12}>
        <EditBookForm />
      </Grid>
    </Grid>
  );
};

export default EditBook;
