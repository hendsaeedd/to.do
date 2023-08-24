const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    index: true
  },
  status: {
    type: String,
    default: 'to-do'
  },
  tags: [
    {
      type: String,
      maxlength: 10
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Todo = mongoose.model('todos', todoSchema)

module.exports = Todo


