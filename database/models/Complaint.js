const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    image: {
      data: Buffer,
      contentType: String,
    },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

module.exports = mongoose.model("Complaint", complaintSchema);
