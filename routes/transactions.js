const express = require('express');
const passport = require('passport');
const router = express.Router();

const transactionsController = require('../controllers/transactions');
const advancedResults = require('../middlewares/advancedResults');
const Transaction = require('../models/Transaction');

const passportJWT = passport.authenticate('jwt', { session: false });

router.use(passportJWT);

// @route   GET /api/transactions
// @desc    Get all user's transactions
// @access  Private
router.get(
  '/',
  advancedResults('transactions', Transaction, {
    path: 'book giver receiver',
    select: 'name avatarUrl title imageUrls slug',
  }),
  transactionsController.getTransactions
);

// @route   POST /api/transactions
// @desc    Create transaction
// @access  Private
router.post('/', transactionsController.createTransaction);

// @route   GET /api/transactions/:id
// @desc    Get transaction
// @access  Private
router.get('/:id', transactionsController.getTransaction);

// @route   PUT /api/transactions/:id
// @desc    Change transaction status
// @access  Private
router.put('/:id', transactionsController.changeStatus);

module.exports = router;
