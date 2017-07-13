'use strict';
const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },

    from: {
        type: String,
        requried: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        requried: true,
    },

    message: {
        type: String,
        required: true
    },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = {
    Message,
};
