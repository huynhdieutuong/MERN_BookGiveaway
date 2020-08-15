import {
  SET_LOADING,
  GET_BOOKS,
  GET_MY_BOOKS,
  GET_CATEGORIES,
  SET_FILTERS,
  GET_BOOK,
  ERROR_BOOK,
  GET_CATEGORY,
  DELETE_BOOK,
  ADD_BOOK,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        book: null,
        error: null,
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
    case GET_MY_BOOKS:
      return {
        ...state,
        loading: false,
        myBooks: payload.data,
      };
    case ADD_BOOK:
      return {
        ...state,
        myBooks: [payload.data, ...state.myBooks],
      };
    case DELETE_BOOK:
      return {
        ...state,
        myBooks: state.myBooks.filter((book) => book._id !== payload),
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
        requests: payload.requests,
        loading: false,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: payload.data,
      };
    case ERROR_BOOK:
      return {
        ...state,
        error: payload.error,
        loading: false,
        myBooks: [],
        books: [],
        book: {},
        requests: [],
      };
    default:
      return state;
  }
};
