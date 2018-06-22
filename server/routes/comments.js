const routes = require('express').Router()
const { getAllComment, addComment, deleteComment } = require('../controllers/comment.controllers')

routes
  .get('/', getAllComment)
  .post('/', addComment)
  .delete('/:id', deleteComment)
  
module.exports = routes