class ApiError extends Error {
  constructor(statusCode, code, message, details = []) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, details = [], code = 'BAD_REQUEST') {
    return new ApiError(400, code, message, details);
  }

  static notFound(message = 'Resource not found', code = 'NOT_FOUND') {
    return new ApiError(404, code, message);
  }

  static internal(message = 'Internal server error', code = 'INTERNAL_ERROR') {
    return new ApiError(500, code, message);
  }
}

module.exports = ApiError;
