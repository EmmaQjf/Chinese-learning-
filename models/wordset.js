
const mongoose = require('mongoose')
const wordsetSchema = new mongoose.Schema({
    title: {type: String, required:true},
    level: String,
    words: [{type: mongoose.Schema.Types.ObjectId, required:true, ref:'Word'}],
    user:{type: mongoose.Schema.Types.ObjectId, required:true, ref:'User'}
},{timestamps:true}
)

const Wordset = mongoose.model('Wordset', wordsetSchema)
module.exports = Wordset