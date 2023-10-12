const { CustomError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError, MethodNotAllowedError, NotAcceptableError, PreconditionFailedError, PayloadTooLargeError, URITooLongError, UnsupportedMediaTypeError, UnprocessableEntityError, TooManyRequestsError, NotImplemented, BadGateway, ServiceUnavailable, GatewayTimeout, InsufficientStorage } = require('../errors/CustomErrors');
const logger = require('../utils/winstonConfig');

module.exports = function (err, req, res, next) {
  let errorResponse = {
    message: 'An unexpected error occurred',
    details: err.message,
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl
  };

  let logObject = {
    ...errorResponse,
    stack: err.stack
  };

  // Check if the error is a CustomError or its subclass
  if (err instanceof CustomError) {
    errorResponse.message = err.message;
    res.status(err.statusCode).send({ error: errorResponse });
    logger.warn(JSON.stringify(logObject));
  } 
  // Extend this section to capture other custom or known errors, if needed.
  else {
    res.status(500).send({ error: errorResponse });
    logger.error(JSON.stringify(logObject));
  }
};
