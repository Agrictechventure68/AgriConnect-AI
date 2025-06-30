const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  // Simulate AI response for now
  const mockAnswer = `🧠 You asked: "${prompt}" — This is a sample AI response.`;

  res.json({ reply: mockAnswer });
});

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  // Simulate AI response for now
  const mockAnswer = `🧠 You asked: "${prompt}" — This is a sample AI response.`;

  res.json({ reply: mockAnswer });
});
app.post('/api/ask', async (req, res) => {
  const { question } = req.body;

  try {
    const aiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = aiResponse.data.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

