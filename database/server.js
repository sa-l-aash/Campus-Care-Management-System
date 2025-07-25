const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./db");
const reportRoutes = require("./routes/reportRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

dotenv.config(); // Load environment variables

const app = express();
const server = http.createServer(app);

// WebSocket setup (Render allows websockets)
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*", // Use environment variable in production
  },
});

app.set("io", io); // Make io accessible from routes

connectDB(); // Connect to MongoDB

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/complaints", complaintRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🌐 Campus Care Backend is live!");
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("🔌 WebSocket client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Server start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
