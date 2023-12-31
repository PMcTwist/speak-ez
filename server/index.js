// Setup dotenv and pass in secrects
require('dotenv').config();

// setup server to use express
const express = require('express');
const app = express();

const http = require('http');
const cors = require('cors');

// Grab Server from socket.io
const { Server } = require('socket.io');

// Setup database connectors
const harperSaveMessage = require('./services/harper-save-message');
const harperGetMessages = require('./services/harper-get-messages');

// Setup utility calls
const leaveRoom = require('./utils/leave-room');

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
        socket.to(room).emit('get_message', {
            message: `${username} has join the room`,
            username: CHAT_BOT,
            __createdTime__,
        })

        socket.emit('get_message', {
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

        // Setup the socket for sending a message
        socket.on('send_message', (data) => {
            const { message, username, __createdTime__ } = data;
            io.in(room).emit('get_message', data);
            harperSaveMessage(message, username, room, __createdTime__)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        })

        harperGetMessages(room)
            .then((last100Messages) => {
                socket.emit('last_100_messages', last100Messages);
            })
            .catch((err) => console.log(err));

        socket.on('disconnect', () => {
            console.log('User dropped off')
            const user = allUsers.find((user) => user.id == socket.id)
            if (user?.username) {
                allUsers = leaveRoom(socket.id, allUsers)
                socket.to(chatRoom).emit('chatroom_users', allUsers);
                socket.to(chatRoom).emit('get_message', {
                    message: `${user.username} has left the building...`
                })
            }
        })
    });

    // leave room socket call
    socket.on('leave_room', (data) => {
        const { username, room } = data;
        socket.leave(room);
        const __createdTime__ = Date.now();

        // Remove the user from the server memory 
        allUsers = leaveRoom(socket.id, allUsers);
        socket.to(room).emit('chatroom_users', allUsers);
        console.log(allUsers)
        socket.to(room).emit('get_message', {
            username: CHAT_BOT,
            message: `${username} has left the room`,
            __createdTime__,
        })
    });
}))

// setup port to listen for connection
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
