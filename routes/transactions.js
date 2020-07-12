const express = require('express');
const passport = require('passport');
const router = express.Router();

const transactionsController = require('../controllers/transactions');
const advancedResults = require('../middlewares/advancedResults');
const Transaction = require('../models/Transaction');

const passportJWT = passport.authenticate('jwt', { session: false });

router.use(passportJWT);

// @route   GET api/transactions
// @desc    Get all user's transactions
// @access  Private
router.get(
  '/',
  advancedResults('transactions', Transaction, {
    path: 'guest book',
    select: 'name avatarUrl title imageUrls slug',
  }),
  transactionsController.getTransactions
);

module.exports = router;
