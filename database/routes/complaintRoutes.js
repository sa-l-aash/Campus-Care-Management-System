const express = require("express");
const router = express.Router();
const multer = require("multer");
const Complaint = require("../models/Complaint");

// Setup multer for memory storage (store images in DB)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * GET /api/complaints
 * Fetch all complaints
 */
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ error: "❌ Error fetching complaints" });
  }
});

/**
 * POST /api/complaints
 * Submit a new complaint (with optional image)
 */
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
    res.status(201).json({
      message: "✅ Complaint submitted",
      complaint: newComplaint,
    });
  } catch (err) {
    console.error("Error submitting complaint:", err);
    res.status(500).json({ error: "❌ Error submitting complaint" });
  }
});

/**
 * PATCH /api/complaints/:id/status
 * Mark a complaint as resolved
 */
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
    res.json({
      message: "✅ Complaint marked as resolved",
      complaint: updated,
    });
  } catch (err) {
    console.error("Error updating complaint status:", err);
    res.status(500).json({ error: "❌ Error updating status" });
  }
});

/**
 * DELETE /api/complaints/:id
 * Delete a complaint by ID
 */
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

/**
 * GET /api/complaints/stats
 * Fetch statistics for Admin Stats page
 */
router.get("/stats", async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const resolvedComplaints = await Complaint.countDocuments({
      status: "resolved",
    });
    const pendingComplaints = await Complaint.countDocuments({
      status: "pending",
    });

    // Complaints per week (last 6 weeks)
    const last6Weeks = [...Array(6)].map((_, i) => {
      const start = new Date();
      start.setDate(start.getDate() - i * 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 7);
      return { start, end };
    }).reverse();

    const weeklyCounts = await Promise.all(
      last6Weeks.map(({ start, end }) =>
        Complaint.countDocuments({ createdAt: { $gte: start, $lt: end } })
      )
    );

    const weekLabels = last6Weeks.map(({ start }) =>
      `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
    );

    res.json({
      totalComplaints,
      resolvedComplaints,
      pendingComplaints,
      weeklyCounts,
      weekLabels,
    });
  } catch (err) {
    console.error("Error fetching complaint stats:", err);
    res.status(500).json({ error: "❌ Error fetching complaint stats" });
  }
});

module.exports = router;
