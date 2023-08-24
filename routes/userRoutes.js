const express = require('express')
const router = express.Router()
const User = require('../models/user')


//register user
router.post('/register', async (req, res) => {
  try {
    const { username, password, firstname } = req.body

    const newUser = await User.create({
      username,
      password,
      firstName: firstname,
    })

    res.json({ message: 'User was registered successfully', newUser })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})



//login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const loginUser = await User({
      username,
      password,
    });

    res.json({ message: 'User was logged in successfully', loginUser });
  } catch (error) {
    res.status(401).json( error.message );
  }
})

//get all users firstname
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'firstName');
    res.json(users);
  } catch (error) {
    res.json({ error: error.message });
  }
});


//delete user
router.delete('/:name', async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ username: req.params.name });
    res.json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    res.json({ error: error.message });
  }
});


//update user
router.patch('/:name', async (req, res) => {
  try {
    const user = await User.updateOne({username: req.params.name}, req.body)
    res.json(user)
  } catch (error) {
    res.json( error.message );
  }
})


module.exports = router