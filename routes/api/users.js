const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jwt")
const keys = require('../../config/keys')

//load input validation
const validateRegisterInput =  require("../../validation/register")
const validateLoginInput = require("../../validation/login")

//load in the user model

const User = require("../../models/User")

//now create the register user api
router.post("/api/register", (req,res) => {
  //first, form validation
   const {errors, isValid} = validateRegisterInput(req.body)

  if(isValid){
    return res.status(400).json(errors)
  }
  User.findOne({email:req.body.email})
  .then(user => {
    if(user){
      return res.status(400).json({email:"Email already in use"})
    }
  })
})