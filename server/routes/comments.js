const routes = require('express').Router()
const { getAllComment, addComment, deleteComment } = require('../controllers/comment.controllers')
const { isLogin, isAdmin, isUser } = require('../middlewares/authentication')

routes
  .get('/', getAllComment)
  .post('/', isLogin, addComment)
  .delete('/:id', isLogin, deleteComment)
  
module.exports = routes