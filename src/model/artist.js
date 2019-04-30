// Author: Andrew Jarombek
// Date: 12/29/2017
// The Schema for the Artist Document in MongoDB

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Song sub-document of album with is inside artist
const SongSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    song_id: Schema.Types.ObjectId
}, {usePushEach: true, _id : false});

// Album Sub-document of artist
const AlbumSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    release_date: Date,
    songs : [{
        type: SongSchema
    }]
}, {usePushEach: true, _id : false});

// The main document for an artist
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
}, {usePushEach: true});

ArtistSchema.index({name: 1});

module.exports = mongoose.model('Artist', ArtistSchema, 'artist');