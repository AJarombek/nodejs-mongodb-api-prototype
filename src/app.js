// Author: Andrew Jarombek
// Date: 12/27/2017

const express = require('express');
const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/music_api';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('{}');
});

app.listen(port, () => {
    console.info(`Started API on port ${port}`);
});