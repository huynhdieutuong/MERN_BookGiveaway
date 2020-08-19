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
  EDIT_BOOK,
  CREATE_REQUEST,
  DELETE_REQUEST,
  GET_MY_REQUESTS,
  CREATE_TRANSACTION,
  GET_MY_TRANSACTIONS,
  GET_TRANSACTION,
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
    case EDIT_BOOK:
      return {
        ...state,
        myBooks: state.myBooks.map((book) =>
          book._id !== payload.data._id ? book : payload.data
        ),
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
    case CREATE_REQUEST:
      return {
        ...state,
        requests: [payload.data, ...state.requests],
      };
    case DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter((request) => request._id !== payload),
        myRequests: state.myRequests.filter(
          (request) => request._id !== payload
        ),
      };
    case GET_MY_REQUESTS:
      return {
        ...state,
        loading: false,
        myRequests: payload.data,
      };
    case CREATE_TRANSACTION:
      console.log(payload.data);
      return {
        ...state,
      };
    case GET_MY_TRANSACTIONS:
      return {
        ...state,
        loading: false,
        myTransactions: payload.data,
      };
    case GET_TRANSACTION:
      return {
        ...state,
        loading: false,
        transaction: payload.data,
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
