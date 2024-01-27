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

    test('it should show a label', async() => {
        const label = await Label.create({labelPhrase:'beverage'})

        const response = await request(app).get(`/labels/${label._id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.labelPhrase).toEqual('beverage')
    })

    test('it should update a label', async() => {
        const user = new User({username:'Emily', email: 'emaily@gmail.com', password: 'emily'})
        await user.save()
        const token = await user.generateAuthToken()
        const label = await Label.create({labelPhrase:'classes'})
        const response = await request(app)
        .put(`/labels/${label._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({labelPhrase: 'class'})

        expect(response.statusCode).toBe(200)
        expect(response.body.labelPhrase).toEqual('class')
        // expect(response.body.user).toEqual(`${user._id}`)
    })

    test ('it should delete a label', async() => {
        const user = new User({username:'Emily', email: 'emaily@gmail.com', password: 'emily'})
        await user.save()
        const token = await user.generateAuthToken()
        const label = await Label.create({labelPhrase:'identity'})

        const response = await request(app)
        .delete(`/labels/${label._id}`)
        .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toEqual('the label is deleted')
    })
})

