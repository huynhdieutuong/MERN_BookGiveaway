import React, { useContext, useState } from 'react';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
  Collapse,
  CircularProgress,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import parse from 'html-react-parser';

import BookContext from '../../contexts/book/bookContext';
import ProfileContext from '../../contexts/profile/profileContext';
import ActionButton from './ActionButton';

const BookInfo = () => {
  const classes = useStyles();
  const history = useHistory();
  const { book, requests, createRequest } = useContext(BookContext);
  const { profile } = useContext(ProfileContext);
  const { _id, title, author, description, user, createAt } = book;
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  let isEnterGiveaway = false;
  if (profile) {
    requests.forEach((request) => {
      if (request.user._id === profile._id) isEnterGiveaway = true;
    });
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const enterGiveaway = async () => {
    if (!profile) return history.push('/sign-in');

    setLoading(true);
    await createRequest(_id);
    setLoading(false);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src={user.avatarUrl} />}
        action={
          profile && profile._id === book.user._id ? (
            <ActionButton id={_id} />
          ) : null
        }
        title={user.name}
        subheader={<Moment fromNow>{createAt}</Moment>}
      />
      <CardContent>
        <Typography component='h2' variant='h2' className={classes.title}>
          {title}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          by {author}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className={classes.wrapper}>
          <Button
            variant='contained'
            color='secondary'
            className={classes.button}
            startIcon={<PresentToAllIcon />}
            disabled={
              (profile && profile._id === book.user._id) ||
              isEnterGiveaway ||
              book.isGave ||
              loading
            }
            onClick={enterGiveaway}
          >
            Enter Giveaway
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon fontSize='large' />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon fontSize='large' />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography paragraph>
          {parse(description.split('\n\n')[0])}{' '}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            title='Show More'
          >
            <ExpandMoreIcon />
          </IconButton>
        </Typography>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          {description
            .split('\n\n')
            .slice(1)
            .map((paragraph, index) => (
              <Typography key={index} paragraph>
                {parse(paragraph)}
              </Typography>
            ))}
        </Collapse>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    borderRadius: 'none',
  },
  title: {
    fontSize: '28px',
    fontWeight: '400',
  },
  button: {
    width: '100%',
    marginRight: '10px',
    height: 40,
  },
  avatar: {
    backgroundColor: red[500],
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    padding: '8px',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    padding: '8px',
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

export default BookInfo;
