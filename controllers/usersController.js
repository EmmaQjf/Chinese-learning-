require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/*
router.post('/', userCtrl.createUser)  //tested
router.post('/login', userCtrl.loginUser) //tested
router.put('/:id', userCtrl.auth, userCtrl.updateUser) //tested
router.delete('/:id', userCtrl.auth, userCtrl.deleteUser) //tested
router.get('/:id',userCtrl.auth, userCtrl.showUser) //tested
router.get('/', userCtrl.auth, userCtrl.indexUser) // tested

router.post('/', userCtrl.createUser) 
router.get('/', userCtrl.indexUser)
router.post('/login', userCtrl.loginUser)
router.get('/:id',userCtrl.auth, userCtrl.showUser) 
router.put('/:id', userCtrl.auth, userCtrl.updateUser)
router.delete('/:id', userCtrl.auth, userCtrl.deleteUser)
*/
exports.auth = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '')
      const data = jwt.verify(token, process.env.SECRET)
      const user = await User.findOne({ _id: data._id })
      if (!user) {
        throw new Error()
      }
      req.user = user
      next()
    } catch (error) {
      res.status(401).send('Not authorized')
    }
  }
// exports.auth = async (req, res, next) => {
//     try{
//         const token = req.header('Authorization').replace('Bearer', '') //get the token of the user
//         const data = jwt.verify(token, process.env.SECRET) // get the payload of the user
//         const user = await User.findOne({ _id: data._id }) //whethere they can find the user based on the request _id
//         if(!user) {
//             throw new Error('bad credential')
//         } 
//         req.user = user //???
//         next()
//     } catch(error) {
//        res.status(401).json({message: error.message})
//     }
// }

exports.createUser = async function createUser(req, res) {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({user, token})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
}

exports.loginUser = async function loginUser(req, res) {
     try {
        const user = await User.findOne({email: req.body.email})
        // review here
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            res.status(400).send('Invalid login credentials')
         } else {
           const token = await user.generateAuthToken()
           res.json({user, token})
         }
     } catch (error) {
        res.status(400).json({message: error.message})
     }    
}


exports.updateUser = async(req, res) => {
    try {
        //review
        const updates = Object.keys(req.body)
        updates.forEach(update => 
            req.user[update] = req.body[update])
        await req.user.save() 
        // const token = await req.user.generateAuthToken() // only login and create needs to generate token 
        // const updatedUser = req.user
        // res.json({updatedUser,token})
        res.json(req.user)
    } catch (error) {
        res.status(400).json({message: error.message})   
    }
}

exports.deleteUser = async function deleteUser(req, res) {
    try {
        await req.user.deleteOne()
        res.send({message: 'deleted the user'});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.showUser = async(req, res) => {
    try {
        // const user = await User.findOne({_id: req.user._id})
        res.send(req.user);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


exports.indexUser= async(req, res) => {
    try {
        const foundusers = await User.find({})
        res.send(foundusers);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}