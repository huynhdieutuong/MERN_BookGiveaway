const ErrorResponse = require('../utils/ErrorResponse');

module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ErrorResponse('Only admin can access this route', 403));
  }

  next();
};
