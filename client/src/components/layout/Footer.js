import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  appbar: {
    color: '#2a2a2a',
    backgroundColor: '#8e9ae0',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title}>
            Book Giveaway ©2020 Created by Tuong Huynh
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
