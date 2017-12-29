const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    username: String,
    date: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        trim: true
    }
});

const SongSchema = new Schema({
    title: {
       type: String,
       trim: true
    },
    album: {
       type: String,
       trim: true
    },
    artist: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: ['a', 'j', 'aj']
    },
    release_date: String,
    best_lyric: String,
    comments: [{
        type: CommentSchema,
        required: true
    }]
});

module.exports = mongoose.model('Song', SongSchema, 'song');