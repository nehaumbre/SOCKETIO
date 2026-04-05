//1.Import packages 
import express from "express";
import http from "http";
import { Server } from "socket.io";

//2. Create an instance of express and http server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//3.Serve static files
app.use(express.static("public"))

//5. create a connection 
io.on("connection", (socket)=>{
    console.log("User Connected Successfully✅");

    socket.on("chat message", (msg)=>{
        io.emit("chat message", msg);
    })

    socket.on("disconnect", ()=>{
        console.log("User Disconnected❌");
    })
})

//4. Start the server
const PORT = 3000
server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})