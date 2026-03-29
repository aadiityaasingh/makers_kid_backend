const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    subject: {
      type: String,
      required: true,
      enum: [
        "General Question",
        "Technical Support",
        "Project Help",
        "Partnership Inquiry",
        "Media & Press",
        "Other",
      ],
    },

    message: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("Contact", contactSchema);