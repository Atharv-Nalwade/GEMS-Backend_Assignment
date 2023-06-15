const bcrypt = require("bcrypt");
const { User } = require("../models/index.js");
const { generateToken } = require("../utils/jwt.js");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by their email
    const user = await User.findOne({ where: { email } });

    // If the user doesn't exist, return an error
    if (!user) {
      console.log("Invalid email or password");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is not valid, return an error
    if (!isPasswordValid) {
      console.log("Invalid email or password");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = generateToken({ userId: user.id }, "1h");

    // Send the user details and token in the response
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
};

module.exports = loginController;
