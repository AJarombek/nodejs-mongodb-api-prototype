// Author: Andrew Jarombek
// Date: 12/27/2017
// Configure the entire node.js app

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

const Song = require('./model/song');
const Artist = require('./model/artist');
const User = require('./model/user');

const songRouter = require('./route/songRouter')(Song, Artist);
const artistRouter = require('./route/artistRouter')(Artist);
const userRouter = require('./route/userRouter')(User);
const commentRouter = require('./route/commentRouter')(Song);
const searchRouter = require('./route/searchRouter')(Song);

// Replace mongoose use of callbacks with promises
mongoose.Promise = global.Promise;

const mongoDB = 'mongodb://127.0.0.1/music_api';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

const db = mongoose.connection;

const app = express();

// Use embedded javascript templating (ejs) for rendering xml
app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Implement basic authentication - username 'a' and password 'j' for all api requests
app.use(basicAuth({
    users: {'a': 'j'}
}));

const port = process.env.PORT || 3000;

app.use('/api/song', songRouter);
app.use('/api/artist', artistRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);
app.use('/api/search', searchRouter);

app.get('/', (req, res) => {
    res.send('{ "title" : "Welcome to the Song API!" }');
});

app.listen(port, () => {
    console.info(`Started API on port ${port}`);
});