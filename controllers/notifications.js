const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Notification = require('../models/Notification');

exports.getNotifications = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.markRead = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id).populate({
    path: 'guest book',
    select: 'name avatarUrl title imageUrls slug',
  });

  if (!notification)
    return next(new ErrorResponse('Notification not found', 404));

  // Make sure user is notification user
  if (
    req.user.role !== 'admin' &&
    req.user.id !== notification.owner.toString()
  )
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to mark read this notification`,
        401
      )
    );

  // Mark read or unread
  notification.isRead = !notification.isRead;
  await notification.save();

  res.status(200).json({
    success: true,
    data: notification,
  });
});

exports.markAllRead = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.clearNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification)
    return next(new ErrorResponse('Notification not found', 404));

  // Make sure user is notification user
  if (
    req.user.role !== 'admin' &&
    req.user.id !== notification.owner.toString()
  )
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this notification`,
        401
      )
    );

  // Clear notification
  await notification.remove();

  res.status(200).json({
    success: true,
    message: 'Notification deleted',
  });
});

exports.clearAll = asyncHandler(async (req, res, next) => {
  await Notification.deleteMany({ owner: req.user.id });

  res.status(200).json({
    success: true,
    data: [],
  });
});
