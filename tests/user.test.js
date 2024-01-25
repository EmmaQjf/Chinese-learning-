
const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
const User = require('../models/user')
const { getMaxListeners } = require('../models/wordset')


let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async() => {
    mongoose.connection.close()
    mongoServer.stop()
    server.close()
})
/*
router.post('/', userCtrl.createUser)  //tested
router.post('/login', userCtrl.loginUser) //tested
router.put('/:id', userCtrl.auth, userCtrl.updateUser) //tested
router.delete('/:id', userCtrl.auth, userCtrl.deleteUser) //tested
router.get('/:id',userCtrl.auth, userCtrl.showUser) //tested
router.get('/', userCtrl.auth, userCtrl.indexUser) // tested
*/

describe('testing the user endpoints', () => {
    test('It should create a new user', async() => {
        const response = await request(app)
        .post('/users')
        .send({username: "Emma", email: "emma@gmail.com",password: "123456"})

        expect(response.statusCode).toBe(200)
        expect(response.body.user.username).toEqual('Emma')
        expect(response.body.user.email).toEqual('emma@gmail.com')

    })
})
