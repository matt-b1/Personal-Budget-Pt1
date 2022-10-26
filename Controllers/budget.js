const Budget = require('../Models/Budget');

async function handleBudget (req, res) {
    console.log(`Hello ${req.user}`);
    res.send(`Hello`);
}

module.exports = { handleBudget };
