const User = require('../models/user')
const Label = require('../models/label')
/*
router.post('/', userCtrl.auth, labelCtrl.createLabel) //tested with postman
router.get('/:id', userCtrl.auth, labelCtrl.showLabel)  //tested with postman
router.put('/:id', userCtrl.auth, labelCtrl.updateLabel) //tested with postman
router.delete('/:id', userCtrl.auth, labelCtrl.deleteLabel)  //tested with postman
*/

exports.createLabel = async(req, res) => {
    try {
       req.body.user = req.user._id
       const newLabel = await Label.create(req.body)
       res.json(newLabel)
    } catch(error) {
        res.status(400).json({msg: error.message})
    }
}

exports.showLabel = async(req, res) => {
    try {
        const foundLabel = await Label.findOne({_id: req.params.id})
        res.json(foundLabel)
    } catch(error) {
        res.status(400).json({msg: error.message})
    }
}

exports.updateLabel = async(req, res) => {
    try {
        const foundLabel = await Label.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        res.json(foundLabel)
    } catch(error) {
        res.status(400).json({msg: error.message})
    }
}

exports.deleteLabel = async(req, res) => {
    try {
        const foundLabel = await Label.findOneAndDelete({_id: req.params.id}, req.body, {new:true})
        res.json({msg:'the label is deleted'})
    } catch(error) {
        res.status(400).json({msg: error.message})
    }
}