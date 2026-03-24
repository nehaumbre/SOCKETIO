// 1. packages
import express from 'express';
import http from 'http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
// 2. Instances
const app = express();
const server = http.createServer(app)
const io = new Server(server)
// 3. serving html files
const __dirname = dirname(fileURLToPath(import.meta.url))
// console.log(__dirname, "index.html"); // this is only for understanding the path
app.get('/', (req,res) =>  res.sendFile(join(__dirname, "index.html")))
// 4. Define  a connection event handler
io.on('connection', (client)=>{
    console.log("A user connected with id: ", client.id);
    // console.log(socket); // for your information only
    client.on("disconnect", () => {
        console.log("Disconnected from (client) 💔");
    })
})
// 5. Start the server 
const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server is running 💚 on port ${PORT}`))