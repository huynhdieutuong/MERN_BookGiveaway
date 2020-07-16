import React, { useReducer } from 'react';
import axios from 'axios';
import BookContext from './bookContext';
import BookReducer from './bookReducer';
import { GET_BOOKS, GET_CATEGORIES, SET_FILTERS } from '../types';

const BookState = (props) => {
  const initialState = {
    loading: true,
    books: [],
    totalPages: 0,
    categories: [],
    filters: {
      page: 1,
      limit: 20,
      cat: null,
      key: null,
      user: null,
      sort: '-createAt',
    },
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  const { loading, books, totalPages, categories, filters } = state;

  // Set filters
  const setFilters = (filters) => {
    dispatch({
      type: SET_FILTERS,
      payload: filters,
    });
  };

  // Get books
  const getBooks = async () => {
    const { key, cat, user, sort, page, limit } = filters;

    let queryString = `/api/books?page=${page}`;
    if (key) queryString = queryString + `&key=${key}`;
    if (cat) queryString = queryString + `&cat=${cat}`;
    if (user) queryString = queryString + `&user=${user}`;
    if (sort) queryString = queryString + `&sort=${sort}`;
    if (limit) queryString = queryString + `&limit=${limit}`;

    const res = await axios.get(queryString);

    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    });
  };

  // Get categories
  const getCategories = async () => {
    const res = await axios.get('/api/categories');

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  };

  return (
    <BookContext.Provider
      value={{
        loading,
        books,
        totalPages,
        filters,
        categories,
        getBooks,
        getCategories,
        setFilters,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
