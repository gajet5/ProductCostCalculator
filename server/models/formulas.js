const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Formula = new Schema({
    index: {
        type: Number,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    }
});

const Formulas = new Schema({
    owner: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    formula: [Formula],
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Formulas', Formulas);
