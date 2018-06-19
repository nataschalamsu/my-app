const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'User email required'],
      unique: [true, 'Email already exist'],
      validate: {
        validator: function(email) {
          let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
          let isEmail = emailRegex.test(email)
          return isEmail
        }
      }
    },
    password: {
      type: String,
      required: [true, 'password required']
    }
  },
  {
    timestamps: true
  }
)

let user = mongoose.model('user', usersSchema)

module.exports = user