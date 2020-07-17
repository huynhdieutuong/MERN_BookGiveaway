import React, { useContext, useState } from 'react';
import Moment from 'react-moment';
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
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import BookContext from '../../contexts/book/bookContext';

const BookInfo = () => {
  const classes = useStyles();
  const { book } = useContext(BookContext);
  const { _id, title, author, description, user, createAt } = book;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      <CardContent>
        <Typography component='h2' variant='h2' className={classes.title}>
          {title}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          by {author}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<PresentToAllIcon />}
        >
          Enter Giveaway
        </Button>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon fontSize='large' />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon fontSize='large' />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography paragraph>
          {description.split('\n\n')[0]}{' '}
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
                {paragraph}
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
}));

export default BookInfo;
