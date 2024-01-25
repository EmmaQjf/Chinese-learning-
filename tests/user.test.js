
const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
const User = require('../models/user')



let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async() => {
   await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})
/*
router.post('/', userCtrl.createUser)  //tested
router.post('/login', userCtrl.loginUser) //tested
router.put('/:id', userCtrl.auth, userCtrl.updateUser) //tested
router.delete('/:id', userCtrl.auth, userCtrl.deleteUser)
router.get('/:id',userCtrl.auth, userCtrl.showUser) 
router.get('/', userCtrl.indexUser)
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

    test('It should login a user', async() => {
        const user1 = new User({username: "Emma", email: "emma@gmail.com",password: "123456"})
        await user1.save()
        const response = await request(app)
        .post('/users/login')
        .send({email: "emma@gmail.com",password: "123456"})
        

        expect(response.statusCode).toBe(200)
        expect(response.body.user.username).toEqual('Emma') // check the reponse.body.user.
        expect(response.body.user.email).toEqual('emma@gmail.com')

    })

    
    test('it should update a user', async() => {
        const user1 = new User({username: "Emma", email: "emma@gmail.com",password: "123456"})
        await user1.save()
        const token = await user1.generateAuthToken() // add await
        const response = await request(app)
        .put(`/users/${user1._id}`)
        .set('Authorization', `Bearer ${token}`) //review this part
        .send({username: "Emma",email: "emmaqiao@gmail.com",password: "1234567"})
        
        expect(response.statusCode).toBe(200)
        expect(response.body.updatedUser.username).toEqual('Emma')
        expect(response.body.updatedUser.email).toEqual('emmaqiao@gmail.com')

    })

    test('it should delete a user' , async() => {
        const user1 = new User({username: "Emma", email: "emma@gmail.com",password: "123456"})
        await user1.save()
        const token = await user1.generateAuthToken()
        const response = await request(app)
        .delete(`/users/${user1._id}`)     // why run the delete then send in the token, why not the opposite
        .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('deleted the user')
    })

    test('it should show the user', async () => {
        const user1 = new User({username: "Emma", email: "emma@gmail.com",password: "123456"})
        await user1.save()
        const token = await user1.generateAuthToken()
        const response = await request(app)
        .get(`/users/${user1._id}`)
        .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.username).toEqual('Emma')
        expect(response.body.email).toEqual('emma@gmail.com')
    })

    test('it should show all the users', async() => {
        const user1 = new User({username: "Emma", email: "emma@gmail.com",password: "123456"})
        await user1.save()
        const user2 = new User({username: "John", email: "john@gmail.com",password: "123456"})
        await user2.save()
        
        const response = await request(app).get('/users')

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy() // use response.body instead of response
        for(let i = 0; i < response.length; i++){
            expect(response[i]).toHaveProperty('username')
            expect(response[i]).toHaveProperty('email')
            expect(response[i]).toHaveProperty('password')
        }
    })

})
