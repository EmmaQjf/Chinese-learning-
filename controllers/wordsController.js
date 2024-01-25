const Wordset = require('../models/wordset')
const Word = require('../models/word')

/*
router.get('/', userController.auth, wordCtrl.indexWords) // tested
router.post('/', userController.auth, wordCtrl.createWord) // tested
router.put('/:id', userController.auth, wordCtrl.updateWord) //tested
router.get('/:id', userController.auth, wordCtrl.showWord) // tested
router.delete('/:id', userController.auth, wordCtrl.deleteWord) //tested
router.get('/level/:number',userController.auth, wordCtrl.indexLevelNum)//tested
router.get('/topic/:theme',userController.auth, wordCtrl.indexTopic) //tested
*/

exports.indexWords = async(req, res) => {
    try {
        const words = await Word.find({})
        res.json(words)
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}

exports.createWord = async(req, res) => {
    try {
        const word = await Word.create(req.body)
        res.json(word)
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}

exports.updateWord = async(req, res) => {
    try {
        const word = await Word.findOneAndUpdate({_id:req.params.id}, req.body, {new: true})
        res.json(word)
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}

exports.showWord = async(req, res) => {
    try {
        const word = await Word.findOne({_id: req.params.id})
        res.json(word)
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}

exports.deleteWord = async(req, res) => {
    try {
        const foundWord = await Word.findOneAndDelete({_id: req.params.id})
        res.status(200).json({msg: `The word ${foundWord} is deleted`})
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}

exports.indexLevelNum= async(req, res) => {
    try {
        const foundWords = await Word.find({level: req.params.number})
        res.status(200).json(foundWords)
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}


exports.indexTopic= async(req, res) => {
    try {
        const foundWords = await Word.find({topic: req.params.theme})
        res.status(200).json(foundWords)
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}
