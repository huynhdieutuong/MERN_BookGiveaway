import React, { useState, Fragment, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Hidden,
  Link as NormalLink,
  Button,
  Divider,
  Avatar,
} from '@material-ui/core';

import SearchBook from '../books/SearchBook';
import Drawer from './Drawer';

import ProfileContext from '../../contexts/profile/profileContext';
import AuthContext from '../../contexts/auth/authContext';
import Notifications from './Notifications';

const Navbar = () => {
  const history = useHistory();
  const { profile } = useContext(ProfileContext);
  const { signOut, resetState } = useContext(AuthContext);

  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isOpen, toggleDrawer] = useState(false);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMobileMenuClose(null);
          history.push('/profile');
        }}
      >
        <IconButton aria-label='account of current user' color='inherit'>
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={() => handleMobileMenuClose(null)}>
        <Notifications label='Notifications' />
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMobileMenuClose(null);
          history.push('/messages');
        }}
      >
        <IconButton aria-label='show 2 new mails' color='inherit'>
          <Badge badgeContent={2} color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          handleMobileMenuClose(null);
          signOut();
        }}
      >
        <IconButton color='inherit'>
          <MeetingRoomIcon />
        </IconButton>
        <p>Sign out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon onClick={() => toggleDrawer(true)} />
            <Hidden mdUp>
              <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
            </Hidden>
          </IconButton>
          <NormalLink
            href='/'
            className={classes.title}
            style={{ textDecoration: 'none' }}
          >
            <Typography variant='h6'>Book Giveaway</Typography>
          </NormalLink>

          {/* Search Book */}
          <SearchBook />

          <div className={classes.grow} />

          {!profile ? (
            <Button color='inherit'>
              <Link
                to='/sign-in'
                onClick={resetState}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Sign In
              </Link>
            </Button>
          ) : (
            <Fragment>
              <div className={classes.sectionDesktop}>
                <IconButton
                  aria-label='account of current user'
                  color='inherit'
                  onClick={() => history.push('/profile')}
                >
                  <Avatar
                    alt={profile.name}
                    src={profile.avatarUrl}
                    className={classes.avatar}
                  />
                </IconButton>
                <Notifications />
                <IconButton
                  color='inherit'
                  onClick={() => history.push('/messages')}
                >
                  <Badge badgeContent={2} color='secondary'>
                    <MailIcon />
                  </Badge>
                </IconButton>
                <Divider
                  orientation='vertical'
                  flexItem
                  style={{ margin: '0 10px' }}
                />
                <IconButton color='inherit' onClick={() => signOut()}>
                  <MeetingRoomIcon />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: 'white',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default Navbar;
