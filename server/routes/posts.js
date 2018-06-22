const routes = require('express').Router()
const multer = require('multer')
const { getAllPost, addPost, editPost, editPostWithImage, deletePost, likes, dislikes, getPostByUserId } = require('../controllers/post.controllers')
const { postTweet } = require('../controllers/twitter.controllers')
const middlewareUpload = require('../middlewares/upload')

const uploaderMem = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 10 * 1024 * 1024
  }
})

routes
  .get('/', getAllPost)
  .get('/user', getPostByUserId)
  .get('/likes/:id', likes)
  .get('/dislikes/:id', dislikes)
  .post('/', uploaderMem.single('image'), middlewareUpload.upload, addPost)
  .post('/share', postTweet)
  .put('/edit/:id', editPost)
  .put('/image/:id', uploaderMem.single('image'), middlewareUpload.upload, editPostWithImage)
  .delete('/:id', deletePost)

module.exports = routes