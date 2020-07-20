import { SIGNIN_SUCCESS, SIGNIN_FAIL } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};
