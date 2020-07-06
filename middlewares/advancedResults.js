module.exports = (model, populate) => async (req, res, next) => {
  let { key, sort, select, page, limit } = req.query;
  let query;
  let total;

  // Search keyword
  if (key) {
    const queryKey = {
      $or: [{ title: new RegExp(key, 'i') }, { author: new RegExp(key, 'i') }],
    };

    query = model.find(queryKey);
    total = await model.countDocuments(queryKey);
  } else {
    query = model.find();
    total = await model.countDocuments();
  }

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
    total,
    pagination,
    data: results,
  };

  next();
};
