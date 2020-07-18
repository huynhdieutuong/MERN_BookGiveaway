import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import './App.css';

import BookState from './contexts/book/BookState';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Book from './pages/Book';
import NotFound from './components/layout/NotFound';

const App = () => {
  return (
    <BookState>
      <Router>
        <Navbar />
        <Container fixed style={{ marginTop: '40px', marginBottom: '40px' }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/:slug' component={Book} />
            <Route component={NotFound} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </BookState>
  );
};

export default App;
