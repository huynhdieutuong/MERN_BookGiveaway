const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');

// @route   POST  /api/categories
// @desc    Create category
// @access  Private
router.post('/', categoriesController.createCategory);

module.exports = router;
