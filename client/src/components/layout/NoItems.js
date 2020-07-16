import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
    width: '100%',
  },
}));

const NoItems = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FileCopyIcon
        style={{ fontSize: '80px', opacity: '0.5', marginBottom: '20px' }}
      />
      <Typography variant='h5'>No matching items found.</Typography>
      <Typography variant='subtitle1' color='textSecondary'>
        Check the filter settings
      </Typography>
    </div>
  );
};

export default NoItems;
