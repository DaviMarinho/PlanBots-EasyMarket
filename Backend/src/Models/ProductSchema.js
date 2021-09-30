const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    productDescription: {
        type: String,
    },
    category: {
        type: String,
        require: true,
    },
    available: {
        type: Boolean,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    }
});

module.exports = mongoose.model('Product', ProductSchema);