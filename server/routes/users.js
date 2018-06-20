const routes = require('express').Router()
const { signIn, signUp, signInFb } = require('../controllers/user.controllers')

routes
  .post('/signin', signIn)
  .post('/signup', signUp)
  .get('/signinfb', signInFb)

module.exports = routes