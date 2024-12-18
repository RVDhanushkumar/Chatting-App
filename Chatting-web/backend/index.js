const express = require("express");
const http = require("http");
const cors = require("cors");
const database = require("./database/db.js"); 
const user = require("./modules/userSchema.js"); 
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" }));
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`Connected just now: ${socket.id}`);

    socket.on("send_msg", (data) => {
        console.log(`Message received from ${socket.id}: ${data}`);
        socket.broadcast.emit("recieve_msg", data);
    });

    socket.on("disconnect", () => {
        console.log(`Left: ${socket.id}`);
    });
});

app.post("/register", async (req, res) => {
    const { name, username, pass } = req.body;
    try {
        const newUser = new user({
            name:name,
            username: username,
            password: pass,
        });
        await newUser.save();
        console.log("User registered successfully");
        res.status(201).json({message:"User registered successfully"});
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({message:"Error during registration"});
    }
});

app.post("/login", async (req, res) => {
    const { name, pass } = req.body;
    try {
        const foundUser = await user.findOne({ username: name });
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }
        if (foundUser.password === pass) {
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Login failed due to server error" });
    }
});

app.get("/",(req,res)=>{
    res.send("Server home page.....!!")
})
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
