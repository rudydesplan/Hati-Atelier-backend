const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Access denied. No token provided.');

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.status(401).send('Invalid token.');
    req.user = decoded;
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access forbidden. Admins only.');
  next();
};

module.exports = { authenticate, authorizeAdmin };
