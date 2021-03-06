const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a name'],
  },
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: 'Username already used',
    lowercase: true,
    minlength: [5, 'Username must at least 5 characters'],
    maxlength: [20, 'Username must not over 20 characters'],
    match: [/^\w+$/, 'Username must not contain special symbol or whitespace'],
  },
  avatarUrl: {
    type: String,
    default: process.env.AVATAR_DEFAULT,
  },
  role: {
    type: String,
    default: 'user',
  },
  googleID: String,
  facebookID: String,
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: 'Email already used',
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [8, 'Password must at least 8 characters'],
    maxlength: [100, 'Password must not over 100 characters'],
    match: [
      /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{0,100})$/,
      'Password must contain digit, uppercase character and special symbol',
    ],
    select: false,
  },
  wrongLogin: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  confirmationToken: String,
  tokenExpire: Date,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 8);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create confirmation token
UserSchema.methods.getConfirmationToken = function () {
  const token = crypto.randomBytes(20).toString('hex');

  // Encrypt token
  this.confirmationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  // Set expire to x hours
  this.tokenExpire = Date.now() + process.env.TOKEN_EXPIRE * 60 * 60 * 1000;

  return token;
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.plugin(beautifyUnique);

module.exports = mongoose.model('User', UserSchema);
