// Author: Andrew Jarombek
// Date: 12/27/2017

const express = require('express');
const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/music_api';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

// Replace mongoose use of callbacks with promises
mongoose.Promise = global.Promise;

const db = mongoose.connection;
const Song = require('./model/song');

const app = express();

const port = process.env.PORT || 3000;

const songRouter = express.Router();

songRouter.route('/songs')
    .get((req, res) => {
        Song.find((err, songs) => {
            if (err) {
                console.error(err);
                res.send(err);
            } else {
                res.json(songs);
            }
        })
    });

app.use('/api', songRouter);

app.get('/', (req, res) => {
    res.send('{ "title" : "Welcome to the Song API!" }');
});

app.listen(port, () => {
    console.info(`Started API on port ${port}`);
});