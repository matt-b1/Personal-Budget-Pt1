const express = require('express');
const router = express.Router();
const userController = require('../Controllers/registerUser');

router.post('/', userController.handleNewUser);

module.exports = router;
