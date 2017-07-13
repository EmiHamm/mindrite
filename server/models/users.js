'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now,
    },

    lastUpdated: {
        type: Date,
        default: Date.now
    },

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    roles: {
        type: Array,
        default: [],
    },

    messages: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Message',
        required: false
    }]
});

userSchema.pre('save', async (next) => {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcypt.hash(salt, this.password);
    this.password = hash;
});

userSchema.methods = {
    toJSON() {
        const obj = this.toObject();
        obj.password = '';
        return obj;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
};
