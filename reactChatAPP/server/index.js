// Packages
import express from 'express';
import {createServer} from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

//Configuration
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

//middleware
app.use(cors());


//socket.io connection

io.on('connection', (socket)=>{
    console.log('New Client connected');

    socket.on('message', (message) => {
        console.log('Received message:', message);
        io.emit('message', message);
    });


    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
})


//run the server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


