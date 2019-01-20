const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Positions = new Schema({
    owner: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Positions', Positions);
