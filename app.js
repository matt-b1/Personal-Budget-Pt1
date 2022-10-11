const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const routes = require('./Routes/budget');
app.use('/', routes);

module.exports = app;
