const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');

// @route   POST  /api/categories
// @desc    Create category
// @access  Private
router.post('/', categoriesController.createCategory);

// @route   GET  /api/categories/:slug
// @desc    Get category
// @access  Private
router.get('/:slug', categoriesController.getCategory);

// @route   PUT  /api/categories/:slug
// @desc    Rename category
// @access  Private
router.put('/:slug', categoriesController.renameCategory);

// @route   DELETE  /api/categories/:slug
// @desc    Delete category
// @access  Private
router.delete('/:slug', categoriesController.deleteCategory);

// @route   GET  /api/categories/:slug/descendants
// @desc    Get category's descendants
// @access  Private
router.get('/:slug/descendants', categoriesController.getDescendants);

// @route   PUT  /api/categories/:slug/change-parent
// @desc    Change category's parent
// @access  Private
router.put('/:slug/change-parent', categoriesController.changeParent);

module.exports = router;
