
import React from 'react';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-grow">
        {/* Your main app content */}
        <ChatBot />
      </main>

      <Footer />
    </div>
  );
}

export default App;


