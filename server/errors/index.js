const { BadRequestError, STATUS_BAD_REQUEST } = require('./BadRequestError');
const { NotFoundError, STATUS_NOT_FOUND } = require('./NotFoundError')
const { ConflictRequestError, STATUS_CONFLICT } = require('./ConflictRequestError');
const STATUS_FATAL = 500

const errorHandler = (err, _, res, next) => {
  const { statusCode = STATUS_FATAL, message } = err;
  res
    .status(statusCode)
    .send({
      statusCode,
      message: statusCode === STATUS_FATAL
        ? 'Server error'
        : message,
    });
  next(err);
};

module.exports = {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_CONFLICT,
  STATUS_FATAL,
  BadRequestError,
  NotFoundError,
  ConflictRequestError,
  errorHandler
};
