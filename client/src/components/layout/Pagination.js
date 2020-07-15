import React, { useContext } from 'react';
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

const BasicPagination = () => {
  const { totalPages, filters, setFilters } = useContext(BookContext);
  const classes = useStyles();

  const handleChange = (event, value) => {
    setFilters({
      ...filters,
      page: value,
    });
  };

  return (
    <div className={classes.root}>
      <Pagination count={totalPages} onChange={handleChange} color='primary' />
    </div>
  );
};

export default BasicPagination;
