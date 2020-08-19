import React, { useReducer } from 'react';
import axios from 'axios';
import BookContext from './bookContext';
import BookReducer from './bookReducer';
import {
  SET_LOADING,
  GET_BOOKS,
  GET_MY_BOOKS,
  GET_CATEGORIES,
  SET_FILTERS,
  GET_BOOK,
  ERROR_BOOK,
  GET_CATEGORY,
  ADD_BOOK,
  DELETE_BOOK,
  EDIT_BOOK,
  CREATE_REQUEST,
  DELETE_REQUEST,
  GET_MY_REQUESTS,
  CREATE_TRANSACTION,
  GET_MY_TRANSACTIONS,
  GET_TRANSACTION,
  CHANGE_TRANSACTION_STATUS,
} from '../types';

const BookState = (props) => {
  const initialState = {
    loading: true,
    books: [],
    myBooks: null,
    totalPages: 0,
    categories: [],
    filters: {
      page: 1,
      limit: 20,
      cat: null,
      key: null,
      sort: '-createAt',
    },
    book: null,
    requests: [],
    myRequests: null,
    myTransactions: null,
    transaction: null,
    error: null,
    category: {},
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  const {
    loading,
    books,
    myBooks,
    totalPages,
    categories,
    filters,
    book,
    requests,
    myRequests,
    myTransactions,
    transaction,
    error,
    category,
  } = state;

  // Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Set filters
  const setFilters = (filters) => {
    dispatch({
      type: SET_FILTERS,
      payload: filters,
    });
  };

  // Get my books
  const getMyBooks = async () => {
    setLoading();

    try {
      const res = await axios.get('/api/books/my');

      dispatch({
        type: GET_MY_BOOKS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response,
      });
    }
  };

  // Get books
  const getBooks = async (catId) => {
    setLoading();

    const { key, sort, page, limit } = filters;

    let queryString = `/api/books?page=${page}`;
    if (key) queryString = queryString + `&key=${key}`;
    // if (cat) queryString = queryString + `&cat=${cat}`;
    if (catId) queryString = queryString + `&cat=${catId}`;
    if (sort) queryString = queryString + `&sort=${sort}`;
    if (limit) queryString = queryString + `&limit=${limit}`;

    try {
      const res = await axios.get(queryString);

      dispatch({
        type: GET_BOOKS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response.data,
      });
    }
  };

  // Get categories
  const getCategories = async () => {
    const res = await axios.get('/api/categories');

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  };

  // Get book
  const getBook = async (id) => {
    setLoading();

    try {
      const res = await axios.get(`/api/books/${id}`);

      dispatch({
        type: GET_BOOK,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response.data,
      });
    }
  };

  // Get category
  const getCategory = async (slug) => {
    try {
      const res = await axios.get(`/api/categories/${slug}`);

      dispatch({
        type: GET_CATEGORY,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response.data,
      });
    }
  };

  // Add book
  const addBook = async (formData) => {
    try {
      const res = await axios.post(`/api/books`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      dispatch({
        type: ADD_BOOK,
        payload: res.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response.data,
      });
    }
  };

  // Delete book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);

      dispatch({
        type: DELETE_BOOK,
        payload: id,
      });

      return true;
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response.data,
      });
    }
  };

  // Edit book
  const editBook = async (id, formData) => {
    try {
      const res = await axios.put(`/api/books/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      dispatch({
        type: EDIT_BOOK,
        payload: res.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response.data,
      });
    }
  };

  // Create request (Enter giveaway)
  const createRequest = async (id) => {
    try {
      const res = await axios.post(`/api/books/${id}/requests`);

      dispatch({
        type: CREATE_REQUEST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response.data,
      });
    }
  };

  // Delete request
  const deleteRequest = async (id) => {
    try {
      await axios.delete(`/api/requests/${id}`);

      dispatch({
        type: DELETE_REQUEST,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response.data,
      });
    }
  };

  // Get my requests
  const getMyRequests = async () => {
    setLoading();

    try {
      const res = await axios.get('/api/requests/my?limit=1000');

      dispatch({
        type: GET_MY_REQUESTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response,
      });
    }
  };

  // Create transaction (Choose receiver)
  const createTransaction = async (requestId) => {
    try {
      const res = await axios.post(
        `/api/transactions`,
        { requestId },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      dispatch({
        type: CREATE_TRANSACTION,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response.data,
      });
    }
  };

  // Get my transactions
  const getMyTransactions = async () => {
    setLoading();

    try {
      const res = await axios.get('/api/transactions?limit=1000');

      dispatch({
        type: GET_MY_TRANSACTIONS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response,
      });
    }
  };

  // Get transaction
  const getTransaction = async (id) => {
    setLoading();

    try {
      const res = await axios.get(`/api/transactions/${id}`);

      dispatch({
        type: GET_TRANSACTION,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response.data,
      });
    }
  };

  // Change transaction status
  const changeTransactionStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `/api/transactions/${id}`,
        { status },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      dispatch({
        type: CHANGE_TRANSACTION_STATUS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_BOOK,
        payload: error.response.data,
      });
    }
  };

  return (
    <BookContext.Provider
      value={{
        loading,
        myBooks,
        books,
        totalPages,
        filters,
        categories,
        book,
        requests,
        myRequests,
        myTransactions,
        transaction,
        error,
        category,
        getBooks,
        getCategories,
        setFilters,
        getBook,
        getCategory,
        getMyBooks,
        addBook,
        deleteBook,
        editBook,
        createRequest,
        deleteRequest,
        getMyRequests,
        createTransaction,
        getMyTransactions,
        getTransaction,
        changeTransactionStatus,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
