const mongoose = require('mongoose')
const request = require('supertest')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8082, () => console.log('listening at the port 8082'))
const User = require('../models/user')
const word = require('../models/word')

let mongoServer

beforeAll(async() => {
   mongoServer = await MongoMemoryServer.create()
   await mongoose.connect(mongoServer.getUri())
})

afterAll(async() => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})




