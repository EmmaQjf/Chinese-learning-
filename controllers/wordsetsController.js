const User = require('../models/user')
const Word = require('../models/word')
const Wordset = require('../models/wordset')
const Label = require('../models/label')

/*
router.get('/', userController.auth, wordCtrl.indexWordsets) //tested
router.post('/', userController.auth, wordCtrl.createWordset) //tested
router.put('/:id', userController.auth, wordCtrl.updateWordset) //tested
router.get('/:id', userController.auth, wordCtrl.showWordset) //tested
router.delete('/:id', userController.auth, wordCtrl.deleteWordset) //tested
router.post('/:wordsetId/words/:wordId', userCtrl.auth, wordsetCtrl.addWord) //tested
*/

// router.post('/:wordsetId/labels/:labelId', userCtrl.auth, labelCtrl.addlabel) //tested

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
    // delete req.user.wordsets.pull(req.params.id)
    try {
        await Wordset.findOneAndDelete({_id: req.params.id})
         req.user.wordsets.pull(req.params.id) //delete the wordsets from the user model 
        await req.user.save()
        res.status(200).json({msg: "The wordset is deleted"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}

//router.post('/:wordsetId/words/:wordId', userCtrl.auth, wordsetCtrl.addWord)
exports.addWord = async(req, res) => {
    try {
        const foundWordset = await Wordset.findOne({_id: req.params.wordsetId})
        if(!foundWordset) throw new Error(`Could not locate wordset with id ${req.params.wordsetId}`)
        const foundWord = await Word.findOne({_id: req.params.wordId})
        if(!foundWord) throw new Error(`Could not locate wordset with id ${req.params.wordId}`)
        foundWordset.words.addToSet(foundWord._id) // addtoset only push word into array if it does not exist.
        await foundWordset.save()
        foundWord.wordsets.addToSet(foundWordset._id)
        await foundWord.save()

        // add wordsets to word 
        res.status(200).json({
            msg: `Sucessfully associate words with id ${req.params.wordId} with wordset with id ${req.params.wordsetId} `,
            wordset: foundWordset,
            word: foundWord
        })

    } catch (error) {
        res.status(400).json({message: error.message})
    }  
}


//router.post('/:wordsetId/labels/:labelId', userCtrl.auth, labelCtrl.addlabel) 
exports.addLabel = async(req, res) => {
    try {
        const foundWordset = await Wordset.findOne({_id: req.params.wordsetId})
        if(!foundWordset) throw new Error(`Could not locate wordset with id ${req.params.wordsetId}`)
        const foundLabel= await Label.findOne({_id: req.params.labelId})
        if(!foundLabel) throw new Error(`Could not locate label with id ${req.params.labelId}`)
        foundWordset.labels.addToSet(foundLabel._id)
        await foundWordset.save()
        foundLabel.wordsets.addToSet(foundWordset._id)
        await foundLabel.save()
        res.status(200).json({
            msg: `Sucessfully associate wordset with id ${req.params.wordsetId} with label with id ${req.params.labelId} `,
            wordset: foundWordset,
            label: foundLabel
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}