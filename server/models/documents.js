const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Documents = new Schema({
    owner: {
        type: String,
        required: true
    },
    catalogId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    options: {
        type: Array,
        required: true
    },
    totalCount: {
        type: Number,
        default: 0
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Documents', Documents);
