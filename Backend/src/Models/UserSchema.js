const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true, 
    },
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
    }
});

module.exports = mongoose.model('User', UserSchema);