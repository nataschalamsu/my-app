const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = Schema(
  {
    comment: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  }, {
    timestamps: true
  }
)

let comment = mongoose.model('comment', articleSchema)

module.exports = comment