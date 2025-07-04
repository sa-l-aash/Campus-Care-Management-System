const express = require("express");
const router = express.Router();
const multer = require("multer");
const Complaint = require("../models/Complaint");

// Setup multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all complaints
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ error: "❌ Error fetching complaints" });
  }
});

// POST a new complaint with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { description } = req.body;

    const newComplaint = new Complaint({
      description,
      image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
      status: "pending", // Default status
    });

    await newComplaint.save();
    res.status(201).json({ message: "✅ Complaint submitted", complaint: newComplaint });
  } catch (err) {
    console.error("Error submitting complaint:", err);
    res.status(500).json({ error: "❌ Error submitting complaint" });
  }
});

// PATCH mark complaint as resolved
router.patch("/:id/status", async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: "resolved" },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json({ message: "✅ Complaint marked as resolved", complaint: updated });
  } catch (err) {
    console.error("Error updating complaint status:", err);
    res.status(500).json({ error: "❌ Error updating status" });
  }
});

// DELETE a complaint by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!deletedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json({ message: "✅ Complaint deleted successfully" });
  } catch (err) {
    console.error("Error deleting complaint:", err);
    res.status(500).json({ error: "❌ Error deleting complaint" });
  }
});

module.exports = router;
