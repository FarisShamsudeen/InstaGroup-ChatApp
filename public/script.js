// const socket = io();
import { io } from 'socket.io-client';

const socket = io('https://instagroup.vercel.app', {
    transports: ['websocket', 'polling'],
    withCredentials: true
});

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const nameModal = document.getElementById("nameModal");
const usernameInput = document.getElementById("username");
const joinChatBtn = document.getElementById("joinChat");
const chatContainer = document.getElementById("chatContainer");
const leaveChatBtn = document.getElementById("leaveChat");

let username = "";

// Function to delete a cookie
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to get a cookie value
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

// Check if username exists in cookies
if (getCookie("username")) {
    username = getCookie("username");
    nameModal.style.display = "none";
    chatContainer.style.display = "block";
    socket.emit("joinChat", username);
} else {
    // Show modal for entering name
    nameModal.style.display = "block";
}

// Join chat when name is entered
joinChatBtn.addEventListener("click", () => {
    username = usernameInput.value.trim();
    if (username) {
        setCookie("username", username, 7); // Store username in cookie for 7 days
        nameModal.style.display = "none";
        chatContainer.style.display = "block";
        socket.emit("joinChat", username);
    }
});

// Send message
sendBtn.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit("chatMessage", { username, message });
        messageInput.value = "";
    }
});

// Listen for new messages
socket.on("chatMessage", ({ username: sender, message }) => {
    const div = document.createElement("div");
    div.classList.add("message");

    if (sender === username) {
        div.classList.add("sent"); // Align right for own messages
    } else {
        div.classList.add("received"); // Align left for others' messages
    }

    div.innerHTML = `<span class="username">${sender}</span> ${message}`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
});

// Notify when a new user joins
socket.on("userJoined", (newUser) => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.style.color = "gray";
    div.textContent = `${newUser} joined the chat`;
    chatBox.appendChild(div);
});

// Leave chat manually
leaveChatBtn.addEventListener("click", () => {
    deleteCookie("username");
    location.reload();
});
