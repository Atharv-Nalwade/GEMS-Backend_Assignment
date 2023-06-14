const bcrypt = require('bcrypt');
const { User } = require('../models/index.js');

const signupController = async (req, res) => {
  try {
    const { inviteeId, password, name, email, phone } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user details and hashed password to the database
    const user = await User.create({ inviteeId, password: hashedPassword, name, email, phone });

    // Retrieve the user details from the database using the 'id' field
    const userDetails = await User.findOne({ where: { id: user.id } });

    // Send the user details in the response
    res.status(200).json(userDetails);
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'An error occurred while signing up.' });
  }
};

module.exports = signupController;
