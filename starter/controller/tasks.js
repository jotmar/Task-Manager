const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json(tasks)
  console.log('Got all the tasks.')
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
  console.log('New Task Created')
})

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id })
  if (!task) {
    return next(
      createCustomError(`Couldn't find the task with id: ${req.params.id}`, 404)
    )
  }
  res.status(200).json(task)
  console.log('Got a single task!')
})

const updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  })
  if (!task) {
    return next(
      createCustomError(`Couldn't find the task with id: ${req.params.id}`, 404)
    )
  }
  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id })
  if (!task) {
    return next(
      createCustomError(`Couldn't find the task with id: ${req.params.id}`, 404)
    )
  }
  res.status(200).json({ deleted: task })
  console.log('Succesfully deleted the task!')
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
