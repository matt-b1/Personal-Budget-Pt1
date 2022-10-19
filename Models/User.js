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
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    dateofbirth: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);
