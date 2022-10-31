const express = require('express');
const router = express.Router();
const budgetController = require('../Controllers/budget');
const verifyJWT = require('../Middleware/verifyJWT');

router.route('/')
    .get(budgetController.getAllBudgets)
    .post(budgetController.createNewBudget)
    .patch(budgetController.updateBudget)
    .delete(budgetController.deleteBudget)

module.exports = router;
