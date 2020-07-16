import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
} from '@material-ui/core';

const BookItem = ({ book }) => {
  const { slug, title, author, imageUrls, user, createAt } = book;
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user.avatarUrl} />}
        title={user.name}
        subheader={<Moment fromNow>{createAt}</Moment>}
      />
      <Link
        to={`/books/${slug}`}
        style={{ color: 'rgba(0, 0, 0, 0.87)', textDecoration: 'none' }}
      >
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
      </Link>
    </Card>
  );
};

export default BookItem;
