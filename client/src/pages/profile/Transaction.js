import React, { useContext, useEffect } from 'react';
import Moment from 'react-moment';

import BookContext from '../../contexts/book/bookContext';
import NotFound from '../../components/layout/NotFound';
import Spinner from '../../components/layout/Spinner';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  Button,
  Avatar,
  Chip,
} from '@material-ui/core';
import ProfileContext from '../../contexts/profile/profileContext';

const Transaction = ({ match }) => {
  const id = match.params.id;
  const { profile } = useContext(ProfileContext);
  const {
    loading,
    error,
    transaction,
    getTransaction,
    changeTransactionStatus,
  } = useContext(BookContext);

  useEffect(() => {
    getTransaction(id);
    // eslint-disable-next-line
  }, []);

  if (loading || !transaction) return <Spinner />;

  if (error) return <NotFound />;

  const { _id, book, giver, receiver, status, createAt } = transaction;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4}>
        <img style={{ width: '100%' }} src={book.imageUrls[0]} alt='cover' />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5'>Transaction: {_id}</Typography>
            <Typography variant='subtitle1' gutterBottom>
              Create At:{' '}
              <Moment format='h:mm:ss a, DD/MM/YYYY'>{createAt}</Moment>
            </Typography>
            <Typography variant='h6' gutterBottom>
              Book: {book.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant='h6' gutterBottom>
              Giver
            </Typography>
            <Card>
              <CardHeader
                avatar={<Avatar src={giver.avatarUrl} />}
                title={giver.name}
                subheader={<Button>Contact</Button>}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant='h6' gutterBottom>
              Receiver
            </Typography>
            <Card>
              <CardHeader
                avatar={<Avatar src={receiver.avatarUrl} />}
                title={receiver.name}
                subheader={<Button>Contact</Button>}
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              Status:{' '}
              <Chip
                label={status}
                color={
                  status === 'success'
                    ? 'primary'
                    : status === 'fail'
                    ? 'secondary'
                    : ''
                }
              />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {status === 'pending' && profile && profile._id === giver._id && (
              <Button
                variant='contained'
                color='secondary'
                onClick={() => changeTransactionStatus(_id, 'fail')}
              >
                Cancel Transaction
              </Button>
            )}
            {status === 'pending' && profile && profile._id === receiver._id && (
              <Button
                variant='contained'
                color='primary'
                onClick={() => changeTransactionStatus(_id, 'success')}
              >
                Mark as Received Book
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Transaction;
