const express = require('express')
const router = express.Router()
const usersController = require('../Controllers/users')
const verifyJWT = require('../Middleware/verifyJWT')

router.route('/')
    .get(verifyJWT, usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

    module.exports = router
