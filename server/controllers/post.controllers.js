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
      .then(posts => {
        res
          .status(200)
          .json({
            message: 'get all post success',
            data: posts
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            message: 'failed to get all post',
            err
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
  editPost: (req, res) => {
    console.log("masuk", req.body)
    post
      .findByIdAndUpdate({
        _id: req.params.id
      }, req.body, function(err, updated) {
        if (!err) {
          console.log("harus masuk sini")
          res
            .status(200)
            .json({
              message: 'update success',
              data: updated
            })
        } else {
          res
            .status(400)
            .json(err)
        }
      })
  },
  editPostWithImage: function(req, res) {
    const { status } = req.body
    const image = req.imageURL
    
    post
      .findByIdAndUpdate({
        _id: req.params.id
      }, {...req.body, image}, function(err, updated) {
        console.log(updated)
        if (!err) {
          res
            .status(200)
            .send({
              message: 'successfully updated',
              data: updated
            })
        } else {
          res
            .status(400)
            .send(err)
        }
      })
  },
  deletePost: (req, res) => {
    post
      .findByIdAndRemove({
        _id: req.params.id
      }, function(err, result) {
        if (!err) {
          res
            .status(200)
            .json(result)
        } else {
          res
            .status(400)
            .json(err)
        }
      })
  },
  likes: (req, res) => {
    let idUser = req.headers.decoded.userId
    let action = ''

    post
      .find({
        _id: req.params.id
      })
      .populate('user')
      .exec()
      .then((result) => {
        console.log("====>", result)
        let liking = result[0].likes
        let checkLikes = liking.indexOf(idUser) 
        let disliking = result[0].dislikes
        let checkDislikes = disliking.indexOf(idUser) 
        if (idUser == result[0].user.id) {
          console.log("masuk =====|", idUser)
          res
            .status(400)
            .send({
              message: "access denied"
            })
        } else {
          if (checkDislikes !== -1) {
            res
              .status(400)
              .send({
                message: "you've been disliked"
              })
          } else {
            if (checkLikes !== -1) {
              action = '$pull'
            } else {
              action = '$push'
            }
          }

          post
            .update({
              _id: req.params.id
            }, {
              [action]: {
                likes: idUser
              }
            }, {
              overwrite: false
            }, function(err, response) {
              if (!err) {
                res
                  .status(200)
                  .send({
                    message: "like success"
                  })
              } else {
                res
                  .status(400)
                  .send({
                    message: "like failed"
                  })
              }
          })
        }
      })
      .catch(err => {
        res
          .status(400)
          .send(err)
      })
  },
  dislikes: (req, res) => {
    let idUser = req.headers.decoded.userId
    let action = ''

    post
      .find({
        _id: req.params.id
      })
      .populate('user')
      .exec()
      .then(result => {
        
        let liking = result[0].likes
        let checkLikes = liking.indexOf(idUser) 
        let disliking = result[0].dislikes
        let checkDislikes = disliking.indexOf(idUser) 
        
        if (idUser == result[0].user.id) {
          console.log("masuk =====|", idUser)
          console.log("id result", result[0].user.id)
          res
            .status(400)
            .send({
              message: "access denied"
            })
        } else {
          if (checkLikes !== -1) {
            res
              .status(400)
              .send({
                message: "you've been liked"
              })
          } else {
            if (checkDislikes !== -1) {
              action = '$pull'
            } else {
              action = '$push'
            }
          }

          post
            .update({
              _id: req.params.id
            }, {
              [action]: {
                dislikes: idUser
              }
            }, {
              overwrite: false
            }, function(err, response) {
              if (!err) {
                res
                  .status(200)
                  .send({
                    message: "dislike success"
                  })
              } else {
                res
                  .status(400)
                  .send({
                    message: "dislike failed"
                  })
              }
            })
        }
      })
      .catch(err => {
        res
          .status(400)
          .send(err)
      })
  }
}