const mongoose = require('mongoose')
const Schema = mongoose.Schema

const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
})

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(Number(config.salt), function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next()
    })
  })
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.jwt_private_key, { expiresIn: '1h' });
  return token
};

module.exports = mongoose.model('User', UserSchema)