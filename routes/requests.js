const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });

const requestsController = require('../controllers/requests');
const advancedResults = require('../middlewares/advancedResults');
const Request = require('../models/Request');

const passportJWT = passport.authenticate('jwt', { session: false });

router.use(passportJWT);

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

// @route   POST  /api/books/:bookId/requests
// @desc    Create request (Enter giveaway)
// @access  Private
router.post('/', requestsController.createRequest);

module.exports = router;
