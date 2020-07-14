import { GET_BOOKS, GET_CATEGORIES } from '../types';

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
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload.data,
      };
    default:
      return state;
  }
};
