import { GET_NOTIFICATIONS, ERROR_NOTIFICATION } from '../types';

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
