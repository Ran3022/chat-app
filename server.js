const express = require('express');
const { createServer } = require('http');
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: { 
        origin: 'http://127.0.0.1:5500',
    },
});

io.on("connection", (socket) => {
    console.log(`New user connected: ${socket.id}`);
    socket.on("username enter", (data) => {
        console.log('username enter', data);

        io.emit('username enter', data)
        });
        // send message to all clients except the sender
        socket.on('message', (data) => {
            console.log('message', data);
            io.emit("message", data);
            });
        socket.on("username left", (username) => {
            io.emit("username left", username);
        })
  });

httpServer.listen(3000, () => {
    console.log(`Listening on port 3000`);
})

// nodemon=> dependency

// chat app
// Socket.io --> library which helps is to chat
// us - client and server

// there is a whatsapp group 
// clint-- group member
// click and send --> server --> send and messege back to clint

// socket.io is a library which helps us to communication between a client and a server.

