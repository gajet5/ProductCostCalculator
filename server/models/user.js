const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    isActiveted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', User);