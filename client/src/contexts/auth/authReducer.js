import {
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNOUT_SUCCESS,
  AUTH_FAIL,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNIN_SUCCESS:
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: null,
        message: payload.message,
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: payload.error,
        message: null,
      };
    default:
      return state;
  }
};
