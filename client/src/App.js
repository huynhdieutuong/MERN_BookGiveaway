import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from '@material-ui/core';
import './App.css';

import BookState from './contexts/book/BookState';
import AuthState from './contexts/auth/AuthState';
import ProfileState from './contexts/profile/ProfileState';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Routes from './routing/Routes';

const App = () => {
  return (
    <ProfileState>
      <AuthState>
        <BookState>
          <Router>
            {/* Header */}
            <Navbar />

            {/* Content */}
            <Container
              fixed
              style={{ marginTop: '40px', marginBottom: '40px' }}
            >
              <Routes />
            </Container>

            {/* Footer */}
            <Footer />
          </Router>
        </BookState>
      </AuthState>
    </ProfileState>
  );
};

export default App;
