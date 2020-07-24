import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Container } from '@material-ui/core';

import ProfileContext from '../../contexts/profile/profileContext';
import AuthContext from '../../contexts/auth/authContext';
import Spinner from '../../components/layout/Spinner';

const NotVerify = () => {
  const { profile } = useContext(ProfileContext);
  const { error, message, resendEmail } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleClickResend = async () => {
    setLoading(true);
    await resendEmail();
    setLoading(false);
  };

  if (!profile) return <Redirect to='/sign-in' />;

  if (profile.isActive) return <Redirect to='/profile' />;

  if (loading) return <Spinner />;

  return (
    <Container maxWidth='sm'>
      {error ? (
        <Alert severity='error'>{error}</Alert>
      ) : message ? (
        <Alert severity='success'>
          <AlertTitle>Email Sent</AlertTitle>
          {message}
        </Alert>
      ) : (
        <Alert severity='warning'>
          <AlertTitle>Account not activated!</AlertTitle>
          Your account has not been activated. Please check your email to
          activate your account.
          <br />
          <br />
          Not receiving activation email? Click to{' '}
          <strong style={{ cursor: 'pointer' }} onClick={handleClickResend}>
            resend email.
          </strong>
        </Alert>
      )}
    </Container>
  );
};

export default NotVerify;
