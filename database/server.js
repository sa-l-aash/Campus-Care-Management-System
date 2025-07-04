const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const reportRoutes = require("./routes/reportRoutes"); // ✅ Import report routes
const complaintRoutes = require("./routes/complaintRoutes"); // ✅ Import complaint routes

dotenv.config(); // ✅ Load .env variables

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "10mb", type: "application/json" })); // handle large JSON payloads
app.use(express.urlencoded({ extended: true })); // handle form data

// ✅ Mount API routes
app.use("/api/reports", reportRoutes);
app.use("/api/complaints", complaintRoutes); // ✅ Register complaint routes

// ✅ Example test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
