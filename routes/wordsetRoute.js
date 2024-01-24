const express = require('express')
const router = express.Router()
const wordsetCtrl = require('../controllers/wordsetsController')
const userCtrl = require('../controllers/usersController')


// show all the wordsets; create wordsets, update wordset, delete wordset, show detail of one wordset
// router.get('/',  wordsetCtrl.indexWordsets)
// router.post('/', wordsetCtrl.createWordset)
// router.put('/:id', wordsetCtrl.updateWordset)
// router.get('/:id',  wordsetCtrl.showWordset)
// router.delete('/:id', wordsetCtrl.deleteWordset)

router.get('/', userCtrl.auth, wordsetCtrl.indexWordsets)
router.post('/', userCtrl.auth, wordsetCtrl.createWordset)
router.put('/:id', userCtrl.auth, wordsetCtrl.updateWordset)
router.get('/:id', userCtrl.auth, wordsetCtrl.showWordset)
router.delete('/:id', userCtrl.auth, wordsetCtrl.deleteWordset)


module.exports = router
