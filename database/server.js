const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const reportRoutes = require("./routes/reportRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

dotenv.config(); // Load .env variables

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // handle large JSON payloads
app.use(express.urlencoded({ extended: true })); // handle form data

// ✅ API routes
app.use("/api/reports", reportRoutes);
app.use("/api/complaints", complaintRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🌐 Campus Care Backend is live!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
