// controllers/controllerExceptionHandler.js

const { StatusCodes } = require('http-status-codes');
const AbstractController = require('./abstractController');

class ControllerExceptionHandler {
  static handleMethodArgumentNotValidException(error, req, res, next) {
    const errorMessage = error.errors.map(err => `${err.path} ${err.message}`).join(', ');
    res.status(StatusCodes.BAD_REQUEST).json(AbstractController.failure(errorMessage));
  }

  static handleException(error, req, res, next) {
    console.error('exception:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(AbstractController.failure(error.message));
  }
}

module.exports = ControllerExceptionHandler;
