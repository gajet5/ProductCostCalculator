const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const util = require('util');

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
    },
    premium: {
        type: Boolean,
        default: false
    },
    premiumDateEnd: {
        type: Date,
        default: Date.now
    },
    lastConfirmEmail: {
        type: Date,
        default: Date.now
    }
});

User.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const bcryptGenSalt = util.promisify(bcrypt.genSalt);
        const bcrypthash = util.promisify(bcrypt.hash);

        let salt = await bcryptGenSalt(8);
        this.password = await bcrypthash(this.password, salt, null);
    }
    return next();
});

User.pre('updateOne', async function(next) {
    if (this._update.password) {
        const bcryptGenSalt = util.promisify(bcrypt.genSalt);
        const bcrypthash = util.promisify(bcrypt.hash);

        let salt = await bcryptGenSalt(8);
        this._update.password = await bcrypthash(this._update.password, salt, null);
    }
    return next();
});

User.methods.comparePassword = async function(password) {
    const bcryptCompare = util.promisify(bcrypt.compare);
    try {
        return await bcryptCompare(password, this.password);
    } catch (e) {
        console.log(e);
    }
};

module.exports = mongoose.model('User', User);
