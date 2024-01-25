const express = require('express')
const userRoute = require('./routes/userRoute')
const wordsetRoute = require('./routes/wordsetRoute')
const wordRoute = require('./routes/wordRoute')
const app = express()
const morgan = require('morgan')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('combined'))
app.use('/users', userRoute)
app.use('/wordsets', wordsetRoute)
app.use('/words', wordRoute)


module.exports = app