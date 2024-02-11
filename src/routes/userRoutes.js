const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
} = require('../controllers/user')

//register user
router.post('/register', registerUser)

//login user
router.post('/login', loginUser)

//get all users firstname
router.get('/', getAllUsers)

//delete user
router.delete('/:name', deleteUser)

//update user
router.patch('/:name', updateUser)

module.exports = router
