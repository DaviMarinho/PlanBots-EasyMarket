const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    chatID: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        require: true,
    },
});

module.exports = mongoose.model('Product', MessageSchema); 