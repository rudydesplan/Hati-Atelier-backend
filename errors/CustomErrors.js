class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends CustomError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

class InternalServerError extends CustomError {
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}


class MethodNotAllowedError extends CustomError {
  constructor(message = 'Method Not Allowed') {
    super(405, message);
  }
}

class NotAcceptableError extends CustomError {
  constructor(message = 'Not Acceptable') {
    super(406, message);
  }
}

class PreconditionFailedError extends CustomError {
  constructor(message = 'Precondition Failed') {
    super(412, message);
  }
}

class PayloadTooLargeError extends CustomError {
  constructor(message = 'Payload Too Large') {
    super(413, message);
  }
}

class URITooLongError extends CustomError {
  constructor(message = 'URI Too Long') {
    super(414, message);
  }
}

class UnsupportedMediaTypeError extends CustomError {
  constructor(message = 'Unsupported Media Type') {
    super(415, message);
  }
}

class UnprocessableEntityError extends CustomError {
  constructor(message = 'Unprocessable Entity') {
    super(422, message);
  }
}

class TooManyRequestsError extends CustomError {
  constructor(message = 'Too Many Requests') {
    super(429, message);
  }
}

class NotImplemented extends CustomError {
  constructor(message = 'Not Implemented') {
    super(501, message);
  }
}

class BadGateway extends CustomError {
  constructor(message = 'Bad Gateway') {
    super(502, message);
  }
}

class ServiceUnavailable extends CustomError {
  constructor(message = 'Service Unavailable') {
    super(503, message);
  }
}

class GatewayTimeout extends CustomError {
  constructor(message = 'Gateway Timeout') {
    super(504, message);
  }
}

class InsufficientStorage extends CustomError {
  constructor(message = 'Insufficient Storage') {
    super(507, message);
  }
}

module.exports = {
  CustomError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
  MethodNotAllowedError,
  NotAcceptableError,
  PreconditionFailedError,
  PayloadTooLargeError,
  URITooLongError,
  UnsupportedMediaTypeError,
  UnprocessableEntityError,
  TooManyRequestsError,
  NotImplemented,
  BadGateway,
  ServiceUnavailable,
  GatewayTimeout,
  InsufficientStorage
};
