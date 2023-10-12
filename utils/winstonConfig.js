const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  
  format: winston.format.combine(
	winston.format.timestamp(),
	winston.format.json()
  )
  transports: [

    new winston.transports.File({ filename: './log_files/logs.txt' })
	new winston.transports.Console()
  ]
});

// Log sample messages
logger.debug('Debugging info'); // Will be logged in non-production environments
logger.info('Informational message'); // Basic info logs
logger.warn('Warning message'); // Captures warnings
logger.error('Error information'); // Captures errors