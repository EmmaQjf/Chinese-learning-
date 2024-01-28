const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class User {
    constructor(UserModel, controller, router){
        this.UserModel = UserModel,
        this.controller = controller,
        this.router = router
    }
}

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required:true},
    wordsets:[ {type: mongoose.Schema.Types.ObjectId, ref:'Wordset'}]
},{timestamps:true}
)

userSchema.pre('save', async function(next) {
    this.isModified('password')?
    this.password = await bcrypt.hash(this.password, 8):
    null;
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const token = await jwt.sign({_id: this._id}, process.env.SECRET)
    return token
}

const UserModel = mongoose.model('UserModel', userSchema)


const userController = {
    async auth(req, res, next) {
        try {
          const token = req.header('Authorization').replace('Bearer ', '')
          const data = jwt.verify(token, process.env.SECRET)
          const user = await UserModel.findOne({ _id: data._id })
          if (!user) {
            throw new Error()
          }
          req.user = user
          next()
        } catch (error) {
          res.status(401).send('Not authorized')
        }
      },
    
    async createUser(req, res) {
        try {
            const user = new UserModel(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.json({user, token})
        } catch (error) {
            res.status(400).json({message: error.message})
        } 
    },
    
    async loginUser(req, res) {
         try {
            const user = await UserModel.findOne({email: req.body.email})
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
    },
    
    
    async updateUser(req, res) {
        try {
            //review
            const updates = Object.keys(req.body)
            updates.forEach(update => 
                req.user[update] = req.body[update])
            await req.user.save() 
            res.json(req.user)
        } catch (error) {
            res.status(400).json({message: error.message})   
        }
    },
    
     async deleteUser(req, res) {
        try {
            await req.user.deleteOne()
            res.send({message: 'deleted the user'});
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    
    async showUser(req, res){
        try {
            // const user = await User.findOne({_id: req.user._id})
            res.send(req.user);
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    
    
    async indexUser(req, res){
        try {
            const foundusers = await UserModel.find({})
            res.send(foundusers);
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }

}

router.post('/signup', userController.createUser) 
router.get('/', userController.indexUser)
router.post('/login', userController.loginUser)
router.get('/:id',userController.auth,userController.showUser) 
router.put('/:id', userController.auth, userController.updateUser)
router.delete('/:id',userController.auth,userController.deleteUser)


module.exports = new User(UserModel, userController, router)