const express = require('express')
const router = express.Router()
const labelCtrl = require('../controllers/labelsController') 
const userCtrl = require('../controllers/usersController') 


// create label, add, update, delete label 
// 
router.post('/', userCtrl.auth, labelCtrl.createLabel)
router.get('/:id', userCtrl.auth, labelCtrl.showLabel)
router.put('/:id', userCtrl.auth, labelCtrl.updateLabel)
router.delete('/:id', userCtrl.auth, labelCtrl.deleteLabel)

module.exports = router
