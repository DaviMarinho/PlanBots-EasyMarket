const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  storeName: {
    type: String,
    require: true,
    unique: true,
  },
  storeDescription: {
    type: String,
    require: true,
  },
  products: [{
    productsIds: {
      type: String,
    }
  }],
  open: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Store', StoreSchema);