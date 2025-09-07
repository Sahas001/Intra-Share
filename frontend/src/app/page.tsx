"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/messages").then(res => {
      setMessages(res.data.messages);
    });
  }, []);

  const sendMessage = async () => {
    await axios.post("http://localhost:8080/messages", { text });
    const res = await axios.get("http://localhost:8080/messages");
    setMessages(res.data.messages);
    setText("");
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">LocalNet Chat MVP</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
      <ul className="w-full max-w-md space-y-2">
        {messages.map((m, i) => (
          <li key={i} className="p-2 bg-gray-100 rounded text-red-400">
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}

