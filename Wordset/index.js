const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const User = require('../User')
const {WordModel} = require('../Word')
const {Model} = require('../Label')


class Wordset {
    constructor(WordsetModel, controller, router){
        this.WordsetModel = WordsetModel,
        this.controller = controller,
        this.router = router
    }
}

const wordsetSchema = new mongoose.Schema({
    title: {type: String, required:true},
    level: {type: Number},
    words: [{type: mongoose.Schema.Types.ObjectId, ref:'Word'}],
    labels: [{type: mongoose.Schema.Types.ObjectId, ref:'Label'}],
    user:{type: mongoose.Schema.Types.ObjectId, ref:'User'}
},{timestamps:true}
)
const WordsetModel = mongoose.model('WordsetModel', wordsetSchema)


const wordsetCtrl = {

    async indexWordsets(req, res){
        try {
            const wordsets = await WordsetModel.find({})
            res.json(wordsets)
        } catch (error) {
            res.status(400).json({message: error.message})
        }  
    },
    
    async createWordset(req, res){
        try {
            req.body.user = req.user._id // create a studyset and refill the user with the user_id
            const wordset = await WordsetModel.create(req.body)
            req.user.wordsets.push(wordset._id)
            req.user.save()
            const updatedUser = req.user
            res.json({wordset, updatedUser})
        } catch (error) {
            res.status(400).json({message: error.message})
        }  
    },
    
    async updateWordset(req, res) {
        try {
            const wordset = await WordsetModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
            res.json(wordset)
        } catch (error) {
            res.status(400).json({message: error.message})
        }  
    },
    
    async showWordset(req, res){
        try {
            const wordset = await WordsetModel.findOne({_id: req.params.id})
            res.json(wordset)
        } catch (error) {
            res.status(400).json({message: error.message})
        }  
    },
    
    async deleteWordset (req, res) {
        // delete req.user.wordsets.pull(req.params.id)
        try {
            await WordsetModel.findOneAndDelete({_id: req.params.id})
             req.user.wordsets.pull(req.params.id) //delete the wordsets from the user model 
            await req.user.save()
            res.status(200).json({msg: "The wordset is deleted"})
        } catch (error) {
            res.status(400).json({message: error.message})
        }  
    },
    
    //router.post('/:wordsetId/words/:wordId', userCtrl.auth, wordsetCtrl.addWord)
    async addWord(req, res){
        try {
            const foundWordset = await WordsetModel.findOne({_id: req.params.wordsetId})
            if(!foundWordset) throw new Error(`Could not locate wordset with id ${req.params.wordsetId}`)
            const foundWord = await WordModel.findOne({_id: req.params.wordId})
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
    },
    
    
    //router.post('/:wordsetId/labels/:labelId', userCtrl.auth, labelCtrl.addlabel) 
    async addLabel(req, res){
        try {
            const foundWordset = await WordsetModel.findOne({_id: req.params.wordsetId})
            if(!foundWordset) throw new Error(`Could not locate wordset with id ${req.params.wordsetId}`)
            const foundLabel= await Model.findOne({_id: req.params.labelId})
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

}

router.get('/', wordsetCtrl.indexWordsets) // no authorizaiton, the index is available to all users.
router.get('/:id', wordsetCtrl.showWordset)// no authorizaiton, the show is available to all users.
router.post('/', User.controller.auth, wordsetCtrl.createWordset)
router.put('/:id', User.controller.auth, wordsetCtrl.updateWordset)
router.delete('/:id', User.controller.auth, wordsetCtrl.deleteWordset)
router.post('/:wordsetId/words/:wordId', User.controller.auth, wordsetCtrl.addWord)
router.post('/:wordsetId/labels/:labelId', User.controller.auth, wordsetCtrl.addLabel) 

module.exports = new Wordset(WordsetModel, wordsetCtrl, router)