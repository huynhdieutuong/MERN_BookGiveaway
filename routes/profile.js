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

// @route   PUT  /api/profile/password
// @desc    Change password
// @access  Private
router.put('/password', profileController.changePassword);

// @route   PUT  /api/profile/email
// @desc    Change email
// @access  Private
router.put('/email', profileController.changeEmail);

// @route   PUT  /api/profile/avatar
// @desc    Change avatar
// @access  Private
router.put('/avatar', profileController.changeAvatar);

module.exports = router;
