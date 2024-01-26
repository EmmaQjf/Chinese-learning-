const Wordset = require('../models/wordset')
const Word = require('../models/word')

/*
router.get('/', wordCtrl.indexWords) // the word list available to all users
router.get('/:id', wordCtrl.showWord) // the specific word info is avaiable to all users
router.post('/', userCtrl.auth, wordCtrl.createWord)
router.put('/:id', userCtrl.auth, wordCtrl.updateWord)
router.delete('/:id', userCtrl.auth, wordCtrl.deleteWord)
router.get('/level/:number',wordCtrl.indexLevelNum)
router.get('/topic/:theme',wordCtrl.indexTopic)
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
        req.body.user = req.user._id // review it added the user property for all the word created 
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
        // res.status(200).json({msg: `The word ${foundWord} is deleted`})
        res.status(200).json({msg: 'The word is deleted'})
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
