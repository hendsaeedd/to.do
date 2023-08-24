const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    min: 13,
  }
})

const User = mongoose.model('users', userSchema)

module.exports = User