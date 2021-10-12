const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true,
    },
    contantID: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
    },
    updatedAt: {
        type: Date,
        require: true,
    },
});

module.exports = mongoose.model('Product', ChatSchema);