const express = require('express')
const router = express.Router()
const {
  createTodo,
  getTodoWithID,
  updateTodo,
  deleteTodo,
} = require('../controllers/todo')

//get all todos
router.post('/create', createTodo)

//get all todos with id
router.get('/:userId', getTodoWithID)

//update todo
router.patch('/:id', updateTodo)

//delete todo
router.delete('/:id', deleteTodo)

module.exports = router
