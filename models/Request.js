const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
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

// Prevent user from submitting more than one request per book
RequestSchema.index({ book: 1, user: 1 }, { unique: true });

RequestSchema.plugin(beautifyUnique, {
  defaultMessage: 'You have entered giveaway in this book',
});

module.exports = mongoose.model('Request', RequestSchema);
