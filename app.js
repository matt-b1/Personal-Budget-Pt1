const express = require('express');
const cors = require('cors');
const database = require('./config/db.js');
const cookies = require('cookie-parser');

const app = express();

app.use(cookies());
app.use(cors());
app.use(express.json());

database.connect();

app.use('/', require('./Routes/budget'));
app.use('/register', require('./Routes/register'));
app.use('/login', require('./Routes/login'));
app.use('/logout', require('./Routes/logout'));

module.exports = app;
