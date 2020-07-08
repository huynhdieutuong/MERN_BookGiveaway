const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });

const requestsController = require('../controllers/requests');
const advancedResults = require('../middlewares/advancedResults');
const Request = require('../models/Request');

const passportJWT = passport.authenticate('jwt', { session: false });

// @route   GET  /api/requests
// @route   GET  /api/books/:bookId/requests
// @desc    Get requests (Enter giveaway)
// @access  Public
router.get(
  '/',
  advancedResults('requests', Request, {
    path: 'user',
    select: 'name username avatarUrl',
  }),
  requestsController.getRequests
);

router.use(passportJWT);

// @route   GET  /api/requests/my
// @desc    Get all my requests
// @access  Private
router.get(
  '/my',
  advancedResults('myRequests', Request, {
    path: 'book',
    select: 'imageUrls title slug',
  }),
  requestsController.getRequests
);

// @route   POST  /api/books/:bookId/requests
// @desc    Create request (Enter giveaway)
// @access  Private
router.post('/', requestsController.createRequest);

// @route   DELETE  /api/requests/:id
// @desc    Delete request
// @access  Private
router.delete('/:id', requestsController.deleteRequest);

module.exports = router;
