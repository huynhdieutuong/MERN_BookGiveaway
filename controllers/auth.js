const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');
const sendTokenResponse = require('../utils/sendTokenResponse');

exports.register = asyncHandler(async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const user = await User.create({ name, username, email, password });

  sendTokenResponse(user, 200, res);
});
