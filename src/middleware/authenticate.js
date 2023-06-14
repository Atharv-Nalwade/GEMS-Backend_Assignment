const { verifyToken } = require('../utils/jwt');
const { User } = require('../models/index.js');

const authenticate = async (req, res, next) => {
  try {
    // Extract the JWT from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    // If the token is not provided, return an error
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify and decode the JWT
    const decoded = verifyToken(token);

    // Find the user based on the decoded user ID
    const user = await User.findByPk(decoded.userId);

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the authenticated user's information to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error authenticating:', error);
    res.status(500).json({ error: 'An error occurred while authenticating.' });
  }
};

module.exports = authenticate;