const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Category = require('../models/Category');

exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name, parent } = req.body;

  const category = await Category.create({ name });

  await buildAncestors(category, parent);

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

exports.renameCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug }).populate({
    path: 'parent ancestors',
    select: 'name slug',
  });

  if (!category) return next(new ErrorResponse('Not found category', 404));

  category.name = req.body.name;
  await category.save();

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug }).populate({
    path: 'parent ancestors',
    select: 'name slug',
  });

  if (!category) return next(new ErrorResponse('Not found category', 404));

  await Category.deleteMany({ ancestors: category._id });
  await category.remove();

  res.status(200).json({
    success: true,
    message: `Category & Descendants deleted`,
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

exports.changeParent = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug });

  if (!category) return next(new ErrorResponse('Not found category', 404));

  await buildHierarchyAncestors(category, req.body.newParent);

  res.status(200).json({
    success: true,
    data: category,
  });
});

// Build Ancestors
const buildAncestors = async (category, parentId) => {
  const parentCategory = await Category.findById(parentId);

  if (parentCategory) {
    category.parent = parentId;
    category.ancestors = [...parentCategory.ancestors, parentId];
  }

  await category.save();
};

// Build Hierarchy Ancestors
const buildHierarchyAncestors = async (category, parentId) => {
  await buildAncestors(category, parentId);

  const result = await Category.find({ parent: category._id });

  if (result) {
    result.forEach((doc) => buildHierarchyAncestors(doc, category._id));
  }
};
