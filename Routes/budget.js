const express = require('express');
const router = express.Router();
const budgetController = require('../Controllers/budget');

router.get('/', budgetController.defaultRoute);

module.exports = router;
