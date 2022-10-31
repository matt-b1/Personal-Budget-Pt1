const express = require('express');
const router = express.Router();
const budgetController = require('../Controllers/budget');
const verifyJWT = require('../Middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, budgetController.getAllBudgets)
    .post(verifyJWT, budgetController.createNewBudget)
    .patch(verifyJWT, budgetController.updateBudget)
    .delete(verifyJWT, budgetController.deleteBudget)

module.exports = router;
