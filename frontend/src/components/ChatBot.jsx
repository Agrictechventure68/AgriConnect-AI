import React, { useState } from 'react';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user's message
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/API/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not OK');
      }

      const data = await response.json();

      const botMessage = {
        sender: 'bot',
        text: data.reply || 'No response from AI',
      };

      setMessages((prev) => [...prev, botMessage]);
      setInput('');
    } catch (err) {
      setError('Error connecting to AI assistant');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4 text-green-700">AgriConnect AI Assistant</h2>

      <div className="h-64 overflow-y-auto border border-gray-300 p-3 rounded mb-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}}>
            <span
              className={`inline-block px-4 py-2 rounded ${
                msg.sender === 'user' ? 'bg-green-200 text-black' : 'bg-gray-300 text-black'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <div className="text-center text-sm text-gray-500">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your crops..."
          className="flex-grow border border-gray-400 rounded-l px-4 py-2"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;


