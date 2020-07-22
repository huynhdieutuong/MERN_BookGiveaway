import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import ProfileContext from '../contexts/profile/profileContext';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { profile } = useContext(ProfileContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        profile ? <Redirect to='/profile' /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
