//const Budget = require('../models/Budget');

async function defaultRoute (req, res) {
    res.send('Hello');
}

module.exports = { defaultRoute };
