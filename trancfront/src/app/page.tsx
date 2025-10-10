"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function SocketTest() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");

  useEffect(() => {
    // Connect to server
    socket = io("http://localhost:3001");

    // Listen for welcome message
    socket.on("welcome", (msg: string) => {
      setMessages((prev) => [...prev, "your id : " + msg]);
    });

    // Listen for broadcasted messages
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data.message + " from " + data.socketId]);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;
    socket.emit("message",{
      id: input2,
      message: input
    }); // send to server
    setMessages((messages) => [...messages, `Me: ${input}`]);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Socket.IO Test</h1>
      <div
        style={{
          border: "1px solid #ccc",
          height: 200,
          overflowY: "auto",
          padding: 10,
          marginBottom: 10,
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        style={{ marginRight: 10 }}
      />
      <input
        type="text"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        placeholder="id"
        style={{ marginRight: 10 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
