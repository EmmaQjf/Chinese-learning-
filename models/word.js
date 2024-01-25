const mongoose = require('mongoose')
const wordSchema = new mongoose.Schema({
    pinyin: {type: String, required: true}, 
    hanzi: {type: String, required: true, unique: true}, // unique: true so the same word will not be created
    meaning: {type: String, required:true},
    level: {type: Number},
    topic: {type: String, required:true},
    wordsets:[{type: mongoose.Schema.Types.ObjectId, ref:'Wordset'}]
},{timestamps:true}
)

const Word = mongoose.model('Word', wordSchema)

module.exports = Word