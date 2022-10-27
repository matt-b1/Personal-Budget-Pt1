const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const cookies = require('cookie-parser');

const app = express();

app.use(cookies());
app.use(cors());
app.use(express.json());

connectDB.connect();

//app.use('/', require('./Routes/budget'));
app.use('/register', require('./Routes/register'));
app.use('/login', require('./Routes/login'));
app.use('/logout', require('./Routes/logout'));
app.use('/refresh', require('./Routes/refresh'));
app.use('/budget', require('./Routes/budget'));
app.use('/users', require('./Routes/users'));

module.exports = app;
