
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', marginTop: '2rem', backgroundColor: '#f0f0f0' }}>
      <p>
        🔗 <a href="https://github.com/Agrictechventure68/AgriConnect-AI" target="_blank" rel="noreferrer">GitHub Repo</a> | 
        📄 <a href="/pitch-deck/AgriConnect_pitchDeck.pdf" target="_blank" rel="noreferrer">Pitch Deck</a>
      </p>
      <p>© {new Date().getFullYear()} AgriConnect AI</p>
    </footer>
  );
};

export default Footer;

