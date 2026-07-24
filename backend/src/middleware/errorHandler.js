const ApiError = require('../errors/ApiError');

function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorResponse = {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred on the server.',
    details: []
  };

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errorResponse = {
      code: err.code,
      message: err.message,
      details: err.details
    };
  } else {
    // Log unexpected non-operational errors
    console.error('CRITICAL UNHANDLED ERROR:', err);
  }

  res.status(statusCode).json({
    error: errorResponse
  });
}

module.exports = errorHandler;
