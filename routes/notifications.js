const express = require('express');
const passport = require('passport');
const router = express.Router();

const notificationsController = require('../controllers/notifications');
const advancedResults = require('../middlewares/advancedResults');
const Notification = require('../models/Notification');

const passportJWT = passport.authenticate('jwt', { session: false });

router.use(passportJWT);

// @route   GET api/notifications
// @desc    Get all user's notifications
// @access  Private
router.get(
  '/',
  advancedResults('notifications', Notification, {
    path: 'guest book',
    select: 'name avatarUrl title imageUrls slug',
  }),
  notificationsController.getNotifications
);

// @route   PUT api/notifications/:id
// @desc    Mark as Read & Unread
// @access  Private
router.put('/:id', notificationsController.markRead);

// @route   PUT api/notifications
// @desc    Mark All as Read
// @access  Private
router.put(
  '/',
  advancedResults('markAllRead', Notification, {
    path: 'guest book',
    select: 'name avatarUrl title imageUrls slug',
  }),
  notificationsController.markAllRead
);

// @route   DELETE api/notifications/:id
// @desc    Clear notification
// @access  Private
router.delete('/:id', notificationsController.clearNotification);

// @route   DELETE api/notifications
// @desc    Clear all notifications
// @access  Private
router.delete('/', notificationsController.clearAll);

module.exports = router;
