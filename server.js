const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();


const server = app.listen(0, () => {
  console.log(
    `🚀 Server is live at: http://localhost:${server.address().port}`
  );
});


const io = socketIo(server, {
  cors: {
    origin: "https://instagroup.vercel.app", // Allow all origins or specify your Vercel app domain
    methods: ["GET", "POST"],
    credentials: true
  },
});

const path = require("path");

app.use(cors({
    origin: 'https://instagroup.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("joinChat", (username) => {
    socket.username = username;
    io.emit("userJoined", `${username}`);
  });

  socket.on("chatMessage", ({ username, message }) => {
    io.emit("chatMessage", { username, message });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("userJoined", `${socket.username} left the chat`);
    }
  });
});