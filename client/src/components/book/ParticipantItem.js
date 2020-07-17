import React from 'react';
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

const ParticipantItem = ({ request }) => {
  const classes = useStyles();
  const { user, createAt } = request;

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
      {/* <CardActions disableSpacing>
        <Button variant='contained' className={classes.button}>
          Choose
        </Button>
      </CardActions> */}
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
