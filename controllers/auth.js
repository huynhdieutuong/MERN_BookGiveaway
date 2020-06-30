const crypto = require('crypto');
var generatePassword = require('password-generator');

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

  sendEmail({
    email,
    subject: 'Welcome To BookGiveaway! Confirm Your Email',
    html: `<p>Hi ${name},</p><p>You're on your way! Let's confirm your email address.</p><p>By clicking on the following link, you are confirming your email address and agreeing to BookGiveaway's Terms of Service.</p><p><a href='${tokenUrl}'>${tokenUrl}</a></p>`,
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

  sendEmail({
    email: user.email,
    subject: 'Confirm Your Email',
    html: `<p>Hi ${user.name},</p><p>You're on your way! Let's confirm your email address.</p><p>By clicking on the following link, you are confirming your email address and agreeing to BookGiveaway's Terms of Service.</p><p><a href='${tokenUrl}'>${tokenUrl}</a></p>`,
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

  sendEmail({
    email: user.email,
    subject: 'Your BookGiveaway password reset request',
    html: `<p>Hi ${user.name},</p><p>A request has been received to change the password for your BookGiveaway account.</p><p>By clicking on the following link, you are resetting your password.</p><p><a href='${tokenUrl}'>${tokenUrl}</a></p><p>If you did not initiate this request, please contact us immediately at support@bookgiveaway.com.</p>`,
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

exports.socialOAuth = asyncHandler(async (req, res, next) => {
  const { id, displayName, emails, photos, type } = req.user;

  let user;
  if (type === 'google') user = await User.findOne({ googleID: id });
  if (type === 'facebook') user = await User.findOne({ facebookID: id });

  // if not user
  if (!user) {
    const userByEmail = await User.findOne({ email: emails[0].value });

    // If not userByEmail, create new user
    if (!userByEmail) {
      const password = generatePassword(12, false, /\w/, 'B@2');

      user = new User({
        name: displayName,
        email: emails[0].value,
        avatarUrl: photos[0].value,
        isActive: true,
        password,
        username: id.slice(0, 5) + Date.now(),
      });

      if (type === 'google') user.googleID = id;
      if (type === 'facebook') user.facebookID = id;

      await user.save();

      // Send email include password for user
      sendEmail({
        email: user.email,
        subject: 'Welcome To BookGiveaway! Your Account Password',
        html: `<p>Hi ${user.name},</p><p>Welcome to BookGiveaway!</p><p>Your new account password: <strong>${password}</strong></p><p>You can change the password whenever you want in the profile.</p><p>Thanks!</p>`,
      });
    } else {
      // if userByEmail exist but not socialID, connect socialID
      user = userByEmail;
      if (type === 'google') user.googleID = id;
      if (type === 'facebook') user.facebookID = id;

      await user.save();
    }
  }

  sendTokenResponse(user, 200, res);
});
