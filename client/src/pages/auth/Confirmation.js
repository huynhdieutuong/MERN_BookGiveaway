import React, { useEffect, useContext, useState } from 'react';
import { Container } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import AuthContext from '../../contexts/auth/authContext';
import Spinner from '../../components/layout/Spinner';

const Confirmation = ({ match }) => {
  const { error, message, confirmEmail } = useContext(AuthContext);
  const { token } = match.params;
  const [loading, setLoading] = useState(true);

  const handleConfirm = async () => {
    await confirmEmail(token);
    setLoading(false);
  };

  useEffect(() => {
    handleConfirm();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <Container maxWidth='sm'>
      {error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <Alert severity='success'>
          <AlertTitle>Successful activation</AlertTitle>
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default Confirmation;
