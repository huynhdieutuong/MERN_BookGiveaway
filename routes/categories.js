const express = require('express');
const passport = require('passport');
const router = express.Router();

const categoriesController = require('../controllers/categories');
const requiredAdmin = require('../middlewares/requiredAdmin');

const passportJWT = passport.authenticate('jwt', { session: false });

// @route   GET  /api/categories
// @desc    Get categories
// @access  Public
router.get('/', categoriesController.getCategories);

// @route   GET  /api/categories/:slug
// @desc    Get category
// @access  Public
router.get('/:slug', categoriesController.getCategory);

// @route   GET  /api/categories/:slug/descendants
// @desc    Get category's descendants
// @access  Public
router.get('/:slug/descendants', categoriesController.getDescendants);

router.use(passportJWT);
router.use(requiredAdmin);

// @route   POST  /api/categories
// @desc    Create category
// @access  Private admin
router.post('/', categoriesController.createCategory);

// @route   PUT  /api/categories/:slug
// @desc    Rename category
// @access  Private admin
router.put('/:slug', categoriesController.renameCategory);

// @route   DELETE  /api/categories/:slug
// @desc    Delete category
// @access  Private admin
router.delete('/:slug', categoriesController.deleteCategory);

// @route   PUT  /api/categories/:slug/change-parent
// @desc    Change category's parent
// @access  Private admin
router.put('/:slug/change-parent', categoriesController.changeParent);

module.exports = router;
