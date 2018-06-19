const routes = require('express').Router()
const { signIn, signUp } = require('../controllers/user.controllers')

routes
  .post('/signin', signIn)
  .post('/signup', signUp)

module.exports = routes