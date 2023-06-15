const { User } = require("../models/index.js");
const multer = require("multer");

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const editUserController = async (req, res) => {
  try {
    const userId = Number(req.user.dataValues.id);

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Handle profile picture upload
    const uploadMiddleware = upload.single("profilePicture");
    uploadMiddleware(req, res, async (err) => {
      console.log("Inside uploadMiddleware", req.body);
      if (err) {
        console.error("Error uploading profile picture:", err);
        return res.status(500).json({
          error: "An error occurred while uploading the profile picture.",
        });
      }
      const { name, email, phone, alternateEmail } = req.body;

      // Update the user's information
      const numRowsUpdated = await User.update(
        {
          name: name,
          email: email,
          phone: phone,
          alternateEmail: alternateEmail,
          profilePicture: req.file ? req.file.buffer : undefined,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      if (numRowsUpdated === 0) {
        return res
          .status(404)
          .json({ error: "User not found in row updation." });
      }

      // Fetch the updated user details
      const updatedUser = await User.findByPk(userId);

      // Send the updated user details in the response
      res.status(200).json({ user: updatedUser });
    });
  } catch (error) {
    console.error("Error editing user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while editing the user." });
  }
};

module.exports = editUserController;
