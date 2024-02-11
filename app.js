const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 5000
const url = 'mongodb://127.0.0.1:27017/Todo'
const cors = require('cors')
const userRoutes = require('./src/routes/userRoutes')
const todoRoutes = require('./src/routes/todoRoutes')

//middlewares
//encode url
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

//routes
app.use('/users', userRoutes)
app.use('/todos', todoRoutes)

//cors if you want to access from other domain
app.use(cors())

//connect to mongodb
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
