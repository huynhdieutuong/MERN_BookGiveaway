import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import ProfileContext from '../contexts/profile/profileContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { profile } = useContext(ProfileContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        profile ? <Component {...props} /> : <Redirect to='/sign-in' />
      }
    />
  );
};

export default PrivateRoute;
