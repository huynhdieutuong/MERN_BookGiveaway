import React, { useReducer } from 'react';
import axios from 'axios';

import { GET_PROFILE, ERROR_PROFILE } from '../types';

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

  // Get profile
  const getProfile = async () => {
    try {
      const res = await axios.get('/api/profile');

      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (error) {
      dispatch({
        type: ERROR_PROFILE,
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
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
