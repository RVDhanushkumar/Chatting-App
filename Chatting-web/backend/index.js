const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://dh-chat-go.vercel.app" || "http://localhost:3000", // Replace with frontend domain in production
        methods: ["GET", "POST"],
    },
});

app.use(cors());

// Socket.IO Events
io.on("connection", (socket) => {
    console.log(`Connected just now: ${socket.id}`);

    // Listen for incoming messages
    socket.on("send_msg", (data) => {
        console.log(`Message received from ${socket.id}: ${data}`);
        socket.broadcast.emit("recieve_msg", data);
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
        console.log(`Left: ${socket.id}`);
    });
});

// Routes
app.get("/", (req, res) => {
    res.json({ status: "Server is running", time: new Date().toISOString() });
});

app.get("*", (req, res) => {
    res.status(404).send("Page not found mr.star");
});

// Dynamic Port for Production
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
