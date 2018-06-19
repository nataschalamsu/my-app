const mongoose = require('mongoose')
const post = require('../models/post.models')

module.exports = {
  getAllPost: (req, res) => {
    post
      .find()
      .populate('user')
      .populate({
        path: 'comments',
        populate: [{
          path: 'user'
        }]
      })
      then(posts => {
        res
          .status(200)
          .json({
            message: 'get all post success',
            data: posts
          })
      })
  },
  addPost: (req, res) => {
    const user = req.headers.decoded.userId
    const { status } = req.body
    let image = req.imageURL
    let newPost = new post({ user, status, image })

    newPost
      .save(function(err, addNew) {
        if (!err) {
          res
            .status(201)
            .json({
              message: 'added new post',
              data: addNew
            })
        } else {
          res
            .status(400)
            .json({
              message: 'failed to add new post',
              err
            })
        }
      })
  },
  updatePost: (req, res) => {
    
  }
}