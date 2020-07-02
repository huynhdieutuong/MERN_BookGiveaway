const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  coverUrl: {
    type: String,
    default:
      'https://res.cloudinary.com/dbu9wn1oz/image/upload/v1593149629/BookGiveaway/Books/book-cover-default.png',
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please select a category'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', BookSchema);
