const bcrypt = require('bcrypt');
const { User, Invitee } = require('../models/index.js');
const multer = require('multer');

// Configure multer to store uploaded files in memory
const upload = multer().single('profilePicture');

const signupController = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'An error occurred while uploading the file.' });
      }

      const { inviteeId, password, name, email, phone } = req.body;
      const profilePicture = req.file.buffer; // Access the uploaded file buffer

      // Validate the input parameters
      if (!inviteeId || !password || !name || !email || !phone) {
        return res.status(400).json({ error: 'Missing required fields.' });
      }

      // Check if the invitation exists and is valid
      const invitation = await Invitee.findOne({ where: { inviteeId } });
      if (!invitation) {
        return res.status(404).json({ error: 'Invitation not found or expired.' });
      }

      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'A user with the same email already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the user details, hashed password, and profile picture to the database
      const user = await User.create({ inviteeId, password: hashedPassword, name, email, phone, profilePicture });

      // Send the response indicating successful sign-up
      res.status(200).json({ message: 'User account created successfully.' });
    });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'An error occurred while signing up.' });
  }
};

module.exports = signupController;
