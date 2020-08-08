import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Avatar, Typography, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

import ProfileContext from '../../contexts/profile/profileContext';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Info = () => {
  const classes = useStyles();
  const history = useHistory();
  const { profile } = useContext(ProfileContext);

  const { name, email, username, avatarUrl, googleID, facebookID } = profile;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={2}>
        <Avatar alt={name} src={avatarUrl} className={classes.large} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Typography variant='h4'>{name}</Typography>
            <Typography variant='subtitle1'>{email}</Typography>
            <Typography variant='subtitle1'>Username: {username}</Typography>
          </Grid>
          <Divider orientation='vertical' flexItem />
          <Grid item xs={12} md={5}>
            <Typography variant='subtitle1'>Google ID: {googleID}</Typography>
            <Typography variant='subtitle1'>
              Facebook ID: {facebookID}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          style={{ marginTop: '10px', marginBottom: '20px' }}
          variant='contained'
          startIcon={<EditIcon />}
          onClick={() => history.push('/edit-profile')}
        >
          Edit Profile
        </Button>
      </Grid>
    </Grid>
  );
};

export default Info;
