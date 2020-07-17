import React from 'react';
import { Grid, Hidden } from '@material-ui/core';

import Books from '../components/books/Books';
import CategoryTree from '../components/books/CategoryTree';

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Hidden smDown>
        <Grid item xs={false} sm={false} md={3} lg={2}>
          <CategoryTree />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={12} md={9} lg={10}>
        <Books />
      </Grid>
    </Grid>
  );
};

export default Home;
