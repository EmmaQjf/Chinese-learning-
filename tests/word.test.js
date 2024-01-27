const mongoose = require('mongoose')
const request = require('supertest')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8082, () => console.log('listening at the port 8082'))
const User = require('../models/user')
// const word = require('../models/word')
// const Test = require('supertest/lib/test')
const Word = require('../models/word')

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
router.get('/', wordCtrl.indexWords) // the word list available to all users
router.get('/:id', wordCtrl.showWord) // the specific word info is avaiable to all users
router.post('/', userCtrl.auth, wordCtrl.createWord)
router.put('/:id', userCtrl.auth, wordCtrl.updateWord)
router.delete('/:id', userCtrl.auth, wordCtrl.deleteWord)
router.get('/level/:number',wordCtrl.indexLevelNum)
router.get('/topic/:theme',wordCtrl.indexTopic)
*/


describe('testing on word endpoints', () => {
    test('it should show all the words', async() => {
        const word1 = await Word.create({pinyin:"ni", hanzi:"你", meaning: "you", level: 1, topic: "pronoun"})
        const word2 = await Word.create({pinyin:"she", hanzi:"蛇", meaning: "snake", level: 2, topic: "animal"})
        const word3 = await Word.create({pinyin:"xiong mao", hanzi:"熊猫", meaning: "panda", level: 2, topic: "animal"})
        const word4 = await Word.create({pinyin:"da xiang", hanzi:"大象", meaning: "elapant", level: 2, topic: "animal"})

        const response = await request(app).get('/words')
        expect(response.statusCode).toBe(200)
        for (let i = 0; i < response.length; i++){
            expect(response.body[i]).toHaveProperty('pinyin')
            expect(response.body[i]).toHaveProperty('hanzi')
            expect(response.body[i]).toHaveProperty('meaning')
        }
    })

    test('it should show a word', async() => {
        const word = await Word.create({pinyin:"lao ying", hanzi:"老鹰", meaning: "eagle", level: 3, topic: 'animal'})
        const response = await request(app).get(`/words/${word._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.pinyin).toEqual('lao ying')
    })

    test('it should create a word', async() => {
        const user1 = new User({username: "Emma", email: "emma@gmail.com", password: "123456"})
        await user1.save()
        const token = await user1.generateAuthToken()
        const response = await request(app)
        .post('/words')
        .set('Authorization',`Bearer ${token}`)
        .send({pinyin:"tu zi", hanzi:"兔子", meaning: "rabbit", level: 2, topic: "animal"})

        expect(response.statusCode).toBe(200)
        expect(response.body.pinyin).toEqual('tu zi')
    })

    test('it should update a word', async() => {
        const user1 = new User({username: "Emma", email: "emma@gmail.com", password: "123456"})
        await user1.save()
        const token = await user1.generateAuthToken()
        const word = await Word.create({pinyin:"ta", hanzi:"她", meaning: "she", level: 1, topic: "animal"})
        const response = await request(app)
        .put(`/words/${word._id}`)
        .set('Authorization',`Bearer ${token}`)
        .send({pinyin:"ta", hanzi:"她", meaning: "she/her", level: 1, topic: "pronoun"})

        expect(response.statusCode).toBe(200)
        expect(response.body.pinyin).toEqual('ta')
    })


    test('it should delete a word', async() => {
        const user1 = new User({username: "Emma", email: "emma@gmail.com", password: "123456"})
        await user1.save()
        const token = await user1.generateAuthToken()
        const word = await Word.create({pinyin:"ta", hanzi:"他", meaning: "he", level: 1, topic: "pronoun"})
        const response = await request(app)
        .delete(`/words/${word._id}`)
        .set('Authorization',`Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toEqual('The word is deleted')
    })

    //router.get('/level/:number',wordCtrl.indexLevelNum)
    //router.get('/topic/:theme',wordCtrl.indexTopic)

    test('it should show all the word with a specific level', async() => {
        // const word1 = await Word.create({pinyin:"jiu dian", hanzi:"酒店", meaning: "hotel", level: 2, topic: "store"})
        // const word2 = await Word.create({pinyin:"chao shi", hanzi:"超市", meaning: "supermarket", level: 2, topic: "store"})
        // const word3 = await Word.create({pinyin:"xi yi fang", hanzi:"洗衣房", meaning: "laundrymat", level: 1, topic: "store"})

        const response = await request(app).get('/words/level/2')
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(4)
        expect(Array.isArray(response.body)).toBeTruthy() // use response.body instead of response
    })

    test('it should show all the word with a specific topic', async() => {
        // const word1 = await Word.create({pinyin:"pu tao", hanzi:"葡萄", meaning: "grape", level: 2, topic: "fruit"})
        // const word2 = await Word.create({pinyin:"li", hanzi:"梨", meaning: "pear", level: 2, topic: "fruit"})
        // const word3 = await Word.create({pinyin:"tao", hanzi:"桃", meaning: "peach", level: 1, topic: "fruit"})
        // const word4 = await Word.create({pinyin:"zu qiu", hanzi:"足球", meaning: "soccer", level: 1, topic: "sports"})

        const response = await request(app).get('/words/topic/animal')
        expect(response.statusCode).toBe(200) 
        expect(Array.isArray(response.body)).toBeTruthy() // use response.body instead of response
        expect(response.body.length).toBe(5) // make sure you use response.body.length instead of response.length
    })
})

