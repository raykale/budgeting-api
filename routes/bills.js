const express = require('express')
const router = express.Router()
const billCtrl = require('../controllers/bills')
const userController = require('../controllers/user')

router.post('/',userController.auth, billCtrl.create)
router.get('/', userController.auth, billCtrl.indexNotFinished)
router.get('/finished', userController.auth, billCtrl.indexFinished)
router.delete('/:id', userController.auth, billCtrl.delete)
router.put('/:id', userController.auth, billCtrl.update)
router.get('/:id', userController.auth, billCtrl.show)

module.exports = router