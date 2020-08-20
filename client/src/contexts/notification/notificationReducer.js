import {
  GET_NOTIFICATIONS,
  ERROR_NOTIFICATION,
  MARKREAD_NOTIFICATION,
  MARKALLREAD_NOTIFICATIONS,
  CLEARALL_NOTIFICATIONS,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload.data,
        error: null,
        loading: false,
      };
    case MARKREAD_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification._id === payload.data._id ? payload.data : notification
        ),
      };
    case MARKALLREAD_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload.data,
      };
    case CLEARALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    case ERROR_NOTIFICATION:
      return {
        ...state,
        notifications: [],
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
