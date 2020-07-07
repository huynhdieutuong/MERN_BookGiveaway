const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const ErrorResponse = require('../utils/ErrorResponse');

const CategorySchema = new Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CategorySchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next();
  }

  let slug = slugify(this.name, { lower: true });

  if (this.parent) {
    const firstAncestor = await this.model('Category').findById(
      this.ancestors[0]
    );
    slug = firstAncestor.slug + '.' + slug;
  }

  const slugExists = await this.model('Category').find({
    slug: new RegExp(slug, 'g'),
  });
  if (slugExists.length) {
    slug = slug + '-' + slugExists.length;
  }

  this.slug = slug;
  next();
});

CategorySchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'category',
  justOne: false,
});

module.exports = mongoose.model('Category', CategorySchema);
