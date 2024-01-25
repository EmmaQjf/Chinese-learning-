const express = require('express')
const wordCtrl = require('../controllers/wordsController')
const userCtrl = require('../controllers/usersController')
const router = express.Router()

// show all the words; create words, update words, delete words, show detail of one word
// show all the words based on the level
router.get('/', wordCtrl.indexWords) // the word list available to all users
router.get('/:id', wordCtrl.showWord) // the specific word info is avaiable to all users
router.post('/', userCtrl.auth, wordCtrl.createWord)
router.put('/:id', userCtrl.auth, wordCtrl.updateWord)
router.delete('/:id', userCtrl.auth, wordCtrl.deleteWord)
router.get('/level/:number',wordCtrl.indexLevelNum)
router.get('/topic/:theme',wordCtrl.indexTopic)

module.exports = router

