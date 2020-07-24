import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import AuthReducer from './authReducer';
import ProfileContext from '../profile/profileContext';

import {
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNOUT_SUCCESS,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  RESEND_EMAIL,
  CONFIRM_EMAIL,
  AUTH_FAIL,
} from '../types';

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

  // Sign out
  const signOut = async () => {
    try {
      await axios.get('/api/auth/logout');

      dispatch({ type: SIGNOUT_SUCCESS });

      getProfile();
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
        payload: error.response.data,
      });
    }
  };

  // Forgot password
  const forgotPassword = async (formData) => {
    try {
      const res = await axios.post(
        '/api/auth/forgot-password',
        formData,
        config
      );

      dispatch({ type: FORGOT_PASSWORD, payload: res.data });
      return true;
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
        payload: error.response.data,
      });
    }
  };

  // Reset password
  const resetPassword = async (formData, token) => {
    try {
      const res = await axios.put(
        `/api/auth/reset-password/${token}`,
        formData,
        config
      );

      dispatch({ type: RESET_PASSWORD, payload: res.data });
      return true;
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
        payload: error.response.data,
      });
    }
  };

  // Resend email to active account
  const resendEmail = async () => {
    try {
      const res = await axios.get('/api/auth/resend');

      dispatch({ type: RESEND_EMAIL, payload: res.data });
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
        payload: error.response.data,
      });
    }
  };

  // Confirm email to active account
  const confirmEmail = async (token) => {
    try {
      const res = await axios.get(`/api/auth/confirmation/${token}`);

      dispatch({ type: CONFIRM_EMAIL, payload: res.data });
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
        signOut,
        forgotPassword,
        resetPassword,
        resendEmail,
        confirmEmail,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
