const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Transaction = require('../models/Transaction');

exports.getTransactions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
