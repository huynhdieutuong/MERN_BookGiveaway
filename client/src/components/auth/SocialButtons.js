import React, { Fragment } from 'react';
import { Button, Grid, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FacebookIcon from '../../images/facebook-icon.svg';
import GoogleIcon from '../../images/google-icon.svg';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: 'white',
    width: '100%',
  },
  icon: {
    width: 20,
  },
  divider: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0',
  },
}));

const SocialButtons = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container spacing={2} className={classes.divider}>
        <Grid item xs={5}>
          <Divider />
        </Grid>
        <Grid item xs={2}>
          <Typography style={{ textAlign: 'center' }}>Or</Typography>
        </Grid>
        <Grid item xs={5}>
          <Divider />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant='contained'
            className={classes.button}
            startIcon={
              <img
                src={FacebookIcon}
                alt='facebook-icon'
                className={classes.icon}
              />
            }
            onClick={() => (window.location = '/api/auth/facebook')}
          >
            Facebook
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant='contained'
            className={classes.button}
            startIcon={
              <img
                src={GoogleIcon}
                alt='google-icon'
                className={classes.icon}
              />
            }
            onClick={() => (window.location = '/api/auth/google')}
          >
            Google
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SocialButtons;
