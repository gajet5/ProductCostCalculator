const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

User.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (e) {
        console.log(e);
    }
};

module.exports = mongoose.model('User', User);
