const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/loginUser');

router.post('/', loginController.handleLogin)

module.exports = router;
