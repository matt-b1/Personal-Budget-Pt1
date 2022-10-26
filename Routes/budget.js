const express = require('express');
const router = express.Router();
const budgetController = require('../Controllers/budget');
const verifyJWT = require('../Middleware/verifyJWT');

router.get('/', verifyJWT, budgetController.handleBudget);

module.exports = router;
