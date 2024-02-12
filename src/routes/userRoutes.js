const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
} = require('../controllers/user')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User APIs
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstname:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User was registered successfully
 *       '400':
 *         description: Error registering user
 */

router.post('/register', registerUser)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User was logged in successfully
 *       '401':
 *         description: Invalid credentials
 */

router.post('/login', loginUser)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users' firstnames
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users' first names
 *       '400':
 *         description: Error getting users
 */

router.get('/', getAllUsers)

/**
 * @swagger
 * /users/{name}:
 *   delete:
 *     summary: Delete a user by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Error deleting user
 */

router.delete('/:name', deleteUser)

/**
 * @swagger
 * /users/{name}:
 *   patch:
 *     summary: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: name
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
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstname:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Error updating user
 */

router.patch('/:name', updateUser)

module.exports = router
