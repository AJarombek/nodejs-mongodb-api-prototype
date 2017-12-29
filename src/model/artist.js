// Author: Andrew Jarombek
// Date: 12/29/2017

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {
        type: String,
        time: true,
        required: true
    },
    release_date: {
        type: Date,
        default: Date.now()
    },
    songs : [{
        type: SongSchema
    }]
});

const SongSchema = new Schema({
    name: {
        type: String,
        time: true,
        required: true
    },
    song_id: Schema.Types.ObjectId
});

const ArtistSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    genre: {
        type: String,
        trim: true
    },
    albums: [{
        type: AlbumSchema
    }]
});

module.exports = mongoose.model('Artist', ArtistSchema, 'artist');