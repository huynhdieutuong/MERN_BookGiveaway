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

// Build Ancestors
const buildAncestors = async (category, parentId) => {
  const parentCategory = await Category.findById(parentId);

  if (parentCategory) {
    category.ancestors = [...parentCategory.ancestors, parentId];
  }
};
