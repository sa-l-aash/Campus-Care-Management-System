const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./db");
const reportRoutes = require("./routes/reportRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

dotenv.config(); // Load .env variables

const app = express();
const server = http.createServer(app); // 👈 create raw HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // ⚠️ Adjust this for production
  },
});

// ✅ Make io accessible from routes (e.g., to emit events)
app.set("io", io);

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/reports", reportRoutes);
app.use("/api/complaints", complaintRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🌐 Campus Care Backend is live!");
});

// ✅ WebSocket connection
io.on("connection", (socket) => {
  console.log("🔌 Client connected");

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
