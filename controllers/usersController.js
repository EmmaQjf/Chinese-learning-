require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/*
router.post('/', userCtrl.createUser) 
router.post('/login', userCtrl.loginUser)
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
// exports.auth = async(req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')
//         const data = jwt.verify(token,process.env.SECRET)
//         const user = await User.findOne({_id: data._id})
//         if (!user) {
//             throw new Error('bad credential')
//         }
//         req.user = user
//         next()
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// }

exports.updateUser = async(req, res) => {
    try {
        //review
        const updates = Object.keys(req.body)
        updates.forEach(update => 
            req.user[update] = req.body[update])
        await req.user.save() 
        const token = await req.user.generateAuthToken()
        const savedUser = req.user
        res.json({savedUser,token})
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


