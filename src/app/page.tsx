"use client"

import { useState } from "react";
import { io } from "socket.io-client";

// import styles from "./page.module.css";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // Connect with server
  const socket = io("https://suited-turtle-excited.ngrok-free.app");

  // Send input message to server
  const handleSendMessage = () => {
    // Send to server
    socket.emit("send_message", {
      message: message,
    });

    // Reset input after send
    setMessage("");
  };

  // Receive message from server
  socket.on("received_message", (data) => {
    // Append to message list
    setMessageList([...messageList, data]);
  });

  return (
    <div className={""}>
      <h2>Realtime Chat App</h2>
      <div className={""}>
        <input
          type="text"
          placeholder="Enter your message."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
      {messageList.map((chat) => (
        <div className={""} key={chat.message}>
          {chat.message}
        </div>
      ))}
    </div>
  );
}