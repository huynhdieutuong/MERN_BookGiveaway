const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

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
