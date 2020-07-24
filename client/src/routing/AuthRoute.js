import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import ProfileContext from '../contexts/profile/profileContext';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { profile } = useContext(ProfileContext);

  if (profile) return <Redirect to='/profile' />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default AuthRoute;
