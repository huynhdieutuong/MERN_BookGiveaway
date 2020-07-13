import React, { useReducer } from 'react';
import axios from 'axios';
import BookContext from './bookContext';
import BookReducer from './bookReducer';
import { GET_BOOKS } from '../types';

const BookState = (props) => {
  const initialState = {
    books: [],
    pagination: {},
  };

  const [state, dispatch] = useReducer(BookReducer, initialState);

  const { books, pagination } = state;

  // Get books
  const getBooks = async () => {
    const res = await axios.get('/api/books');

    dispatch({
      type: GET_BOOKS,
      payload: res.data,
    });
  };

  return (
    <BookContext.Provider
      value={{
        books,
        pagination,
        getBooks,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
