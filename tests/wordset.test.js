const mongoose = require('mongoose')
const request = require('supertest')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8081, () => console.log('listening at the PORT 8081'))
const {UserModel} = require('../User')
const {WordsetModel} = require('../Wordset')
const {WordModel} = require('../Word')


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

    test('It should add the wordset to the word document and vice verse', async() => {
        const user1 = new UserModel({username: "Emma", email: "emma@gmail.com",password: "123456"})
        await user1.save()
        const token = await user1.generateAuthToken()  // generate a token

        const wordset = await WordsetModel.create({title:"set11", level: 2})
        const word = await WordModel.create({pinyin:"jiu dian", hanzi:"酒店", meaning: "hotel", level: 2, topic: "store"})

        const response = await request(app)
        .post(`/wordsets/${wordset._id}/words/${word._id}`)
        .set('Authorization',`Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('wordset')
        expect(response.body).toHaveProperty('word')
        expect(response.body).toHaveProperty('msg')

    })
    test('it should show all the wordsets', async() => {
        const wordset1 = await WordsetModel.create({title: "set1", level: 1})
        const wordset2 = await WordsetModel.create({title: "set2", level: 2})
        const wordset3 = await WordsetModel.create({title: "set3", level: 3})

        const response = await request(app).get('/wordsets')
        expect(response.statusCode).toBe(200)
        for (let i = 0; i < response.length; i++) {
            expect(response[i]).toHaveProperty('title')
            expect(response[i]).toHaveProperty('level')
        }
    })

    test ('it should show a wordset', async() => {
        const wordset1 = await WordsetModel.create({title: "set1", level: 1})
        const response = await request(app).get(`/wordsets/${wordset1._id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('set1')
        expect(response.body.level).toEqual(1)

    })

    test('it should create a wordset', async() => {
        const user1 = new UserModel({username: "Emma", email: "emma@gmail.com",password: "123456"})
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
        const user1 = new UserModel({username: "Emma", email: "emma@gmail.com",password: "123456"})
        await user1.save()
        const token = await user1.generateAuthToken()  // generate a token

        const wordset1 = await WordsetModel.create({title: "set1", level: 1})

        const response = await request(app)
        .put(`/wordsets/${wordset1._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({title: "set2", level: 2})
        
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('set2')
        expect(response.body.level).toEqual(2)
    })

    test('it should delete a wordset', async() => {
        const user1 = new UserModel({username: "Emma", email: "emma@gmail.com",password: "123456"})
        await user1.save()
        const token = await user1.generateAuthToken()  // generate a token

        const wordset1 = await WordsetModel.create({title: "set1", level: 1})
        const response = await request(app)
        .delete(`/wordsets/${wordset1._id}`)
        .set('Authorization', `Bearer ${token}`)
    
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toEqual( "The wordset is deleted")
    })


    // add the label to the wordset
    // test('It should add the label to the wordsets and add wordset to the lable', async() => {
    //     const user1 = new UserModel({username: "Emma", email: "emma@gmail.com",password: "123456"})
    //     await user1.save()
    //     const token = await user1.generateAuthToken() 

    //     const wordset = await WordsetModel.create({title: "test", level: 2})
    //     const label = await LabelModel.create({labelPhrase: 'family'})

    //     const response = await request(app)
    //     .post(`/wordsets/${wordset._id}/labels/${label._id}`)
    //     .set('Authorization', `Bearer ${token}`)

    //     expect(response.statusCode).toBe(200)
    //     expect(response.body).toHaveProperty('wordset')
    //     expect(response.body).toHaveProperty('label')
    //     expect(response.body).toHaveProperty('msg')
    // })
})