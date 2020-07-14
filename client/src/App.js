import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import './App.css';

import BookState from './contexts/book/BookState';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';

const App = () => {
  return (
    <BookState>
      <Router>
        <Navbar />
        <Container fixed style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Switch>
            <Route path='/' component={Home} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </BookState>
  );
};

export default App;
