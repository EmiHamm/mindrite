'use strict';

const mongoose = require('mongoose');
const promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/quick');
mongoose.Promise = promise;

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => {
    console.log('database connected');
});
exports.mongoose = mongoose;
exports.db = db;
