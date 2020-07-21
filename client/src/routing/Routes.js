import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfileContext from '../contexts/profile/profileContext';
import Spinner from '../components/layout/Spinner';
import NotFound from '../components/layout/NotFound';
import PrivateRoute from './PrivateRoute';

import Books from '../pages/book/Books';
import Book from '../pages/book/Book';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import Profile from '../pages/profile/Profile';

const Routes = () => {
  const { loading, getProfile } = useContext(ProfileContext);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <Switch>
      <Route exact path='/' component={Books} />
      <Route exact path='/sign-up' component={SignUp} />
      <Route exact path='/sign-in' component={SignIn} />
      <PrivateRoute exact path='/profile' component={Profile} />
      <Route exact path='/:slug' component={Book} />
      <Route exact path='/:slug/:id' component={Books} /> {/* Category */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
