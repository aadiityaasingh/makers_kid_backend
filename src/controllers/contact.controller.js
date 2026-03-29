const contactModel = require("../models/contact.model.js");

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // ✅ Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = await contactModel.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully 🚀",
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

module.exports = {
  sendContactMessage,
};