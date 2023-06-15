const { BlacklistToken } = require("../models/index.js"); // Import the BlacklistToken model

const logoutController = async (req, res) => {
  try {
    console.log("Inside logoutController");

    const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

    // If the token is not provided, return an error
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if the token is already blacklisted
    const blacklistedToken = await BlacklistToken.findOne({ where: { token } });

    if (blacklistedToken) {
      return res
        .status(401)
        .json({ error: "Token has already been invalidated" });
    }

    await BlacklistToken.create({ token });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: "An error occurred while logging out." });
  }
};

module.exports = logoutController;
