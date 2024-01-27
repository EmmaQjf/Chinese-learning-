const mongoose = require('mongoose')

const labelSchema = new mongoose.Schema({
    labelPhrase: {type: String, required: true, unique: true},
    user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    wordsets:[{type: mongoose.Schema.Types.ObjectId, ref:'Wordset'}]
})

const Label = mongoose.model('Label', labelSchema)

module.exports = Label