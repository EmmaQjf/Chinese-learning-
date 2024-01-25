const express = require('express')
const router = express.Router()
const wordsetCtrl = require('../controllers/wordsetsController')
const userCtrl = require('../controllers/usersController')


// show all the wordsets; create wordsets, update wordset, delete wordset, show detail of one wordset

router.get('/', wordsetCtrl.indexWordsets) // no authorizaiton, the index is available to all users.
router.get('/:id', wordsetCtrl.showWordset)// no authorizaiton, the show is available to all users.
router.post('/', userCtrl.auth, wordsetCtrl.createWordset)
router.put('/:id', userCtrl.auth, wordsetCtrl.updateWordset)
router.delete('/:id', userCtrl.auth, wordsetCtrl.deleteWordset)
router.post('/:wordsetId/words/:wordId', userCtrl.auth, wordsetCtrl.addWord)


module.exports = router
