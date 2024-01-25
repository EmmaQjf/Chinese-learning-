const mongoose = require('mongoose')
const wordsetSchema = new mongoose.Schema({
    title: {type: String, required:true},
    level: {type: Number},
    words: [{type: mongoose.Schema.Types.ObjectId, ref:'Word'}],
    user:{type: mongoose.Schema.Types.ObjectId, ref:'User'}
},{timestamps:true}
)

const Wordset = mongoose.model('Wordset', wordsetSchema)
module.exports = Wordset