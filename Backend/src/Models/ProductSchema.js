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
        enum: ['SALGADO', 'DOCE', 'BEBIDA', 'DIVERSOS'],
        require: true,
    },
    available: {
        type: Boolean,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    storeID: {
        type: String,
        require: true,
    },
    productImage: {
      type: String,
      require: false,
    },
});

module.exports = mongoose.model('Product', ProductSchema);