import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import BookContext from '../../contexts/book/bookContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const BasicPagination = ({ total, limit }) => {
  const { getBooks } = useContext(BookContext);

  const count = Math.ceil(total / limit);
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    getBooks({ page: value, limit });
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        color='primary'
      />
    </div>
  );
};

export default BasicPagination;
