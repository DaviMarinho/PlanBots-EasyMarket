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
  },
  storeLatitude: {
    type: String,
  },
  storeLongitude: {
    type: String,
  }
});

module.exports = mongoose.model('Store', StoreSchema);