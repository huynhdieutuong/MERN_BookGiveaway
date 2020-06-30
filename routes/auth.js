const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controllers/auth');

// Passport middlewares
const passportLogin = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('google', {
  session: false,
  scope: ['profile', 'email'],
});
const passportFacebook = passport.authenticate('facebook', {
  session: false,
});

// @route   POST  /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', authController.register);

// @route   POST  /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', passportLogin, authController.login);

// @route   GET  /api/auth/confirmation/:token
// @desc    Confirmation email
// @access  Public
router.get('/confirmation/:token', authController.confirmationEmail);

// @route   GET  /api/auth/resend
// @desc    Resend email to active account
// @access  Private
router.get('/resend', passportJWT, authController.resendEmail);

// @route   POST  /api/auth/forgot-password
// @desc    Forgot password
// @access  Public
router.post('/forgot-password', authController.forgotPassword);

// @route   PUT  /api/auth/reset-password
// @desc    Reset password
// @access  Public
router.put('/reset-password/:token', authController.resetPassword);

// @route   GET  /api/auth/google
// @route   GET  /api/auth/google/callback
// @desc    Login with google
// @access  Public
router.get('/google', passportGoogle);
router.get('/google/callback', passportGoogle, authController.socialOAuth);

// @route   GET  /api/auth/facebook
// @route   GET  /api/auth/facebook/callback
// @desc    Login with facebook
// @access  Public
router.get('/facebook', passportFacebook);
router.get('/facebook/callback', passportFacebook, authController.socialOAuth);

module.exports = router;
