const { BlacklistToken } = require('../models/index.js'); // Import the BlacklistToken model

const logoutController = async (req, res) => {
  try {
    console.log("Inside logoutController");
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    console.log("After extracting the token from the Authorization header",token);
    // If the token is not provided, return an error
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if the token is already blacklisted
    const blacklistedToken = await BlacklistToken.findOne({ where: { token } });
    console.log("After checking if the token is already blacklisted",blacklistedToken);
    if (blacklistedToken) {
      return res.status(401).json({ error: 'Token has already been invalidated' });
    }
    console.log("After checking if the token is already blacklisted");
    // Blacklist the token by saving it to the BlacklistTokens table
    await BlacklistToken.create({ token });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'An error occurred while logging out.' });
  }
};

module.exports = logoutController;
