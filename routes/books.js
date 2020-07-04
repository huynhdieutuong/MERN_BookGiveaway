const express = require('express');
const passport = require('passport');
const router = express.Router();

const booksController = require('../controllers/books');

const passportJWT = passport.authenticate('jwt', { session: false });

// @route   GET  /api/books
// @desc    Get books
// @access  Public
router.get('/', booksController.getBooks);

// @route   GET  /api/books/:slug
// @desc    Get single book
// @access  Public
router.get('/:slug', booksController.getBook);

router.use(passportJWT);

// @route   POST  /api/books
// @desc    Create book
// @access  Private owner or admin
router.post('/', booksController.createBook);

// @route   PUT  /api/books/:slug
// @desc    Edit book
// @access  Private owner or admin
router.put('/:slug', booksController.editBook);

// @route   DELETE  /api/books/:slug
// @desc    Delete book
// @access  Private owner or admin
router.delete('/:slug', booksController.deleteBook);

module.exports = router;
