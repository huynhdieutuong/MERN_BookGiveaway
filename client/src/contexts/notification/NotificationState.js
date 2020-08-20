import React, { useReducer } from 'react';
import axios from 'axios';

import { GET_NOTIFICATIONS, ERROR_NOTIFICATION } from '../types';

import NotificationContext from './notificationContext';
import NotificationReducer from './notificationReducer';

const NotificationState = (props) => {
  const initialState = {
    notifications: [],
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(NotificationReducer, initialState);

  const { loading, notifications, error } = state;

  // Get notifications
  const getNotifications = async () => {
    try {
      const res = await axios.get('/api/notifications?limit=1000');

      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_NOTIFICATION,
        payload: error.response,
      });
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        error,
        loading,
        getNotifications,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationState;
