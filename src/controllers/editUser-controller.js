const { User } = require("../models/index.js");
const { verifyToken } = require('../utils/jwt.js');

const editUserController = async (req, res) => {
  try {
    const { name, email, phone, alternateEmail, profilePicture } = req.body;

    // Extract the user ID from the decoded token obtained from the request object
    const userId = req.user.dataValues.id;
    console.log(userId);

    const user = await User.findByPk(userId);

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
        profilePicture,
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

    // Fetch the updated user details
    const updatedUser = await User.findByPk(userId);

    // Send the updated user details in the response
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error editing user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while editing the user." });
  }
};

module.exports = editUserController;
