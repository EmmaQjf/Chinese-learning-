require('dotenv').config()
const express = require('express')
// const userRoute = require('./routes/userRoute')
const User = require('./User')
const Word = require('./Word')
const Wordset = require('./Wordset')
const Label = require('./Label')
//const wordsetRoute = require('./routes/wordsetRoute')
//const wordRoute = require('./routes/wordRoute')
//const labelRoute = require('./routes/labelRoute')
const app = express()
const morgan = require('morgan')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('combined'))
app.use('/users', User.router)
app.use('/wordsets', Wordset.router)
app.use('/words', Word.router)
app.use('/labels', Label.router)


module.exports = app