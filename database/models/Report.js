const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
