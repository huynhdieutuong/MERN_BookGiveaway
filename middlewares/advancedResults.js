const Category = require('../models/Category');

module.exports = (model, populate) => async (req, res, next) => {
  let { cat, key, sort, select, page, limit } = req.query;
  let query;
  let total;

  // Search by keyword & category
  let querySearch = {};

  if (key || cat) {
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
      const categories = await Category.find({ ancestors: cat });
      const arrCats = [{ category: cat }];

      categories.forEach((ca) => {
        arrCats.push({ category: ca.id });
      });

      queryCat = { $or: arrCats };
    }

    querySearch = { $and: [queryKey, queryCat] };
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
