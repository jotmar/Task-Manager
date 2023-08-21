const Task = require('../models/task')

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json(tasks)
    console.log('Got all the tasks.')
  } catch (error) {
    res.status(500).json({ msg: error })
    console.log('We had an error while getting the tasks!')
  }
}

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
    console.log('New Task Created')
  } catch (error) {
    res.status(500).json({ msg: error })
    console.log('We had an error while creating a new task!')
  }
}

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id })
    if (!task) {
      console.log("Couldn't find the task!")
      return res.status(404).json({ msg: "Couldn't find the task!" })
    }
    res.status(200).json(task)
    console.log('Got a single task!')
  } catch (error) {
    res.status(500).json({ msg: "Couldn't get the task!", err: error })
    console.log("Couldn't get the task!")
  }
}

const updateTask = (req, res) => {
  res.send('Update Task')
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id })
    if (!task) {
      console.log("Couldn't find the task!")
      return res.status(404).json({ msg: "Couldn't find the task!" })
    }
    res.status(200).json({ deleted: task })
    console.log('Succesfully deleted the task!')
  } catch (error) {
    res.status(500).json({ msg: "Couldn't delete the task!", err: error })
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
