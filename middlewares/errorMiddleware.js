module.exports = function (err, req, res, next) {
  const logger = require('../utils/winstonConfig');

  // Log the error
  logger.error(err.message);

  // Send a generic error message
  res.status(500).send({
    error: {
      message: 'An unexpected error occurred',
      details: err.message
    }
  });
};
