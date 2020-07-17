import React, { useContext, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Typography } from '@material-ui/core';

import BookContext from '../../contexts/book/bookContext';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const CategoryTree = () => {
  const { categories, getCategories, setFilters, filters } = useContext(
    BookContext
  );
  const classes = useStyles();

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  if (categories.length === 0) return <Spinner />;

  const handleClick = (id) => {
    setFilters({
      ...filters,
      cat: id,
      page: 1,
    });
  };

  const buildTree = (parent) => {
    let results = [];

    const filtered = categories.filter((cat) => cat.parent === parent);

    filtered.forEach((cat) => {
      results.push(
        <TreeItem
          key={cat._id}
          nodeId={cat._id}
          label={cat.name}
          onClick={() => handleClick(cat._id)}
        >
          {buildTree(cat._id)}
        </TreeItem>
      );
    });

    return results;
  };

  return (
    <Fragment>
      <Typography variant='h6'>Categories</Typography>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {buildTree(null)}
      </TreeView>
    </Fragment>
  );
};

export default CategoryTree;
