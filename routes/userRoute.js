const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/usersController')



//induces index *new delete update create *edit show

router.post('/', userCtrl.createUser) 
router.post('/login', userCtrl.loginUser)
router.put('/:id', userCtrl.auth, userCtrl.updateUser)
router.delete('/:id', userCtrl.auth, userCtrl.deleteUser)
router.get('/:id',userCtrl.auth, userCtrl.showUser) 

module.exports = router

