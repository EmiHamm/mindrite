'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const users = require('./controllers/users')();

module.exports = () => {
    const app = express();
    const publicPath = path.resolve(process.cwd(), 'public');
    const distPath = path.resolve(process.cwd(), 'dist');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(compression());
    app.use(morgan('dev'));
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-type');
        next();
    });
    app.use(express.static(publicPath));
    app.use(express.static(distPath));

    app.get('/', (req, res) => {
        res.sendFile(`${publicPath}/index.html`);
    });
    app.get('/signup', (req, res) => {
        res.sendFile(`${publicPath}/views/signup.html`);
    });
    app.post('/signup', users.create);
    app.get('/login', (req, res) => {
        res.sendFile(`${publicPath}/views/login.html`);
    });
    app.post('/login', users.authenticate);
    return app;
};
