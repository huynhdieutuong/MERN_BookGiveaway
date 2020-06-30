const express = require('express');
const passport = require('passport');
const router = express.Router();

const profileController = require('../controllers/profile');

const passportJWT = passport.authenticate('jwt', { session: false });

// @route   GET  /api/profile
// @desc    Get profile user logged in
// @access  Private
router.get('/', passportJWT, profileController.getProfile);

module.exports = router;
