const { CustomAPIError } = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.status).json({
      msg: err.message,
      error: err
    })
  }
  return res
    .status(500)
    .json({
      msg: 'He had an internal server error while processing the request!',
      error: err
    })
}

module.exports = errorHandlerMiddleware
