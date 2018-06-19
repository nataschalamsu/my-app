const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = Schema(
  {
    comments: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  }, {
    timestamps: true
  }
)

let comment = mongoose.model('comment', commentsSchema)

module.exports = comment