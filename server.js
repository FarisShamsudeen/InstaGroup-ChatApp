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
    origin: "*", // Allow all origins or specify your Vercel app domain
    // origin: "https://instagroup.vercel.app", 
    methods: ["GET", "POST"],
    credentials: true
  },
});

const path = require("path");

app.use(cors({
    // origin: 'https://instagroup.vercel.app', 
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
    console.log('Connection Started');
    socket.on("joinChat", (username) => {
        socket.username = username;
        io.emit("userJoined", `${username}`);
        console.log("New user connected");
  });

  socket.on("chatMessage", ({ username, message }) => {
    io.emit("chatMessage", { username, message });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("userJoined", `${socket.username} left the chat`);
      console.log(`${socket.username} left the chat`);
    }
  });
});