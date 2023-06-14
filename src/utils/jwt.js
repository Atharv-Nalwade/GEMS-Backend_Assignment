const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: '../.env' });

// Generate a JWT token
const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Verify and decode a JWT token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
