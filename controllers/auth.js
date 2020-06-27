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
    html: `<p>Hi ${name}</p><p>You're on your way! Let's confirm your email address.</p><p>By clicking on the following link, you are confirming your email address and agreeing to BookGiveaway's Terms of Service.</p><p><a href='${tokenUrl}'>${tokenUrl}</a></p><p>The confirmation link is valid for ${process.env.TOKEN_EXPIRE} hours. If you exceed the deadline, you can request to resend the confirmation email</p>`,
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
