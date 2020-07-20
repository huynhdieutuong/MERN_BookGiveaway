import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import './App.css';

import BookState from './contexts/book/BookState';
import AuthState from './contexts/auth/AuthState';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import NotFound from './components/layout/NotFound';

import Home from './pages/Home';
import Book from './pages/Book';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <AuthState>
      <BookState>
        <Router>
          <Navbar />
          <Container fixed style={{ marginTop: '40px', marginBottom: '40px' }}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/sign-up' component={SignUp} />
              <Route exact path='/sign-in' component={SignIn} />
              <Route exact path='/:slug' component={Book} />
              <Route exact path='/:slug/:id' component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Container>
          <Footer />
        </Router>
      </BookState>
    </AuthState>
  );
};

export default App;
