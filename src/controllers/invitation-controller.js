const { v4: uuidv4 } = require("uuid");
const { Invitee } = require("../models/index.js");

const invitationController = async (req, res) => {
  try {
    const { name, email, phone, alternateEmail } = req.body;

    // Validate the input parameters
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Generate a unique invitee ID
    const inviteeId = uuidv4();

    // Save the invitation details to the database
    await Invitee.create({ inviteeId, name, email, phone, alternateEmail });

    // Send the response with the invitee ID
    res.status(200).json({ inviteeId });
  } catch (error) {
    console.error("Error sending invitation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the invitation." });
  }
};

module.exports = invitationController;
