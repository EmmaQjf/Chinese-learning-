const User = require('../models/user')
const Wordset = require('../models/wordset')

/*
router.get('/', userController.auth, wordCtrl.indexWordsets)
router.post('/', userController.auth, wordCtrl.createWordset)
router.put('/:id', userController.auth, wordCtrl.updateWordset)
router.get('/:id', userController.auth, wordCtrl.showWordset)
router.delete('/:id', userController.auth, wordCtrl.deleteWordset)
*/

exports.indexWordsets = async(req, res) => {
    try {
        const wordsets = await Wordset.find({})
        res.json(wordsets)
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}

exports.createWordset = async(req, res) => {
    try {
        req.body.user = req.user._id
        const wordset = await Wordset.create(req.body)
        req.user.wordsets?
        req.user.wordsets.addToSet({_id: wordset._id}):
        req.user.wordsets = [{_id: wordset._id}] // when a new user is created, should it not be an empty array for the value of property todos?
        res.json(todo)
        res.json(wordset)
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}

exports.updateWordset = async(req, res) => {
    try {
        const wordset = await Wordset.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        res.json(wordset)
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}

exports.showWordset = async(req, res) => {
    try {
        const wordset = await Wordset.findOne({_id: req.params.id})
        res.json(wordset)
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}

exports.deleteWordset = async(req, res) => {
    try {
        await Wordset.findOneAndDelete({_id: req.params.id})
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}