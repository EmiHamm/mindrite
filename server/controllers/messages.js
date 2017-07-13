'use strict';

const mongoose = require('mongoose');
const Message = require('../models/messages').Message;
const User = require('../models/Users').User;
const json = require('../helpers/json');

module.exports = () => {
    const obj = {};

    obj.create = async (req, res) => {
        try {
            const message = await Message.create(req.body);
            const user = await User.findOne({role: $includes: {'admin'}});
            user.messages.push(message);

            // send user notification
            return Promise.All([message.save(), user.save()])
                .then(() => {
                    json.good(null, res);
                });
        } catch(err) {
            return json.bad(err, res);
        }            
    };

    return obj;
};

