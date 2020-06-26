const ErrorResponse = require('../utils/ErrorResponse');

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(error);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};
