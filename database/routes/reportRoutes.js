const express = require("express");
const router = express.Router();
const multer = require("multer");
const Report = require("../models/Report");

// Configure multer for memory storage (we store image in database, not on disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST a new report with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { description, location } = req.body;

    // Prepare new report data
    const newReport = new Report({
      description,
      location,
      image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
    });

    await newReport.save();
    res.status(201).json({ message: "✅ Report submitted successfully", report: newReport });
  } catch (err) {
    console.error("Error submitting report:", err);
    res.status(500).json({ error: "❌ Error submitting report" });
  }
});

// GET all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ error: "❌ Error fetching reports" });
  }
});

module.exports = router;
