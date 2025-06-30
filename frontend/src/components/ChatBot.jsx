import React, { useState } from 'react';

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      });

      const data = await res.json();
      setResponse(data.reply || 'No response');
    } catch (err) {
      setResponse('⚠ Error connecting to the AI assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">AgriConnect AI Assistant</h2>
      <textarea
        rows="3"
        className="w-full p-2 border rounded mb-2"
        placeholder="Ask a question about your crops..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleSend}
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>
      <div className="mt-4 p-3 bg-gray-100 border rounded">
        <strong>AI Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatBot;

