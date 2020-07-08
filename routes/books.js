const express = require('express');
const passport = require('passport');
const router = express.Router();

const booksController = require('../controllers/books');
const Book = require('../models/Book');
const advancedResults = require('../middlewares/advancedResults');

const passportJWT = passport.authenticate('jwt', { session: false });

// @route   GET  /api/books
// @desc    Get books
// @access  Public
router.get('/', advancedResults(Book), booksController.getBooks);

// @route   GET  /api/books/:id
// @desc    Get single book
// @access  Public
router.get('/:id', booksController.getBook);

router.use(passportJWT);

// @route   POST  /api/books
// @desc    Create book
// @access  Private
router.post('/', booksController.createBook);

// @route   PUT  /api/books/:id
// @desc    Edit book
// @access  Private owner or admin
router.put('/:id', booksController.editBook);

// @route   DELETE  /api/books/:id
// @desc    Delete book
// @access  Private owner or admin
router.delete('/:id', booksController.deleteBook);

// Re-route into other resource routers
router.use('/:bookId/requests', require('./requests'));

module.exports = router;
