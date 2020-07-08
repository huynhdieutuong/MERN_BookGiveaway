const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });

const requestsController = require('../controllers/requests');

const passportJWT = passport.authenticate('jwt', { session: false });

router.use(passportJWT);

// @route   POST  /api/books/:bookId/requests
// @desc    Create request (Enter giveaway)
// @access  Private
router.post('/', requestsController.createRequest);

module.exports = router;
