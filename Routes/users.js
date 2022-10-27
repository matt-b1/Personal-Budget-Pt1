const express = require('express')
const router = express.Router()
const usersController = require('../Controllers/users')
const verifyJWT = require('../Middleware/verifyJWT')

router.route('/')
    .get(verifyJWT, usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(verifyJWT, usersController.updateUser)
    .delete(verifyJWT, usersController.deleteUser)

    module.exports = router
