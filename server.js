const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
// const io = socketIo(server);
const io = socketIo(server, {
    cors: {
        origin: "*",  // Allow all origins or specify your Vercel app domain
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 6000
const path = require('path')
const cors = require("cors");
app.use(cors());


app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("joinChat", (username) => {
        socket.username = username;
        io.emit("userJoined", username);
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

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
