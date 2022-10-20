const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: ""
    },

});

module.exports = mongoose.model('User', userSchema);
