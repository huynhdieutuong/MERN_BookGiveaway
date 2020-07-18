const Category = require('../models/Category');
const Notification = require('../models/Notification');
const ErrorResponse = require('../utils/ErrorResponse');

module.exports = (route, model, populate) => async (req, res, next) => {
  let { isGave, book, user, cat, key, sort, select, page, limit } = req.query;
  let query;
  let total;

  let querySearch = {};

  // Get requests by bookId
  if (route === 'requests' && req.params.bookId) {
    querySearch = { book: req.params.bookId };
  }

  // Get all requests
  if (route === 'requests' && !req.params.bookId) {
    if (book) querySearch = { book };
    if (user) querySearch = { user };
  }

  // Get requests by userId
  if (route === 'myRequests') {
    querySearch = { user: req.user.id };
  }

  // Get notifications by userId
  if (route === 'notifications') {
    querySearch = { owner: req.user.id };
  }

  // Mark all read & Get notifications by userId
  if (route === 'markAllRead') {
    await Notification.updateMany({ owner: req.user.id }, { isRead: true });
    querySearch = { owner: req.user.id };
  }

  // Get transactions by userId
  if (route === 'transactions') {
    querySearch = { $or: [{ giver: req.user.id }, { receiver: req.user.id }] };
  }

  // Get books by keyword & category
  if (route === 'books') {
    let queryKey = {};
    if (key) {
      queryKey = {
        $or: [
          { title: new RegExp(key, 'i') },
          { author: new RegExp(key, 'i') },
        ],
      };
    }

    let queryCat = {};
    if (cat) {
      // Get descendants
      try {
        const categories = await Category.find({ ancestors: cat });
        const arrCats = [{ category: cat }];

        categories.forEach((ca) => {
          arrCats.push({ category: ca.id });
        });

        queryCat = { $or: arrCats };
      } catch (error) {
        next(error);
      }
    }

    let queryGave = { isGave: false };
    if (isGave) queryGave = { isGave };

    let queryUser = {};
    if (user) queryUser = { user };

    querySearch = { $and: [queryUser, queryKey, queryCat, queryGave] };
  }

  query = model.find(querySearch);
  total = await model.countDocuments(querySearch);

  // Select fields
  if (select) {
    const fields = select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (sort) {
    query = query.sort(sort);
  } else {
    query = query.sort('-createAt');
  }

  // Populate
  if (populate) {
    query = query.populate(populate);
  }

  // Pagination
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  query = query.skip(startIndex).limit(limit);

  const pagination = {};
  if (endIndex < total) pagination.next = page + 1;
  if (startIndex > 0) pagination.prev = page - 1;

  const results = await query;

  res.advancedResults = {
    success: true,
    count: results.length,
    totalPages,
    pagination,
    data: results,
  };

  next();
};
