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

    const newReport = new Report({
      description,
      location,
      image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
      status: "pending", // Default status
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

// PATCH mark report as resolved
router.patch("/:id/status", async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(
      req.params.id,
      { status: "resolved" },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json({ message: "✅ Report marked as resolved", report: updated });
  } catch (err) {
    console.error("Error updating report status:", err);
    res.status(500).json({ error: "❌ Error updating status" });
  }
});

// DELETE a report by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json({ message: "✅ Report deleted successfully" });
  } catch (err) {
    console.error("Error deleting report:", err);
    res.status(500).json({ error: "❌ Error deleting report" });
  }
});

module.exports = router;
