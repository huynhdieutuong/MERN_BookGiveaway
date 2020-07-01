const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');
const form = formidable();

const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

exports.getProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { name, username } = req.body;

  user.name = name;
  user.username = username;

  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('password');

  const { currentPassword, password } = req.body;

  if (!currentPassword || !password)
    return next(
      new ErrorResponse('Current password & new password is required', 400)
    );

  // Check current password
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) return next(new ErrorResponse('Wrong current password', 400));

  // Change password
  user.password = password;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed',
  });
});

exports.changeEmail = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('name password');

  const { currentPassword, email } = req.body;

  if (!currentPassword || !email)
    return next(new ErrorResponse('Current password & email is required', 400));

  // Check current password
  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) return next(new ErrorResponse('Wrong current password', 400));

  // Change email
  user.email = email;
  user.isActive = false;
  const token = await user.getConfirmationToken();
  const tokenUrl = `${req.protocol}://${req.get('host')}/confirmation/${token}`;

  await user.save();

  // Send email to confim new email
  sendEmail({
    email,
    subject: 'Confirm Your Email',
    html: `<p>Hi ${user.name},</p><p>Your email has been changed! Let's confirm your new email address.</p><p>By clicking on the following link, you are confirming your email address and agreeing to BookGiveaway's Terms of Service.</p><p><a href='${tokenUrl}'>${tokenUrl}</a></p>`,
  });

  res.status(200).json({
    success: true,
    message: 'Email changed. Please check your mail to confirm new email.',
  });
});

exports.changeAvatar = asyncHandler(async (req, res, next) => {
  const user = req.user;

  form.parse(req, async (err, fields, files) => {
    let { size, path, name, type } = files.avatar;

    // Make sure the file is a photo
    if (!type.startsWith('image'))
      return next(new ErrorResponse('Please upload an image file', 400));

    // Check image size
    if (size > process.env.MAX_SIZE * 1024 * 1024)
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_SIZE} MB`,
          400
        )
      );

    // Create custom filename
    name = `avatar_${user._id}_${Date.now()}`;

    // Upload cloudinary
    result = await cloudinary.uploader.upload(path, {
      public_id: 'BookGiveaway/Avatars/' + name,
    });

    user.avatarUrl = result.url;
    await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  });
});
