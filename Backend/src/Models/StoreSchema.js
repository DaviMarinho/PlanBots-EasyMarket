const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  storeName: {
    type: String,
    require: true,
    unique: true,
  },
  storeImage: {
    type: String,
    require: false,
  },
  storeDescription: {
    type: String,
    require: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
  storeLatitude: {
    type: String,
    default: ''
  },
  storeLongitude: {
    type: String,
    default: '',
  }
});

module.exports = mongoose.model('Store', StoreSchema);