import { GET_BOOKS } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BOOKS:
      return {
        ...state,
        books: payload.data,
        total: payload.total,
        limit: payload.limit,
      };
    default:
      return state;
  }
};
