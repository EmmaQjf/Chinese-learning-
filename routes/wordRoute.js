const express = require('express')
const wordCtrl = require('../controllers/wordsController')
const router = express.Router()

// show all the words; create words, update words, delete words, show detail of one word
// show all the words based on the level
router.get('/', userController.auth, wordCtrl.indexWord)
router.post('/', userController.auth, wordCtrl.createWord)
router.put('/:id', userController.auth, wordCtrl.updateWord)
router.get('/:id', userController.auth, wordCtrl.showWord)
router.delete('/:id', userController.auth, wordCtrl.deleteWord)
router.get('/levels/:number',userController.auth, wordCtrl.indexLevelNum)
router.get('/topic/:theme',userController.auth, wordCtrl.indexLevelNum)

module.exports = router

