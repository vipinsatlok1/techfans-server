class ErrorHandler extends Error {
  constructor(status, message) {
    super(message);
    this.message = message;
    this.status = status;
  }

  static notFound(message = "not found") {
    this.message = message;
    this.status = 404;
    return this;
  }

  static notAccept(message = "unauthrized") {
    this.message = message;
    this.status = 403;
    return this;
  }

  static badRequest(message = "bad request") {
    this.message = message;
    this.status = 404;
    return this;
  }
}

module.exports = ErrorHandler;
