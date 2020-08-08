import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  ERROR_PROFILE,
  UPDATE_FAIL,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload.data,
        loading: false,
        error: null,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        error: null,
      };
    case UPDATE_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    case ERROR_PROFILE:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    default:
      return state;
  }
};
