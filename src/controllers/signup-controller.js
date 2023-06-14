const bcrypt = require('bcrypt');
const { User, Invitee } = require('../models/index.js');

const signupController = async (req, res) => {
  try {
    const { inviteeId, password, name, email, phone } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user details and hashed password to the database
    const user = await User.create({ inviteeId, password: hashedPassword, name, email, phone });

    // Save the invitee details to the database
    await Invitee.create({ inviteeId, name, email, phone });

    // Send the invitee ID in the response
    res.status(200).json({ inviteeId });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'An error occurred while signing up.' });
  }
};

module.exports = signupController;
