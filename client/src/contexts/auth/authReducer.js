import {
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNOUT_SUCCESS,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  RESEND_EMAIL,
  CONFIRM_EMAIL,
  AUTH_FAIL,
  RESET_STATE,
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
    case FORGOT_PASSWORD:
    case RESET_PASSWORD:
    case RESEND_EMAIL:
    case CONFIRM_EMAIL:
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
    case RESET_STATE:
      return {
        error: null,
        message: null,
      };
    default:
      return state;
  }
};
