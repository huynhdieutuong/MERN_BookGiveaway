const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Category = require('../models/Category');

exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name, parent } = req.body;

  const category = new Category({ name });

  if (parent) {
    category.parent = parent;
    await buildAncestors(category, parent);
  }

  await category.save();

  res.status(201).json({
    success: true,
    data: category,
  });
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug }).populate({
    path: 'parent ancestors',
    select: 'name slug',
  });

  if (!category) return next(new ErrorResponse('Not found category', 404));

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.getDescendants = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug });

  if (!category) return next(new ErrorResponse('Not found category', 404));

  const categories = await Category.find({
    ancestors: category._id,
  }).select('name slug');

  res.status(200).json({
    success: true,
    data: categories,
  });
});

// Build Ancestors
const buildAncestors = async (category, parentId) => {
  const parentCategory = await Category.findById(parentId);

  if (parentCategory) {
    category.ancestors = [...parentCategory.ancestors, parentId];
  }
};
