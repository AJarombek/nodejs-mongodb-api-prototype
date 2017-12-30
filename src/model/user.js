// Author: Andrew Jarombek
// Date: 12/29/2017
// The Schema for the User Document in MongoDB

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema, 'user');