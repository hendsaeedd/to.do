const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')
const User = require('../models/user')


//get all todos
router.post('/', async (req, res) => {
  try {
    const { username, title, tags } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const newTodo = await Todo.create({
      userId: user._id,
      title,
      tags,
    })

    res.json(newTodo)
  } catch (error) {
    res.json({ error: error.message })
  }
})


//get all todos with id
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const todos = await Todo.find({ userId })
    res.json(todos)
  } catch (error) {
    res.json({ error: error.message })
  }
})


//update todo
router.patch('/:id', async (req, res) => {
  try {
    const todoId = req.params.id
    const { title, tags } = req.body

    const update = {
      title,
      tags
    };
    const updatedTodo = await Todo.updateOne({ _id: todoId }, update)

    res.json({ message: 'Todo updated successfully', updatedTodo })
  } catch (error) {
    res.json({ error: error.message })
  }
})

//delete todo
router.delete('/:id', async (req, res) => {
  try {
    const todoId = req.params.id
    const deletedTodo = await Todo.deleteOne({ _id: todoId })

    if (deletedTodo.deletedCount === 0) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    res.json({ message: 'Todo deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


module.exports = router