//report model
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
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

module.exports = mongoose.model("Report", reportSchema);
