import React, { useState } from 'react';

// 1. Define the TypeScript types for the chat messages
type Message = {
  text: string;
  sender: 'user' | 'ai';
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  // 2. Apply the 'Message' type to your state array
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! Describe your car issue, and I'll find the right service for you.", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    const currentInput = input;
    setInput('');

    try {
        // PASTE YOUR INVOKE URL ON THE LINE BELOW:
        const response = await fetch('https://ftiyko1l0f.execute-api.ap-south-1.amazonaws.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: currentInput })
        });
        const data = await response.json();
        
        setMessages(prev => [...prev, { text: data.reply, sender: 'ai' }]);
    } catch (error) {
        console.error("Chat connection failed");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">CARS IN Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">X</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-2 max-w-[80%] rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input 
              type="text" 
              value={input}
              /* 3. Add explicit React event types to 'e' */
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && sendMessage()}
              placeholder="My brakes are squeaking..." 
              className="flex-1 p-2 border rounded-md text-black"
            />
            <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded-md">Send</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
          💬 Chat with us
        </button>
      )}
    </div>
  );
}