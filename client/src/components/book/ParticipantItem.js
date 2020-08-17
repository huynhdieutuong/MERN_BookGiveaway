import React, { useContext } from 'react';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardActions,
  Avatar,
  IconButton,
  Button,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import ProfileContext from '../../contexts/profile/profileContext';
import BookContext from '../../contexts/book/bookContext';

const ParticipantItem = ({ request }) => {
  const classes = useStyles();
  const { profile } = useContext(ProfileContext);
  const { book } = useContext(BookContext);
  const { user, createAt } = request;

  const isOwnerBook = profile && profile._id === book.user._id;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src={user.avatarUrl} />}
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name}
        subheader={<Moment fromNow>{createAt}</Moment>}
      />
      {isOwnerBook && (
        <CardActions disableSpacing>
          <Button variant='contained' className={classes.button}>
            Choose
          </Button>
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
}));

export default ParticipantItem;
