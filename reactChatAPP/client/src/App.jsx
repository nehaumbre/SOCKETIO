import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div>
      <h1>Simple Chat App</h1>
      <input
        type="text"
        value={messageInput}
        placeholder="Type your Message"
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      {/* Render all the messages */}

      <section>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </section>
    </div>
  );
};

export default App;
