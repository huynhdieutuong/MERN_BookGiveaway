import React, { Fragment, useContext } from 'react';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Badge,
  Popover,
  Typography,
  Divider,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import { FixedSizeList } from 'react-window';

import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationContext from '../../contexts/notification/notificationContext';
import Spinner from './Spinner';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: '10px',
    display: 'flex',
  },
  markAllRead: {
    marginRight: '10px',
  },
  headActions: {
    color: '#1322da',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  listItem: {
    backgroundColor: '#ebebeb',
  },
}));

const Notifications = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { loading, notifications, getNotifications } = useContext(
    NotificationContext
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    getNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Fragment>
      <IconButton
        aria-label='show 17 new notifications'
        color='inherit'
        aria-describedby={id}
        onClick={handleClick}
      >
        <Badge badgeContent={17} color='secondary'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography className={classes.header}>
          <span style={{ flexGrow: '1' }}>Notifications</span>
          <span className={`${classes.headActions} ${classes.markAllRead}`}>
            Mark All as Read
          </span>
          <span className={classes.headActions}>Clear All</span>
        </Typography>
        <Divider />
        {loading ? (
          <Spinner />
        ) : (
          <FixedSizeList
            height={500}
            width={400}
            itemSize={100}
            itemCount={notifications.length}
            itemData={{ notifications, classes }}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </Popover>
    </Fragment>
  );
};

const renderRow = (props) => {
  const { data, index, style } = props;
  const notification = data.notifications[index];
  const classes = data.classes;

  return (
    <ListItem
      className={notification.isRead ? '' : classes.listItem}
      alignItems='flex-start'
      button
      style={style}
      key={index}
    >
      <ListItemAvatar>
        <Avatar
          alt={notification.guest.name}
          src={notification.guest.avatarUrl}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          notification.book.title.length > 60
            ? notification.book.title.slice(0, 60) + ' ...'
            : notification.book.title
        }
        secondary={
          <Fragment>
            <Typography
              component='span'
              variant='subtitle2'
              style={{ display: 'inline' }}
              color='textPrimary'
            >
              {notification.guest.name}
              {notification.type === 'request'
                ? ' entered giveaway'
                : notification.type === 'accept'
                ? ' accepted your request'
                : ' received your book'}
            </Typography>{' '}
            - <Moment fromNow>{notification.createAt}</Moment>
          </Fragment>
        }
      />
    </ListItem>
  );
};

export default Notifications;
