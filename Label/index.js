const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const User = require('../User')

class Label {
    constructor(Model, controller, router){
        this.Model = Model,
        this.controller = controller,
        this.router = router
    }
}


const labelSchema = new mongoose.Schema({
    labelPhrase: {type: String, required: true, unique: true},
    user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    wordsets:[{type: mongoose.Schema.Types.ObjectId, ref:'Wordset'}]
})

const LabelModel = mongoose.model('LabelModel', labelSchema)

const labelCtrl = {
    async createLabel(req, res){
        try {
           req.body.user = req.user._id
           const newLabel = await LabelModel.create(req.body)
           res.json(newLabel)
        } catch(error) {
            res.status(400).json({msg: error.message})
        }
    },
    
    async showLabel(req, res){
        try {
            const foundLabel = await LabelModel.findOne({_id: req.params.id})
            res.json(foundLabel)
        } catch(error) {
            res.status(400).json({msg: error.message})
        }
    },
    
    async updateLabel(req, res){
        try {
            const foundLabel = await LabelModel.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
            res.json(foundLabel)
        } catch(error) {
            res.status(400).json({msg: error.message})
        }
    },
    
    async deleteLabel(req, res){
        try {
            const foundLabel = await LabelModel.findOneAndDelete({_id: req.params.id}, req.body, {new:true})
            res.json({msg:'the label is deleted'})
        } catch(error) {
            res.status(400).json({msg: error.message})
        }
    }

}

router.post('/', User.controller.auth, labelCtrl.createLabel)
router.get('/:id', labelCtrl.showLabel)
router.put('/:id',User.controller.auth, labelCtrl.updateLabel)
router.delete('/:id', User.controller.auth, labelCtrl.deleteLabel)

module.exports = new Label(LabelModel, labelCtrl, router)