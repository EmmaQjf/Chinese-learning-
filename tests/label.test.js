const app = require('../app')
const {MongoMemoryServer} = require('mongodb-memory-server')
const mongoose = require('mongoose')
const server = app.listen(8084, () => console.log('listening at the port 8084'))
const request = require('supertest')
const Label = require('../models/label')
const User = require('../models/user')

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

/*
router.post('/', userCtrl.auth, labelCtrl.createLabel)
router.get('/:id', userCtrl.auth, labelCtrl.showLabel)
router.put('/:id', userCtrl.auth, labelCtrl.updateLabel)
router.delete('/:id', userCtrl.auth, labelCtrl.deleteLabel)
*/

describe('testing the label endpoints', () => {
    test('it should create a label ', async() => {
        const user = new User({username:'Emily', email: 'emaily@gmail.com', password: 'emily'})
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
        .post('/labels')
        .set('Authorization', `Bearer ${token}`)
        .send({labelPhrase:'clothes'})

        expect(response.statusCode).toBe(200)
        expect(response.body.labelPhrase).toEqual('clothes')
        expect(response.body.user).toEqual(`${user._id}`)



    })
})

