const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    storeName: {
        type: String,
        require: true,
        unique: true,
    },
    products: [{
        productsIds: {
            type: String,
        }
    }]
});

module.exports = mongoose.model('Store', StoreSchema);