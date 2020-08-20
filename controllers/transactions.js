const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Transaction = require('../models/Transaction');
const Request = require('../models/Request');
const Notification = require('../models/Notification');
const Book = require('../models/Book');

exports.getTransactions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id).populate({
    path: 'book giver receiver',
    select: 'name avatarUrl title imageUrls slug',
  });

  if (!transaction)
    return next(new ErrorResponse('Transaction not found', 404));

  res.status(200).json({
    success: true,
    data: transaction,
  });
});

exports.createTransaction = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.body.requestId).populate('book');

  if (!request) return next(new ErrorResponse('Request not found', 404));

  // Make sure user is book user
  if (request.book.user.toString() !== req.user.id)
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to create transaction for this request`,
        400
      )
    );

  // Create transaction
  const transaction = await Transaction.create({
    book: request.book.id,
    giver: request.book.user,
    receiver: request.user,
  });

  // Create notification for receiver
  await Notification.create({
    owner: request.user,
    guest: request.book.user,
    book: request.book.id,
    type: 'accept',
  });

  // Change isGave of this book to true
  await Book.findByIdAndUpdate(request.book.id, { isGave: true });

  // Delete all requests of this book
  await Request.deleteMany({ book: request.book.id });

  res.status(200).json({
    success: true,
    data: transaction,
  });
});

exports.changeStatus = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id).populate({
    path: 'book giver receiver',
    select: 'name avatarUrl title imageUrls slug',
  });

  if (!transaction)
    return next(new ErrorResponse('Transaction not found', 404));

  // Only receiver and giver can change transaction status
  if (
    req.user.id !== transaction.receiver.id &&
    req.user.id !== transaction.giver.id
  )
    return next(
      new ErrorResponse(
        'Only receiver and giver can change transaction status',
        400
      )
    );

  // Prevent receiver re-change status
  if (transaction.status !== 'pending')
    return next(new ErrorResponse('Can not re-change status', 400));

  // Change status
  transaction.status = req.body.status;
  await transaction.save();

  // Change book status if giver cancel transaction
  if (req.body.status === 'fail') {
    await Book.findByIdAndUpdate(transaction.book.id, { isGave: false });
  }

  res.status(200).json({
    success: true,
    data: transaction,
  });
});
