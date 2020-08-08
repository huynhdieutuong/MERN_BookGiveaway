import React, { useReducer } from 'react';
import axios from 'axios';

import {
  GET_PROFILE,
  UPDATE_PROFILE,
  ERROR_PROFILE,
  UPDATE_FAIL,
} from '../types';

import ProfileContext from './profileContext';
import ProfileReducer from './profileReducer';

const ProfileState = (props) => {
  const initialState = {
    loading: true,
    profile: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  const { loading, profile, error } = state;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Get profile
  const getProfile = async () => {
    try {
      const res = await axios.get('/api/profile');

      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
      dispatch({
        type: ERROR_PROFILE,
        payload: error.response.statusText,
      });
    }
  };

  // Update profile
  const updateProfile = async (formData) => {
    try {
      const res = await axios.put('/api/profile', formData, config);

      dispatch({ type: UPDATE_PROFILE, payload: res.data });
      return true;
    } catch (error) {
      dispatch({
        type: UPDATE_FAIL,
        payload: error.response.data,
      });
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        loading,
        profile,
        error,
        getProfile,
        updateProfile,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
