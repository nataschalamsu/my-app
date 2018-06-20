const routes = require('express').Router()
const multer = require('multer')
const { getAllPost, addPost, editPost, editPostWithImage, deletePost, likes, dislikes, getPostByUserId } = require('../controllers/post.controllers')
const { postTweet } = require('../controllers/twitter.controllers')
const { isLogin, isAdmin, isUser } = require('../middlewares/authentication')
const middlewareUpload = require('../middlewares/upload')

const uploaderMem = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 10 * 1024 * 1024
  }
})

routes
  .get('/', getAllPost)
  .get('/user', isLogin, getPostByUserId)
  .get('/likes/:id', isLogin, likes)
  .get('/dislikes/:id', isLogin, dislikes)
  .post('/', isLogin, uploaderMem.single('image'), middlewareUpload.upload, addPost)
  .post('/share', isLogin, postTweet)
  .put('/edit/:id', isLogin, editPost)
  .put('/image/:id', isLogin, uploaderMem.single('image'), middlewareUpload.upload, editPostWithImage)
  .delete('/:id', isLogin, deletePost)

module.exports = routes