const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Formulas = new Schema({
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
    formula: {
        type: Array,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Formulas', Formulas);
