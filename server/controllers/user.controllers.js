const mongoose = require('mongoose')
const user = require('../models/user.models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  signUp: (req, res) => {
    let {
      email, 
      password
    } = req.body
    let hashed = bcrypt.hashSync(password, bcrypt.genSaltSync())
    password = hashed
    let newUser = new user({  
      email, 
      password
    })
    newUser
      .save((err, result) => {
      if(err) {
        res
          .status(400)
          .json({
            message: err
          })
      } else {
        res
          .status(201)
          .json({
            message: 'sign up success',
            newData: result
          })
      }
    })
  },
  signIn: (req, res) => {
    // console.log("========>", process.env)
    const SECRET = process.env.SECRET
    const { email, password } = req.body
    user
      .findOne({
        email: email
      }, (err, userLogin) => {
        if (err) {
          res
            .status(500)
            .send({
              message: err
            })
        } else {
          if (bcrypt.compareSync(password, userLogin.password)) {          
            let token = jwt.sign({
                        userId: userLogin.id,
                        userEmail: userLogin.email
                    }, process.env.SECRET)
            res
              .status(200)
              .send({
                message: 'login success',
                nowLogin: userLogin,
                token
              })
          }
        }
      })
  }
}