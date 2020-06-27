const crypto = require('crypto');

const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');
const sendTokenResponse = require('../utils/sendTokenResponse');
const sendEmail = require('../utils/sendEmail');

exports.register = asyncHandler(async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const user = await User.create({ name, username, email, password });

  const token = await user.getConfirmationToken();

  const tokenUrl = `${req.protocol}://${req.get('host')}/confirmation/${token}`;

  await sendEmail({
    email,
    subject: 'Welcome To BookGiveaway! Confirm Your Email',
    html: `<p>Hi ${name}</p><p>You're on your way! Let's confirm your email address.</p><p>By clicking on the following link, you are confirming your email address and agreeing to BookGiveaway's Terms of Service.</p><p><a href='${tokenUrl}'>${tokenUrl}</a></p>`,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: `Check ${email} to active your account`,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  sendTokenResponse(req.user, 200, res);
});

exports.getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

exports.confirmationEmail = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const confirmationToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // Check token
  const user = await User.findOne({
    confirmationToken,
    tokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Active account & remove confirmation token
  user.isActive = true;
  user.confirmationToken = undefined;
  user.tokenExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Your account has been activated',
  });
});

exports.resendEmail = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (user.isActive) {
    return next(new ErrorResponse('The account has been activated', 400));
  }

  const token = await user.getConfirmationToken();

  const tokenUrl = `${req.protocol}://${req.get('host')}/confirmation/${token}`;

  await sendEmail({
    email: user.email,
    subject: 'Confirm Your Email',
    html: `<p>Hi ${user.name}</p><p>You're on your way! Let's confirm your email address.</p><p>By clicking on the following link, you are confirming your email address and agreeing to BookGiveaway's Terms of Service.</p><p><a href='${tokenUrl}'>${tokenUrl}</a></p>`,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: `Check ${user.email} to active your account`,
  });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('Email does not exist', 400));
  }

  const token = await user.getConfirmationToken();

  const tokenUrl = `${req.protocol}://${req.get(
    'host'
  )}/reset-password/${token}`;

  await sendEmail({
    email: user.email,
    subject: 'Your BookGiveaway password reset request',
    html: `<p>Hi ${user.name}</p><p>A request has been received to change the password for your BookGiveaway account.</p><p>By clicking on the following link, you are resetting your password.</p><p><a href='${tokenUrl}'>${tokenUrl}</a></p><p>If you did not initiate this request, please contact us immediately at support@bookgiveaway.com.</p>`,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: `Check ${user.email} to reset your password`,
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const confirmationToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // Check token
  const user = await User.findOne({
    confirmationToken,
    tokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Reset password & remove confirmation token
  user.password = req.body.password;
  user.confirmationToken = undefined;
  user.tokenExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed',
  });
});
