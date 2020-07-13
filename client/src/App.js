import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './App.css';

import BookState from './contexts/book/BookState';
import Navbar from './components/layout/Navbar';
import Books from './components/books/Books';

const App = () => {
  return (
    <BookState>
      <Router>
        <Navbar />
        <Grid container style={{ marginTop: '20px' }}>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Switch>
              <Route path='/' component={Books} />
            </Switch>
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Router>
    </BookState>
  );
};

export default App;
