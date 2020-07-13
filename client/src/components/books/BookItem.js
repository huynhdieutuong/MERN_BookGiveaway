import React from 'react';
import Moment from 'react-moment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
  IconButton,
} from '@material-ui/core';

const BookItem = ({ book }) => {
  const { title, imageUrls, user, createAt } = book;
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user.avatarUrl} />}
        title={user.name}
        subheader={<Moment fromNow>{createAt}</Moment>}
      />
      <CardMedia
        style={{ height: '300px' }}
        image={imageUrls[0]}
        title={title}
      />
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <IconButton aria-label='show more'>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookItem;
