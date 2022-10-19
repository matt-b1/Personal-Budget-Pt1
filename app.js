const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

async function connect() {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.log(error);
    }
}

connect();

app.use('/', require('./Routes/budget'));
app.use('/register', require('./Routes/register'));
app.use('/login', require('./Routes/login'));

module.exports = app;
