const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 5000

app.use(express.static("public"));

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
