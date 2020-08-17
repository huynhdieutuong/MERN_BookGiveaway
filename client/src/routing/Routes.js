import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfileContext from '../contexts/profile/profileContext';
import Spinner from '../components/layout/Spinner';
import NotFound from '../components/layout/NotFound';
import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';

import Books from '../pages/book/Books';
import Book from '../pages/book/Book';
import AddBook from '../pages/book/AddBook';
import EditBook from '../pages/book/EditBook';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import Profile from '../pages/profile/Profile';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import NotVerify from '../pages/auth/NotVerify';
import Confirmation from '../pages/auth/Confirmation';
import EditProfile from '../pages/profile/EditProfile';

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
      <AuthRoute exact path='/sign-up' component={SignUp} />
      <AuthRoute exact path='/sign-in' component={SignIn} />
      <AuthRoute exact path='/forgot-password' component={ForgotPassword} />
      <AuthRoute
        exact
        path='/reset-password/:token'
        component={ResetPassword}
      />
      <Route exact path='/not-verify' component={NotVerify} />
      <Route exact path='/confirmation/:token' component={Confirmation} />
      <PrivateRoute exact path='/profile' component={Profile} />
      <PrivateRoute exact path='/edit-profile' component={EditProfile} />
      <PrivateRoute exact path='/add-book' component={AddBook} />
      <PrivateRoute exact path='/edit-book/:id' component={EditBook} />
      <Route exact path='/:slug' component={Book} />
      <Route exact path='/:slug/:id' component={Books} /> {/* Category */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
