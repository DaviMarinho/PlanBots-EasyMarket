const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  pass: {
    type: String,
    require: true,
  },
  storeID: {
    type: String,
    require: true
  },
  rating: {
    type: Number,
  },
  cpf: {
    type: String,
    require: true,
    unique: true
  },
  image: {
    type: String,
    require: false,
  }
});

module.exports = mongoose.model('User', UserSchema);