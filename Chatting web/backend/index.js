const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin : process.env.CORS_ORIGIN || "https://chatting-app-rouge.vercel.app/",
        methods: ["GET","POST"],
    }
});

app.use(cors());

io.on("connection", (socket) => {
    console.log(`Connected just now: ${socket.id}`);

    socket.on("send_msg",(data)=>{
        socket.broadcast.emit("recieve_msg",data);
    })
    socket.on("disconnect",(socket)=>{
        console.log(`Left: ${socket.id}`);
    })
});

app.get("/", (req, res) => {
    res.send("HOME PAGE");
});

app.get("*", (req, res) => {
    res.send("Page not found mr.star");
});

server.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
