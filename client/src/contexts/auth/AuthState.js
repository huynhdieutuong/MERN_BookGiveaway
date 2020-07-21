import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import AuthReducer from './authReducer';
import ProfileContext from '../profile/profileContext';

import { SIGNIN_SUCCESS, SIGNUP_SUCCESS, AUTH_FAIL } from '../types';

const AuthState = (props) => {
  const { getProfile } = useContext(ProfileContext);

  const initialState = {
    error: null,
    message: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const { error, message } = state;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Sign in
  const signIn = async (formData) => {
    try {
      await axios.post('/api/auth/login', formData, config);

      dispatch({ type: SIGNIN_SUCCESS });

      getProfile();
      return true;
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
        payload: error.response.data,
      });
    }
  };

  // Sign up
  const signUp = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData, config);

      dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
      return true;
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
        payload: error.response.data,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        error,
        message,
        signIn,
        signUp,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
