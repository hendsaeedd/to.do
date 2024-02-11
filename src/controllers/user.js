const User = require('../models/user')

//register user
const registerUser = async (req, res) => {
  try {
    const { username, password, firstname } = req.body

    const newUser = await User.create({
      username,
      password,
      firstName: firstname,
    })

    // res.json({ message: 'User was registered successfully', newUser })
    res.status(200).json({ message: 'User was registered successfully', newUser })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const loginUser = await User({
      username,
      password,
    })

    res.status(200).json({ message: 'User was logged in successfully', loginUser })
  } catch (error) {
    res.status(401).json(error.message)
  }
}

//get all users firstname
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'firstName')
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ username: req.params.name })
    res.status(200).json({ message: 'User deleted successfully', deletedUser })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//update user
const updateUser = async (req, res) => {
  try {
    const user = await User.updateOne({ username: req.params.name }, req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports ={
    registerUser,
    loginUser,
    getAllUsers,
    deleteUser,
    updateUser,
}