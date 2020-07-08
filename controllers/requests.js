const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Book = require('../models/Book');
const Request = require('../models/Request');
const Notification = require('../models/Notification');

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