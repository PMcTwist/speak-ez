// setup server to use express
const express = require('express');
const app = express();

const http = require('http');
const cors = require('cors');

// Grab Server from socket.io
const { Server } = require('socket.io');

// Enable outside access to front end
app.use(cors());

// Set server to be http
const server = http.createServer(app);

// Create an io server and allow cors from front end
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});


const CHAT_BOT = 'ChatBot';

let chatRoom = ''; // Name of the room
let allUsers = []; // List of people in the room 


// Listen for whent he client connects via socket.io-client
io.on('connection', (socket => {
    console.log(`User connected: ${socket.id}`);

    // Listens for the join_room event
    socket.on('join_room', (data) => {
        const { username, room } = data; // grabs info fromt he data sent
        socket.join(room) // Join the user to a socket room

        let __createdTime__ = Date.now(); // Grab the time
        // Send message to all users when new user joins the room
        socket.to(room).emit('receive_message', {
            message: `${username} has join the room`,
            username: CHAT_BOT,
            __createdTime__,
        })

        socket.emit('recieve_message', {
            message: `Welcome ${username}`,
            username: CHAT_BOT,
            __createdTime__,
        })

        // Set room name dynamically
        chatRoom = room;
        // Add user to list of users in the room
        allUsers.push({ id: socket.id, username, room });
        // Remove your user from the shown list for you
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        //Send signals to update the users in the room list
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);
    });
}))

// setup port to listen for connection
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
