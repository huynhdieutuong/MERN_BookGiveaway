import React, { Fragment, useContext, useRef, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProfileContext from '../../contexts/profile/profileContext';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    cursor: 'pointer',
  },
}));

const ChangeAvatar = () => {
  const classes = useStyles();
  const fileInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const { profile, changeAvatar } = useContext(ProfileContext);

  const onUpload = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);

    await changeAvatar(formData);
    setLoading(false);
  };

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <input
        className={classes.input}
        type='file'
        ref={fileInput}
        onChange={onUpload}
      />
      <Avatar
        title='Change Profile Photo'
        alt={profile.name}
        src={profile.avatarUrl}
        className={classes.large}
        onClick={() => fileInput.current.click()}
      />
    </Fragment>
  );
};

export default ChangeAvatar;
