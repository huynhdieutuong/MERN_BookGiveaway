import { GET_BOOKS, GET_CATEGORIES, SET_FILTERS } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FILTERS:
      return {
        ...state,
        filters: payload,
      };
    case GET_BOOKS:
      return {
        ...state,
        loading: false,
        books: payload.data,
        totalPages: payload.totalPages,
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
