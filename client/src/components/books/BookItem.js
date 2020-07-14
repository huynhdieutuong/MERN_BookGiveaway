import React from 'react';
import Moment from 'react-moment';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
} from '@material-ui/core';

const BookItem = ({ book }) => {
  const { title, author, imageUrls, user, createAt } = book;
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user.avatarUrl} />}
        title={user.name}
        subheader={<Moment fromNow>{createAt}</Moment>}
      />
      <CardMedia style={{ height: '300px' }} image={imageUrls[0]} />
      <CardContent>
        <Typography
          gutterBottom
          variant='h5'
          component='h2'
          style={{ fontSize: '14px' }}
          title={title}
        >
          {title.length > 50 ? title.slice(0, 50) + '...' : title}
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'
          style={{ fontSize: '12px' }}
        >
          {author}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookItem;
