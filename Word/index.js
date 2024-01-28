const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const User = require('../User')


class Word {
    constructor(WordModel, controller, router){
        this.WordModel = WordModel,
        this.controller = controller,
        this.router = router
    }
}

const wordSchema = new mongoose.Schema({
    pinyin: {type: String, required: true}, 
    hanzi: {type: String, required: true, unique: true}, // unique: true so the same word will not be created
    meaning: {type: String, required:true},
    level: {type: Number},
    topic: {type: String, required:true},
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User' },
    wordsets:[{type: mongoose.Schema.Types.ObjectId, ref:'Wordset'}]
},{timestamps:true}
)

const WordModel = mongoose.model('WordModel', wordSchema)

const controller = {
    async indexWords (req, res) {
        try {
            const words = await WordModel.find({})
            res.json(words)
        } catch (error) {
            res.status(400).json({message: error.message})
        }  
    },
    
    async createWord(req, res){
        try {
            req.body.user = req.user._id // review it added the user property for all the word created 
            const word = await WordModel.create(req.body)
            res.json(word)
        } catch (error) {
            res.status(400).json({message: error.message})
        }  
    },
    
    async updateWord(req, res){
        try {
            const word = await WordModel.findOneAndUpdate({_id:req.params.id}, req.body, {new: true})
            res.json(word)
        } catch (error) {
            res.status(400).json({message: error.message})
        }  
    },
    
    async showWord(req, res){
        try {
            const word = await WordModel.findOne({_id: req.params.id})
            res.json(word)
        } catch (error) {
            res.status(400).json({message: error.message})
        }  
    },
    
    async deleteWord(req, res){
        try {
            const foundWord = await WordModel.findOneAndDelete({_id: req.params.id})
            // res.status(200).json({msg: `The word ${foundWord} is deleted`})
            res.status(200).json({msg: 'The word is deleted'})
        } catch (error) {
            res.status(400).json({message: error.message})
        }  
    },
    
    async indexLevelNum(req, res){
        try {
            const foundWords = await WordModel.find({level: req.params.number})
            res.status(200).json(foundWords)
        } catch (error) {
            res.status(400).json({message: error.message})
        }  
    },
    
    
    async indexTopic(req, res){
        try {
            const foundWords = await WordModel.find({topic: req.params.theme})
            res.status(200).json(foundWords)
        } catch (error) {
            res.status(400).json({message: error.message})
        }  
    } 
}

router.get('/', controller.indexWords) // the word list available to all users
router.get('/:id', controller.showWord) // the specific word info is avaiable to all users
router.post('/', User.controller.auth, controller.createWord)
router.put('/:id', User.controller.auth, controller.updateWord)
router.delete('/:id', User.controller.auth, controller.deleteWord)
router.get('/level/:number',controller.indexLevelNum)
router.get('/topic/:theme',controller.indexTopic)


module.exports = new Word(WordModel, controller, router)