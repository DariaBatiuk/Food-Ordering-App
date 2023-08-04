const {
  constants: {
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_CONFLICT,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
  },
} = require("http2");

const errorHandler = (err, _, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    statusCode,
    message:
      statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
        ? "Server error"
        : message,
  });
  next(err);
};

class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}

class ConflictRequestError extends Error {
  constructor(message = "Conflict Request") {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  ConflictRequestError,
  errorHandler,
  HTTP_STATUS_BAD_REQUEST,
};
