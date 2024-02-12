const express = require('express')
const router = express.Router()
const {
  createTodo,
  getTodoWithID,
  updateTodo,
  deleteTodo,
} = require('../controllers/todo')

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo APIs
 */


/**
 * @swagger
 * /todos/create:
 *   post:
 *     summary: Create a new todo using user's username
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               title:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *         description: Todo created successfully
 */

router.post('/create', createTodo)

/**
 * @swagger
 * /todos/{userId}:
 *   get:
 *     summary: Get all todos for a user
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *         description: A list of todos ref to user's username
 */

router.get('/:userId', getTodoWithID)

/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     summary: Update a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *         description: Todo updated successfully
 */

router.patch('/:id', updateTodo)

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Todo deleted successfully
 *       '401':
 *         description: Todo not found
 */

router.delete('/:id', deleteTodo)

module.exports = router
