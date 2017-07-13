'use strict';

const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../models/users').User;
const json = require('../helpers/json');
const auth = require('../helpers/auth');

module.exports = () => {
    const obj = {};

    obj.create = async (req, res) => {
        const roles = [];

        try {
            const count = await User.count();
            if (!count) {
                roles.concat('admin');
            }

            const user = await User.create(req.body);
            user.roles = roles;
            user.token = auth.generateToken(user);
            const savedUser = await user.save();

            json.good({
                savedUser,
            });
        } catch(err) {
            json.bad(err, res);
        }
    };

    obj.authenticate = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({email: email});

            if (!user) {
                return json.bad({
                    message: 'Sorry, that account was not found'
                }, res);
            }

            if (user.secureLock) {
                return json.bad({
                    message: 'Sorry, your account has reached the login limit several times. Please contact the server admin to resolve this'
                }, res);
            }

            user.comparePassword(password, user.password, (err, isMatch) => {
                if (err) {
                    return json.bad(err, res);
                }

                if (isMatch) {
                    if (!user.loginAttempts && !user.lockUntil && !user.secureLock) {
                        const token = auth.generateToken(user);
                        return json.good({
                            user,
                            token,
                        }, res);
                    }

                    const updates = {
                        $set: {
                            loginAttempts: 0,
                            limitReached: 0
                        },
                        $unset: {
                            lockUntil: 1
                        }
                    };

                    return user.update(updates, (err, item) => {
                        const token = auth.generateToken(user);
                        json.good({
                            user,
                            token,
                        }, res);
                    });
                }

                user.incorrectLoginAttempts((err) => {
                    let totalAttempts;
                    if (err) {
                        return json.bad(err, res);
                    }

                    if (user.limitReached >= 2) {
                        totalAttempts = 3;
                    } else {
                        totalAttempts = 5;
                    }

                    json.bad({
                        message: `Sorry, either your email or password were incorrect.
                            You have ${totalAttempts - user.loginAttempts} remaining until your account is locked`
                    }, res);

                });
            });
        } catch(err) {
            return json.bad(err, res);
        }
    };

    return obj;
};
