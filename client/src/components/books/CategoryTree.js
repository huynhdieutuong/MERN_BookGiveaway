import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
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
  name: {
    color: 'rgba(0, 0, 0, 0.87)',
    textDecoration: 'none',
  },
});

const CategoryTree = () => {
  const classes = useStyles();

  const {
    categories,
    getCategories,
    setFilters,
    filters,
    category,
  } = useContext(BookContext);

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
        <Link
          to={`/${cat.slug}/${cat._id}`}
          key={cat._id}
          className={classes.name}
        >
          <TreeItem
            nodeId={cat._id}
            label={cat.name}
            onClick={() => handleClick(cat._id)}
          >
            {buildTree(cat._id)}
          </TreeItem>
        </Link>
      );
    });

    return results;
  };

  return (
    <Fragment>
      <Typography variant='h6'>Categories</Typography>
      <TreeView
        defaultSelected={category._id}
        defaultExpanded={
          category.ancestors &&
          category.ancestors.map((ancestor) => ancestor._id)
        }
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
