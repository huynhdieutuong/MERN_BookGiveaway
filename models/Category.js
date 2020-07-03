const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const ErrorResponse = require('../utils/ErrorResponse');

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a name'],
  },
  slug: String,
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  ancestors: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

CategorySchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next();
  }

  const slug = slugify(this.name, { lower: true });

  const slugExists = await this.model('Category').findOne({ slug });
  if (slugExists) return next(new ErrorResponse('Duplicate slug', 400));

  this.slug = slug;
  next();
});

module.exports = mongoose.model('Category', CategorySchema);
