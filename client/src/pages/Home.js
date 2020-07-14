import React from 'react';
import { Grid } from '@material-ui/core';
import Books from '../components/books/Books';

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={false} sm={false} md={3} lg={2}>
        Category
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={10}>
        <Books />
      </Grid>
    </Grid>
  );
};

export default Home;
