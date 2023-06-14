const { v4: uuidv4 } = require('uuid');
const { User, Organization } = require('../models/index.js');

const invitationController = async (req, res) => {
  try {
    const { name, email, phone, alternateEmail, organizations } = req.body;

    // Generate a unique invitee ID
    const inviteeId = uuidv4();

    // Create the invitee in the database
    await User.create({
      inviteeId,
      name,
      email,
      phone,
      alternateEmail
    });

    // Create organizations for the invitee if provided
    if (organizations && organizations.length > 0) {
      await Promise.all(
        organizations.map(async (org) => {
          const { name: orgName, role, validTill } = org;

          await Organization.create({
            organizationId: uuidv4(),
            inviteeId,
            name: orgName,
            role,
            validTill
          });
        })
      );
    }

    // Send the invitee ID in the response
    res.status(200).json({ inviteeId });
  } catch (error) {
    console.error('Error sending invitation:', error);
    res.status(500).json({ error: 'An error occurred while sending the invitation.' });
  }
};

module.exports = invitationController;
