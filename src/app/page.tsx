'use client';

import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  message: string;
}

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io('https://suited-turtle-excited.ngrok-free.app');

    socketIo.on('received_message', (data: Message) => {
      setMessageList((prevMessageList) => [...prevMessageList, data]);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && message.trim() !== '') {
      socket.emit('send_message', { message });
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Realtime Chat App</h2>
      <div>
        <input
          type="text"
          placeholder="Enter your message."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
      {messageList.map((chat, index) => (
        <div key={index}>{chat.message}</div>
      ))}
    </div>
  );
};

export default Home;
