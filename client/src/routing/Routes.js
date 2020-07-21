import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfileContext from '../contexts/profile/profileContext';
import NotFound from '../components/layout/NotFound';

import Books from '../pages/book/Books';
import Book from '../pages/book/Book';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';

const Routes = () => {
  const { profile, getProfile } = useContext(ProfileContext);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <Switch>
      <Route exact path='/' component={Books} />
      <Route exact path='/sign-up' component={SignUp} />
      <Route exact path='/sign-in' component={SignIn} />
      <Route exact path='/:slug' component={Book} />
      <Route exact path='/:slug/:id' component={Books} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
