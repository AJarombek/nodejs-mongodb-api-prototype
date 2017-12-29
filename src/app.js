// Author: Andrew Jarombek
// Date: 12/27/2017

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Song = require('./model/song');

const songRouter = require('./route/songRouter')(Song);

const mongoDB = 'mongodb://127.0.0.1/music_api';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

// Replace mongoose use of callbacks with promises
// mongoose.Promise = global.Promise;

const db = mongoose.connection;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use('/api/song', songRouter);

app.get('/', (req, res) => {
    res.send('{ "title" : "Welcome to the Song API!" }');
});

app.listen(port, () => {
    console.info(`Started API on port ${port}`);
});