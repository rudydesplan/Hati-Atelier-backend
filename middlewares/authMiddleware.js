// Import the JWT package to handle JSON Web Tokens
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate a user based on JWT token in headers
const authenticate = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization;

  // If no token is found, return a 401 (Unauthorized) status
  if (!token) return res.status(401).send('Access denied. No token provided.');

  // Verify the received token using JWT package
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If token is invalid, return a 401 (Unauthorized) status
    if (err) return res.status(401).send('Invalid token.');
    
    // Attach the decoded payload to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  });
};

// Middleware to authorize user as admin
const authorizeAdmin = (req, res, next) => {
  // Check if the user role is 'admin'
  if (req.user.role !== 'admin') {
    // If not admin, return a 403 (Forbidden) status
    return res.status(403).send('Access forbidden. Admins only.');
  }

  // If user is admin, proceed to the next middleware or route handler
  next();
};

// Export the middlewares for use in other files
module.exports = { authenticate, authorizeAdmin };
