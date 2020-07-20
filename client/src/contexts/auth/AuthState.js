import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import { SIGNIN_SUCCESS, SIGNIN_FAIL } from '../types';

const AuthState = (props) => {
  const initialState = {
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { user, error } = state;

  // Sign in
  const signIn = async ({ email, password }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        '/api/auth/login',
        { email, password },
        config
      );

      dispatch({ type: SIGNIN_SUCCESS });
    } catch (error) {
      dispatch({
        type: SIGNIN_FAIL,
        payload: error.response.data,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        signIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
