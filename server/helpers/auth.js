'use strict';

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/users').User;
const json = require('./json');

function generateToken(obj) {
    const today = new Date();
    const exp = new Date(today);
    const claims = obj._id;
    exp.setDate(today.getDate() + 1);

    return jwt.sign({
        _id: claims,
        exp: parseInt(exp.getTime() / 1000)
    }, global.config.secret);
}

async function ensureAuthorized(req, res, next) {
    let bearerToken;
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];

        try {
            const decoded = jwt.verify(bearerToken, global.config.secret);
            const requestedId = decoded._id;
            const requestedUser = await User.findOne({_id: requestedId});

            if (err || !user) {
                return res.sendStatus(403);
            }
            if (user) {
                if (!user.roles.includes('admin')) {
                    return res.sendStatus(403);
                }

                req.user = user;
                next();
            } else {
                return res.sendStatus(403);
            }
        } catch (err) {
            console.log(err);
            return res.sendStatus(403);
        }
    } else {
        return res.sendStatus(403);
    }
}

module.exports = {
    generateToken,
    ensureAuthorized
};
