const STATUS_CONFLICT = 409;

class ConflictRequestError extends Error {
  constructor(message = 'Conflict Request') {
    super(message);
    this.statusCode = STATUS_CONFLICT;
  }
}

module.exports = {
  ConflictRequestError,
  STATUS_CONFLICT,
};
