import React, { useContext, useState } from 'react';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardActions,
  Avatar,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import ProfileContext from '../../contexts/profile/profileContext';
import BookContext from '../../contexts/book/bookContext';
import DeleteButton from '../table/DeleteButton';

const ParticipantItem = ({ request }) => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { profile } = useContext(ProfileContext);
  const { book, deleteRequest, createTransaction } = useContext(BookContext);
  const { user, createAt } = request;

  const isOwnerBook = profile && profile._id === book.user._id;
  const isOwnerRequest = profile && profile._id === request.user._id;

  const chooseReceiver = async () => {
    setLoading(true);
    const transactionId = await createTransaction(request._id);
    setLoading(false);
    history.push(`/transactions/${transactionId}`);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src={user.avatarUrl} />}
        action={
          isOwnerRequest ? (
            <DeleteButton onDelete={() => deleteRequest(request._id)} />
          ) : null
        }
        title={user.name}
        subheader={<Moment fromNow>{createAt}</Moment>}
      />
      {isOwnerBook && (
        <CardActions disableSpacing>
          <div className={classes.wrapper}>
            <Button
              variant='contained'
              className={classes.button}
              onClick={chooseReceiver}
              disabled={loading}
            >
              Choose
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </CardActions>
      )}
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    width: '100%',
  },
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default ParticipantItem;
