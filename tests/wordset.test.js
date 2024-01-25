const mongoose = require('mongoose')
const request = require('supertest')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8081, () => console.log('listening at the PORT 8081'))
const Wordset = require('../models/wordset')
const User = require('../models/user')
const Word = require('../models/word')


let mongoServer 

beforeAll(async()=> {
    mongoServer = await MongoMemoryServer.create() // await  create
    await mongoose.connect(mongoServer.getUri())  //await 
})


afterAll(async() => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

/*
router.get('/', wordsetCtrl.indexWordsets) // no authorizaiton, the index is available to all users.
router.get('/:id', wordsetCtrl.showWordset)// no authorizaiton, the show is available to all users.
router.post('/', userCtrl.auth, wordsetCtrl.createWordset)
router.put('/:id', userCtrl.auth, wordsetCtrl.updateWordset)
router.delete('/:id', userCtrl.auth, wordsetCtrl.deleteWordset)
router.post('/:wordsetId/words/:wordId', userCtrl.auth, wordsetCtrl.addWord)
*/

describe('Test the wordset endpoints', () => {
    test('it should show all the wordsets', async() => {
        const wordset1 = await Wordset.create({title: "set1", level: 1})
        const wordset2 = await Wordset.create({title: "set2", level: 2})
        const wordset3 = await Wordset.create({title: "set3", level: 3})

        const response = await request(app).get('/wordsets')
        expect(response.statusCode).toBe(200)
        for (let i = 0; i < response.length; i++) {
            expect(response[i]).toHaveProperty('title')
            expect(response[i]).toHaveProperty('level')
        }
    })

    test ('it should show a wordset', async() => {
        const wordset1 = await Wordset.create({title: "set1", level: 1})
        const response = await request(app).get(`/wordsets/${wordset1._id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('set1')
        expect(response.body.level).toEqual(1)

    })

    test('it should create a wordset', async() => {
        const user1 = new User({username: "Emma", email: "emma@gmail.com",password: "123456"})
        await user1.save()
        const token = await user1.generateAuthToken()  // generate a token

        const response = await request(app)
        .post('/wordsets')
        .set('Authorization', `Bearer ${token}`)
        .send({title: "set1", level: 1})
        
        expect(response.statusCode).toBe(200)
        expect(response.body.wordset.title).toEqual('set1')
        expect(response.body.wordset.level).toEqual(1)
    })

    test('it should update a wordset', async() => {
        const user1 = new User({username: "Emma", email: "emma@gmail.com",password: "123456"})
        await user1.save()
        const token = await user1.generateAuthToken()  // generate a token

        const wordset1 = await Wordset.create({title: "set1", level: 1})

        const response = await request(app)
        .put(`/wordsets/${wordset1._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({title: "set2", level: 2})
        
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('set2')
        expect(response.body.level).toEqual(2)
    })

    test('it should delete a wordset', async() => {
        const user1 = new User({username: "Emma", email: "emma@gmail.com",password: "123456"})
        await user1.save()
        const token = await user1.generateAuthToken()  // generate a token

        const wordset1 = await Wordset.create({title: "set1", level: 1})
        const response = await request(app)
        .delete(`/wordsets/${wordset1._id}`)
        .set('Authorization', `Bearer ${token}`)
    
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toEqual( "The wordset is deleted")
    })
})