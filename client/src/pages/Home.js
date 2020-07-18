import React, { useContext, useEffect } from 'react';
import { Grid, Hidden } from '@material-ui/core';

import BookContext from '../contexts/book/bookContext';
import Books from '../components/books/Books';
import CategoryTree from '../components/books/CategoryTree';
import NotFound from '../components/layout/NotFound';

const Home = ({ match }) => {
  const { slug, id } = match.params;
  const { filters, getBooks, getCategory, error } = useContext(BookContext);

  useEffect(() => {
    if (slug) {
      getCategory(slug);
      getBooks(id);
    } else {
      getBooks();
    }
  }, [filters]);

  if (error) return <NotFound />;

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
