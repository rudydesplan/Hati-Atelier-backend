const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  BadRequestError,
  UnauthorizedError,
} = require('../errors/CustomErrors');
const logger = require('../utils/winstonConfig');

exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    // Data Integrity Checks
    if (!username) {
      throw new BadRequestError('Missing username');
    }
    if (!password) {
      throw new BadRequestError('Missing password');
    }
	if (!role) {
	  throw new BadRequestError('Missing role');
	}
	if (!['admin', 'user'].includes(role)) {
	  throw new BadRequestError('Invalid role');
	}

    // Duplicate User Handling
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new BadRequestError('Username already exists');
    }

    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).send('User created');
  } catch (error) {
    // Check for Database Errors or Password Hashing Errors
    if (error.name === 'MongoError' || error.name === 'ValidationError') {
      error = new InternalServerError('Database Error');
    }

    logger.error(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username) {
	  throw new BadRequestError('Missing username');
	}
	if (!password) {
	  throw new BadRequestError('Missing password');
	}

    const user = await User.findOne({ username });
	
    if (!user) {
	  throw new UnauthorizedError('Invalid username');
	}
	if (!(await user.comparePassword(password))) {
	  throw new UnauthorizedError('Invalid password');
	}

    try {
      const token = jwt.sign({ id: user._id, role: user.role }, 'secret');
      res.status(200).send({ token });
    } catch (jwtError) {
      logger.error(jwtError);
      throw new UnauthorizedError('Token generation failed');
    }
    
  } catch (error) {
    logger.error(error);
    next(error);
  }
};