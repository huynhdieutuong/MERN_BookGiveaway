const jwt = require('jsonwebtoken');

module.exports = (user, statusCode, res, redirect = false) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  if (!redirect) {
    res.status(statusCode).cookie('token', token, options).json({
      success: true,
    });
  } else {
    res.status(statusCode).cookie('token', token, options).redirect('/profile');
  }
};
