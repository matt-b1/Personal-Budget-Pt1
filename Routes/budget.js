const express = require('express');
const router = express.Router();
const budgetController = require('../Controllers/budget');
const verifyJWT = require('../Middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, budgetController.handleBudget)
    .post(verifyJWT)
    .patch(verifyJWT)
    .delete(verifyJWT)

module.exports = router;
