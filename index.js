'use strict';

const http = require('http');
const appConfig = require('./server/express');
//const db = require('./server/models/db');
const app = appConfig();
const server = http.createServer(app);

server.listen(8000, () => {
    console.log('The application is running at localhost:8000');
});

module.exports = server;