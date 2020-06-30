const express = require('express');
const passport = require('passport');
const router = express.Router();

const profileController = require('../controllers/profile');

const passportJWT = passport.authenticate('jwt', { session: false });

router.use(passportJWT);

// @route   GET  /api/profile
// @desc    Get profile user logged in
// @access  Private
router.get('/', profileController.getProfile);

// @route   PUT  /api/profile
// @desc    Update profile
// @access  Private
router.put('/', profileController.updateProfile);

module.exports = router;
