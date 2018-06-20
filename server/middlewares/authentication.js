const jwt = require('jsonwebtoken');
const users = require('../models/user.models');
const bcrypt = require('bcryptjs');
require('dotenv').config()

module.exports = {
  isLogin(req, res, next){
    let token = req.headers.token
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (token){
        users
          .findOne({
            _id: decoded.userId 
          })
          .then(users => {
            if (!users){
              res
                .status(401)
                .json({
                  message: "You need to Login"
                })
            } else {
              req.headers.decoded = decoded
              next()
            }
          })
          .catch(err =>{
            res
              .status(500)
              .json({
                message: err
              })
          })
      } else {
        res
          .status(403)
          .json({
            message: "You need to Login"
          })
      }
    });
  },
  isAdmin(req, res, next) {
    let token = req.headers.token;
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if(token) {
        users.findOne({_id: decoded.userId })
            .then(users => {
              if(!users){
                res
                  .status(401)
                  .json({
                    message: "You are not authorized"
                  })
              } else if (users.role == 'admin') {
                req.headers.decoded = users
                next()
              } else {
                res
                  .status(401)
                  .json({
                    message: "You are not authorized"
                  })
              }
            })
            .catch(err =>{
              res
                .status(500)
                .json({
                  message: err
                })
            })
      } else {
        res
          .status(403)
          .json({
            message: "You are not authorized"
          })
      }
    })
  },
  isUser(req, res, next) {
    let token = req.headers.token;
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if(token) {
        users.findOne({_id: decoded.userId })
            .then(users => {
              // console.log(users);
              if(!users){
                res
                  .status(401)
                  .json({
                    message: "You are not authorized"
                  })
              } else if (users.userRole == 'user') {
                next()
              } else {
                res
                  .status(401)
                  .json({
                    message: "You are not authorized"
                  })
              }
            })
            .catch(err =>{
              res
                .status(500)
                .json({
                  message: err
                })
            })
      } else {
        res
          .status(403)
          .json({
            message: "You are not authorized"
          })
      }
    })
  }
}