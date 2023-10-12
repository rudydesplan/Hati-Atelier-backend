// Import all the Custom Errors and the logging configuration
const { CustomError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError, MethodNotAllowedError, NotAcceptableError, PreconditionFailedError, PayloadTooLargeError, URITooLongError, UnsupportedMediaTypeError, UnprocessableEntityError, TooManyRequestsError, NotImplemented, BadGateway, ServiceUnavailable, GatewayTimeout, InsufficientStorage } = require('../errors/CustomErrors');
const logger = require('../utils/winstonConfig');

// Error-handling middleware function
module.exports = function (err, req, res, next) {
  // Prepare the default error response
  let errorResponse = {
    message: 'An unexpected error occurred',  // Default message
    details: err.message,                     // Detailed message from error object
    timestamp: new Date().toISOString(),       // Current time
    method: req.method,                        // HTTP Method
    url: req.originalUrl                      // URL of the request
  };

  // Prepare the log object for storing detailed information
  let logObject = {
    ...errorResponse,  // Spread in all fields from errorResponse
    stack: err.stack   // Stack trace for debugging
  };

  // Check if the error is a type of CustomError
  if (err instanceof CustomError) {
    // Update the default message with specific error message
    errorResponse.message = err.message;

    // Send response back to the client with appropriate status code
    res.status(err.statusCode).send({ error: errorResponse });

    // Log a warning message
    logger.warn(JSON.stringify(logObject));
  } 
  // For all other types of errors
  else {
    // Send a generic 500 Internal Server Error to the client
    res.status(500).send({ error: errorResponse });

    // Log the error as a severe issue
    logger.error(JSON.stringify(logObject));
  }
};