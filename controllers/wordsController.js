const Wordset = require('../models/wordset')
const Word = require('../models/word')

/*
router.get('/', userController.auth, wordCtrl.indexWord)
router.post('/', userController.auth, wordCtrl.createWord)
router.put('/:id', userController.auth, wordCtrl.updateWord)
router.get('/:id', userController.auth, wordCtrl.showWord)
router.delete('/:id', userController.auth, wordCtrl.deleteWord)
router.get('/levels/:number',userController.auth, wordCtrl.indexLevelNum)
router.get('/topic/:theme',userController.auth, wordCtrl.indexLevelNum)
*/

exports.indexWordsets = async(req, res) => {
    try {
        const wordsets = await Wordset.find({})
        res.json(wordsets)
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}