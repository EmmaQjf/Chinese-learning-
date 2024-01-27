const express = require('express')
const userRoute = require('./routes/userRoute')
const wordsetRoute = require('./routes/wordsetRoute')
const wordRoute = require('./routes/wordRoute')
const labelRoute = require('./routes/labelRoute')
const app = express()
const morgan = require('morgan')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('combined'))
app.use('/users', userRoute)
app.use('/wordsets', wordsetRoute)
app.use('/words', wordRoute)
app.use('/labels', labelRoute)


module.exports = app