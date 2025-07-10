const express = require("express");
const router = express.Router();
const multer = require("multer");
const Report = require("../models/Report");

// Configure multer for memory storage (images stored in DB)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * POST /api/reports
 * Submit a new report (with optional image)
 */
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
    res.status(201).json({
      message: "✅ Report submitted successfully",
      report: newReport,
    });
  } catch (err) {
    console.error("Error submitting report:", err);
    res.status(500).json({ error: "❌ Error submitting report" });
  }
});

/**
 * GET /api/reports
 * Fetch all reports
 */
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ error: "❌ Error fetching reports" });
  }
});

/**
 * PATCH /api/reports/:id/status
 * Mark a report as resolved
 */
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
    res.json({
      message: "✅ Report marked as resolved",
      report: updated,
    });
  } catch (err) {
    console.error("Error updating report status:", err);
    res.status(500).json({ error: "❌ Error updating status" });
  }
});

/**
 * DELETE /api/reports/:id
 * Delete a report by ID
 */
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

/**
 * GET /api/reports/stats
 * Fetch statistics for the Admin Dashboard
 */
router.get("/stats", async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const resolvedReports = await Report.countDocuments({ status: "resolved" });
    const pendingReports = await Report.countDocuments({ status: "pending" });

    // Reports per week (last 6 weeks)
    const last6Weeks = [...Array(6)].map((_, i) => {
      const start = new Date();
      start.setDate(start.getDate() - i * 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 7);
      return { start, end };
    }).reverse();

    const weeklyCounts = await Promise.all(
      last6Weeks.map(({ start, end }) =>
        Report.countDocuments({ createdAt: { $gte: start, $lt: end } })
      )
    );

    const weekLabels = last6Weeks.map(({ start }) =>
      `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
    );

    res.json({
      totalReports,
      resolvedReports,
      pendingReports,
      weeklyCounts,
      weekLabels,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "❌ Error fetching stats" });
  }
});

module.exports = router;
