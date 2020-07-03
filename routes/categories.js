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

// @route   GET  /api/categories/:slug/descendants
// @desc    Get category's descendants
// @access  Private
router.get('/:slug/descendants', categoriesController.getDescendants);

module.exports = router;
