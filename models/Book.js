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
    trim: true,
    required: [true, 'Please add a description'],
  },
  imageUrls: {
    type: [String],
    default: [
      'https://res.cloudinary.com/dbu9wn1oz/image/upload/v1593149629/BookGiveaway/Books/book-cover-default.png',
    ],
  },
  author: {
    type: String,
    trim: true,
    required: [true, 'Please add author'],
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

// Create slug & Capitalize title
BookSchema.pre('save', async function (next) {
  if (!this.isModified('title')) {
    next();
  }

  const words = this.title.split(' ');
  this.title = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  this.slug = slugify(this.title + '.' + Date.now(), { lower: true });
  next();
});

// Capitalize author
BookSchema.pre('save', async function (next) {
  if (!this.isModified('author')) {
    next();
  }

  const words = this.author.split(' ');
  this.author = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
  next();
});

module.exports = mongoose.model('Book', BookSchema);
