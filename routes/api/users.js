const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require('../../config/keys')


//load input validation
const validateRegisterInput =  require("../../validation/register")
const validateLoginInput = require("../../validation/login")

//load in the user model

const User = require("../../models/User")

router.post("/register", (req,res) => {
  //Form Validation

  const {errors, isValid} = validateRegisterInput(req.body);

  //check validation

  if(!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({email:req.body.email}).then(user => {
    if(user) {
      return res.status(400).json({email:"Email in use"})
    }

  const newUser = new User ({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  })
  //Hash password
  bcrypt.genSalt(10, (err,salt) => {
    bcrypt.hash(newUser.password,salt,(err,hash) => {
      if (err) throw err
      newUser.password = hash;
      newUser
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err))
    })
  })
  })
})

router.post("/login",(req,res) => {
  //Form Validation

  const {errors, isValid} = validateLoginInput(req.body)

  //check Validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const {email,password} = req.body

  //find user by email
  User.findOne({email}).then(user => {
    //check if user exists
    if(!user){
      return res.status(404).json({emailnotfound:"Email not found"})
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch){
        //User matched and create payload
        const payload = {
          id:user.id,
          name:user.name
        }
        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn:31556926 //1 year
          },
          (err,token) => {
            res.json({
              success:true,
              token:"Bearer " + token
            })
          }
        )
      } else {
        return res.status(400).json({passwordincorrect:"Password Incorrect"})
      }
    })
  })
})

module.exports = router