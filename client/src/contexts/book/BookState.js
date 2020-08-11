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
} from '../types';

const BookState = (props) => {
  const initialState = {
    loading: true,
    books: [],
    myBooks: [],
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
      await axios.post(`/api/books`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return true;
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
        error,
        category,
        getBooks,
        getCategories,
        setFilters,
        getBook,
        getCategory,
        getMyBooks,
        addBook,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
