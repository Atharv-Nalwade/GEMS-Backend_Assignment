const { User } = require("../models/index.js");
const { verifyToken } = require('../utils/jwt.js');
const multer = require('multer');

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const editUserController = async (req, res) => {
  try {
    const { name, email, phone, alternateEmail } = req.body;

    // Extract the user ID from the decoded token obtained from the request object
    console.log("req.user:", req.user);
    const userId = Number(req.user.dataValues.id); // Convert userId to a number
    console.log("userId:", userId);

    const user = await User.findByPk(18);
    console.log("user:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update the user's information using the User model
    const [numRowsUpdated] = await User.update(
      {
        name,
        email,
        phone,
        alternateEmail,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    if (numRowsUpdated === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    // Handle profile picture upload
    upload.single('profilePicture')(req, res, async (err) => {
      if (err) {
        console.error("Error uploading profile picture:", err);
        return res.status(500).json({ error: "An error occurred while uploading the profile picture." });
      }

      // If a file is uploaded, update the profile picture
      if (req.file) {
        const profilePicture = req.file.buffer; // Assuming the profile picture is stored as a binary buffer
        await User.update(
          {
            profilePicture,
          },
          {
            where: {
              id: userId,
            },
          }
        );
      }

      // Fetch the updated user details
      const updatedUser = await User.findByPk(userId);

      // Send the updated user details in the response
      res.status(200).json({ user: updatedUser });
    });
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(500).json({ error: "An error occurred while editing the user." });
  }
};

module.exports = editUserController;
