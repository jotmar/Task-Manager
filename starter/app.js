const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const tasksRoute = require('./router/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')
require('dotenv').config()

// Middlewares

app.use(express.json())
app.use(express.static('./public'))

// Routes

app.get('/hello', (req, res) => {
  res.send('Task Manager')
})

app.use('/api/v1/tasks', tasksRoute)

app.use(notFound)
app.use(errorHandlerMiddleware)
// Listener

const connect = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('CONNECTED TO THE DB...')
    app.listen(port, () => {
      console.log(`The Server is running on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

connect()
