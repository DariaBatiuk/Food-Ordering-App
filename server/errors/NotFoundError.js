const STATUS_NOT_FOUND = 400;

class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.statusCode = STATUS_NOT_FOUND;
  }
}

module.exports = {
  NotFoundError,
  STATUS_NOT_FOUND,
};
