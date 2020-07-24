import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import ProfileContext from '../contexts/profile/profileContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { profile } = useContext(ProfileContext);

  if (!profile) return <Redirect to='/sign-in' />;

  if (!profile.isActive) return <Redirect to='/not-verify' />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
