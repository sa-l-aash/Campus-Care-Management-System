const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./db");
const reportRoutes = require("./routes/reportRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

dotenv.config(); // Load env variables

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ["https://campuscare-cac86.web.app", "http://localhost:3000"], // add all allowed frontends
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/complaints", complaintRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("🌐 Campus Care Backend is live!");
});

// WebSocket setup (if needed)
const io = new Server(server, {
  cors: {
    origin: ["https://campuscare-cac86.web.app", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io); // Accessible in routes

io.on("connection", (socket) => {
  console.log("🔌 WebSocket client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
