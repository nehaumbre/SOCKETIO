# SOCKETIO
 Socket.IO Mastery:

### ```io.on('connection', callback)```- method used to register event listeners for different events that occur on server side. The io object represents the main Socket.io server instance 

In Short:
io.on is the "Welcome!" event. It happens once per person when they first arrive.

socket.on is the "How can I help you?" event. It handles the specific messages (like chat, moves in a game, or data updates) sent by that one person.

Key Difference: io manages the entire crowd, while socket manages the individual.