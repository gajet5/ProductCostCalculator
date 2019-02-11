const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activationCode = new Schema({
    code: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
        default: 'null'
    },
    isActivated: {
        type: Boolean,
        required: true,
        default: false
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('activationCode', activationCode);
