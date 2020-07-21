import { GET_PROFILE, ERROR_PROFILE } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload.data,
        error: null,
      };
    case ERROR_PROFILE:
      return {
        ...state,
        error: payload.error,
        profile: null,
      };
    default:
      return state;
  }
};
