const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postsSchema = Schema(
  {
    status: String,
    image: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }],
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
    dislikes: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  }, {
    timestamps: true
  }
)

let post = mongoose.model('post', postsSchema)

module.exports = post