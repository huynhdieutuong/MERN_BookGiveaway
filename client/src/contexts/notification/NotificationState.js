import React, { useReducer } from 'react';
import axios from 'axios';

import {
  GET_NOTIFICATIONS,
  ERROR_NOTIFICATION,
  MARKREAD_NOTIFICATION,
  MARKALLREAD_NOTIFICATIONS,
  CLEARALL_NOTIFICATIONS,
} from '../types';

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

  // Mark as read notification
  const markRead = async (notification) => {
    try {
      if (!notification.isRead) {
        const res = await axios.put(`/api/notifications/${notification._id}`);

        dispatch({
          type: MARKREAD_NOTIFICATION,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ERROR_NOTIFICATION,
        payload: error.response,
      });
    }
  };

  // Mark as all read notifications
  const markAllRead = async () => {
    try {
      const res = await axios.put('/api/notifications?limit=1000');

      dispatch({
        type: MARKALLREAD_NOTIFICATIONS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_NOTIFICATION,
        payload: error.response,
      });
    }
  };

  // Clear all notifications
  const clearAll = async () => {
    try {
      await axios.delete('/api/notifications');

      dispatch({
        type: CLEARALL_NOTIFICATIONS,
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
        markRead,
        markAllRead,
        clearAll,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationState;
