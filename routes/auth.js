const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controllers/auth');
const passportConf = require('../middlewares/passport');

// Passport middlewares
const passportLogin = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

// @route   POST  /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', authController.register);

// @route   POST  /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', passportLogin, authController.login);

// @route   GET  /api/auth/me
// @desc    Get logged in user
// @access  Private
router.get('/me', passportJWT, authController.getMe);

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

module.exports = router;
