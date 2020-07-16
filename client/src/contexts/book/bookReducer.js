import {
  SET_LOADING,
  GET_BOOKS,
  GET_CATEGORIES,
  SET_FILTERS,
  GET_BOOK,
  ERROR_BOOK,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
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
    case GET_BOOK:
      return {
        ...state,
        book: payload.data,
        loading: false,
      };
    case ERROR_BOOK:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    default:
      return state;
  }
};
