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

// the req.user.wordsets are not updated and added in wordsets deck 
exports.createWordset = async(req, res) => {
    try {
        req.body.user = req.user._id // create a studyset and refill the user with the user_id
        const wordset = await Wordset.create(req.body)
        req.user.wordsets.push(wordset._id)
        req.user.save()
        const updatedUser = req.user
        res.json({wordset, updatedUser})

        // req.user.wordsets?
        // req.user.wordsets.addToSet({ wordset._id}):
        // req.user.wordsets = [{ wordset._id}] 
        // const updatedUser = req.user
        // res.json({wordset, updatedUser})
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