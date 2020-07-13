import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import BookContext from '../../contexts/book/bookContext';
import BookItem from './BookItem';
import Spinner from '../layout/Spinner';

const Books = () => {
  const { books, pagination, getBooks } = useContext(BookContext);

  useEffect(() => {
    getBooks();
  }, []);

  if (books.length === 0) return <Spinner />;

  console.log(books);
  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid key={book._id} item xs={12} sm={6} md={4} lg={3}>
          <BookItem book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Books;
