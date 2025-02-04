# Instagroup Chat App

**Instagroup Chat App** is a real-time messaging application built with **Socket.io** that allows users to join a chat room, send messages, and communicate with others instantly. This project showcases how to create seamless, real-time chat experiences in web applications.

## Features

- **Real-time messaging**: Instant communication powered by Socket.io.
- **User authentication**: Users can join the chat by entering a username. Their username is saved in a cookie for easy re-login.
- **Chat interactions**: Users can send and receive messages instantly without refreshing the page.
- **User notifications**: Displays a message when a new user joins the chat room.
- **Leave chat option**: Users can leave the chat, which deletes their username cookie and reloads the page.

## Technologies Used

- **Socket.io**: Enables real-time communication between the client and server.
- **HTML5**: For building the structure and layout of the application.
- **CSS3**: For styling the chat UI.
- **JavaScript**: For client-side functionality (e.g., sending/receiving messages, managing cookies).
- **Node.js**: For the backend server (if you choose to integrate it in the future).

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/FarisShamsudeen/Instagroup-Chat-App.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Instagroup-Chat-App
   ```

3. Install the necessary dependencies (if any) with npm:

   ```bash
   npm install
   ```

4. Run the app locally:

   ```bash
   npm start
   ```

   Your application will now be available at `http://localhost:3030`.

## Usage

1. Open the app in your browser.
2. Enter a username in the provided modal to join the chat.
3. Once you’ve joined, start typing and send messages in real time.
4. Users can see messages from others and receive notifications when someone joins.
5. Leave the chat whenever you want by clicking the "Leave Chat" button.

## Future Improvements

- Host the app on a platform like Heroku or DigitalOcean.
- Add more user features like private messaging, emojis, or media sharing.
- Enhance security with user authentication (e.g., JWT or OAuth).

## Why Socket.io?

- **Real-Time Communication**: Socket.io allows for the creation of fast, bidirectional communication channels between clients and the server, making it perfect for chat applications.
- **Scalability**: As the app grows, Socket.io helps maintain smooth real-time interactions, even with many users.
- **Cross-Platform Compatibility**: Works seamlessly with both mobile and web clients, ensuring a consistent user experience.

## Contributing

Feel free to fork this project, make improvements, and open pull requests! I’d love to hear your ideas and contributions to make this project even better.

## License

This project is open source. Feel free to use it. 

