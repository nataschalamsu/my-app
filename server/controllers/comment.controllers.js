const comment = require('../models/comment.models')
const post = require('../models/post.models')

module.exports = {
  getAllComment: (req, res) => {
    comment
      .find()
      .populate('user')
      .then(result => {
        res
          .status(200)
          .json({
            message: 'get all post success',
            comments: result
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            message: 'failed to get all comment',
            err
          })
      })
  },
  addComment: (req, res) => {
    const idUser = req.headers.decoded.userId
    const { id, comments } = req.body
    const newComment = new comment({ user: idUser, comments })

    newComment
      .save()
      .then(result => {
        post
          .findByIdAndUpdate({
            _id: req.body.id
          }, {
            $push: {
              comments: result.id
            }
          })
          .then(respond => {
            res
              .status(201)
              .json({
                message: 'comment added',
                data: respond
              })
          })
          .catch(err => {
            res
              .status(400)
              .json({
                message: 'failed to add comment',
                err
              })
          })
      })
      .catch(err => {
        res
          .status(400)
          .json(err)
      })
  },
  deleteComment: (req, res) => {
    comment
      .findByIdAndRemove({
        _id: req.params.id
      })
      .then(result => {
        res
          .status(200)
          .json({
            message: 'comment deleted'
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            message: 'failed to delete comment',
            err
          })
      })
  }
}