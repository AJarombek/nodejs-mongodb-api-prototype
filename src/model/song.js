// Author: Andrew Jarombek
// Date: 12/28/2017
// The Schema for the Song Document in MongoDB

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    username: String,
    user_id: Schema.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        trim: true
    }
}, {usePushEach: true, _id : false});

const SongSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    album: {
        type: String,
        trim: true
    },
    artist: {
        type: String,
        trim: true,
        required: true
    },
    artist_id: Schema.Types.ObjectId,
    type: {
        type: String,
        enum: ['a', 'j', 'aj']
    },
    release_date: {
        type: Date,
        default: Date.now()
    },
    best_lyric: String,
    comments: [{
        type: CommentSchema
    }]
}, {usePushEach: true});

// Add indexes for text search
SongSchema.index(
    {
        'title': 'text',
        'album': 'text',
        'artist': 'text',
        'best_lyric': 'text'
    },
    {
        'weights': {
            'title': 10,
            'album': 5,
            'artist': 8,
            'best_lyric': 2
        }
    }
);

module.exports = mongoose.model('Song', SongSchema, 'song');