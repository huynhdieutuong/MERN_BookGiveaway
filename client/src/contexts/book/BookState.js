import React, { useReducer } from 'react';
import axios from 'axios';
import BookContext from './bookContext';
import BookReducer from './bookReducer';
import { GET_BOOKS, GET_CATEGORIES } from '../types';

const BookState = (props) => {
  const initialState = {
    books: [],
    total: 0,
    limit: 10,
    categories: [],
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  const { books, total, limit, categories } = state;

  // Get books
  const getBooks = async (query) => {
    const { key, cat, user, sort, page, limit } = query;

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
        books,
        total,
        limit,
        categories,
        getBooks,
        getCategories,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
