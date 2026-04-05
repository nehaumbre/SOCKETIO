import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  // Automatically scroll to the bottom whenever a new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  // Send message when the Enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={{ 
      maxWidth: "500px", 
      margin: "50px auto", 
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      borderRadius: "16px",
      overflow: "hidden",
      backgroundColor: "#fff"
    }}>
      {/* Header */}
      <header style={{ 
        background: "linear-gradient(135deg, #9bfa88, #1ad82a)", 
        padding: "20px", 
        color: "white",
        display: "flex",
        alignItems: "center",
        gap: "15px"
      }}>
        <div style={{ width: "40px", height: "40px", backgroundColor: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
          💬
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.2rem" }}>Global Chat</h1>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#d1e7ff" }}>🟢 Online</p>
        </div>
      </header>
      
      {/* Chat Messages Area */}
      <section 
        style={{ 
          height: "400px", 
          overflowY: "auto", 
          padding: "15px", 
          backgroundColor: "#e5ded8"
        }}
      >
        {messages.map((msg, index) => (
          <div 
            key={index} 
            style={{ 
              padding: "12px 16px", 
              backgroundColor: "#fff", 
              margin: "10px 0", 
              borderRadius: "15px 15px 15px 0",
              width: "fit-content",
              maxWidth: "80%",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              color: "#303030",
              fontSize: "0.95rem"
            }}
          >
            {msg}
          </div>
        ))}
        {/* This empty div acts as our scroll target */}
        <div ref={messagesEndRef} />
      </section>

      {/* Input Area */}
      <div style={{ 
        display: "flex", 
        gap: "10px", 
        padding: "15px", 
        backgroundColor: "#f0f2f5" 
      }}>
        <input
          type="text"
          value={messageInput}
          placeholder="Type your Message..."
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ 
            flex: 1, 
            padding: "12px 20px", 
            borderRadius: "24px", 
            border: "none", 
            outline: "none",
            fontSize: "1rem"
          }}
        />
        <button 
          onClick={sendMessage}
          style={{ 
            padding: "0 20px", 
            borderRadius: "24px", 
            border: "none", 
            backgroundColor: "#37ff62", 
            color: "white", 
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.2s"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
