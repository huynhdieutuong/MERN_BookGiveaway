const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Book = require('../models/Book');
const Request = require('../models/Request');
const Notification = require('../models/Notification');

exports.getRequests = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.createRequest = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.bookId);

  if (!book) return next(new ErrorResponse('Book not found', 404));

  if (book.user.toString() === req.user.id)
    return next(new ErrorResponse('Owner cannot enter giveaway', 400));

  // Create request & populate user
  let request = await Request.create({
    book: req.params.bookId,
    user: req.user.id,
  });

  request = await request
    .populate({ path: 'user', select: 'name username avatarUrl' })
    .execPopulate();

  // Create notification for book owner
  await Notification.create({
    owner: book.user,
    guest: req.user.id,
    book: book.id,
    type: 'request',
  });

  res.status(201).json({
    success: true,
    data: request,
  });
});

exports.deleteRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id);

  if (!request) return next(new ErrorResponse('Request not found', 404));

  // Make sure user is request user
  if (req.user.role !== 'admin' && req.user.id !== request.user.toString())
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this request`
      )
    );

  await request.remove();

  res.status(200).json({
    success: true,
    message: 'Request deleted',
  });
});
