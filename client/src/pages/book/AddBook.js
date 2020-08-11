import React, { useContext, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';

import AddBookForm from '../../components/book/AddBookForm';
import Spinner from '../../components/layout/Spinner';
import BookContext from '../../contexts/book/bookContext';
import { Alert } from '@material-ui/lab';

const AddBook = () => {
  const { error, categories, getCategories } = useContext(BookContext);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  if (categories.length === 0) return <Spinner />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant='h4' gutterBottom>
          Add Book
        </Typography>
      </Grid>
      {error && (
        <Alert severity='error' style={{ width: '100%', margin: '10px 0' }}>
          {error}
        </Alert>
      )}
      <Grid item xs={12} sm={12} md={12}>
        <AddBookForm />
      </Grid>
    </Grid>
  );
};

export default AddBook;
