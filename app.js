const express = require('express');
const cors = require('cors');
const database = require('./config/db.js');

const app = express();

app.use(cors());
app.use(express.json());

database.connect();

app.use('/', require('./Routes/budget'));
app.use('/register', require('./Routes/register'));

module.exports = app;
