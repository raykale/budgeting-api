const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/:id', userController.auth, userController.updateUser)
router.delete('/:id', userController.auth, userController.deleteUser)

module.exports = router