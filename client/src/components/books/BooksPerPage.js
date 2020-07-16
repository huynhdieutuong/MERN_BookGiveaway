import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import BookContext from '../../contexts/book/bookContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: 120,
    },
  },
}));

const BooksPerPage = () => {
  const classes = useStyles();
  const { filters, setFilters } = useContext(BookContext);

  const handleChange = (event) => {
    setFilters({
      ...filters,
      limit: event.target.value,
      page: 1,
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        id='outlined-select-limit'
        select
        label='Books per page'
        value={filters.limit}
        onChange={handleChange}
        variant='outlined'
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </TextField>
    </form>
  );
};

export default BooksPerPage;
