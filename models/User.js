const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
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
    maxlength: [50, 'Password must not over 50 characters'],
    match: [
      /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{0,50})$/,
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
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.plugin(beautifyUnique);

module.exports = mongoose.model('User', UserSchema);
