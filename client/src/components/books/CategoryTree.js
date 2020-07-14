import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import BookContext from '../../contexts/book/bookContext';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles({
  root: {
    height: 800,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const CategoryTree = () => {
  const { categories, getCategories } = useContext(BookContext);
  const classes = useStyles();

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  if (categories.length === 0) return <Spinner />;

  const buildTree = (parent) => {
    let results = [];

    const filtered = categories.filter((cat) => cat.parent === parent);

    filtered.forEach((cat) => {
      results.push(
        <TreeItem key={cat._id} nodeId={cat._id} label={cat.name}>
          {buildTree(cat._id)}
        </TreeItem>
      );
    });

    return results;
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {buildTree(null)}
    </TreeView>
  );
};

export default CategoryTree;
