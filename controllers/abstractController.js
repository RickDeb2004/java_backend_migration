// controllers/abstractController.js

const { StatusCodes } = require('http-status-codes');

class AbstractController {
  static success(data) {
    return {
      success: true,
      status: StatusCodes.OK,
      data: data,
    };
  }

  static successWithMessage(message, data) {
    return {
      success: true,
      status: StatusCodes.OK,
      message: message,
      data: data,
    };
  }

  static successWithStatus(httpStatus, data) {
    return {
      success: true,
      status: httpStatus,
      data: data,
    };
  }

  static successWithStatusAndMessage(httpStatus, message, data) {
    return {
      success: true,
      status: httpStatus,
      message: message,
      data: data,
    };
  }

  static failure(message) {
    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: message,
    };
  }

  static failureWithStatus(httpStatus, message) {
    return {
      success: false,
      status: httpStatus,
      message: message,
    };
  }
}

module.exports = AbstractController;
