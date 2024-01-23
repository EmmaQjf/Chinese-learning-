const mongoose = require('mongoose')
const wordSchema = new mongoose.Schema({
    pinyin: {type: String, required: true},
    hanzi: {type: String, required: true},
    meaning: {type: String, required:true},
    level: Boolean,
    topic: {type: String, required:true},
    wordsets:[{type: mongoose.Schema.Types.ObjectId, ref:'Wordset'}]
},{timestamps:true}
)

const Word = mongoose.model('Word', wordSchema)

module.exports = Word