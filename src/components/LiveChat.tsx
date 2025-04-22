
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Clock } from "lucide-react";

// In a real implementation, this would be replaced with your actual chat service
// (Intercom, Drift, etc.)
const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{text: string; from: 'user' | 'agent'; time: string}>>([]);
  const [isAvailable, setIsAvailable] = useState(true);
  
  // Check if within operating hours (9:00-20:00 GMT+2)
  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      // Convert to GMT+2
      const hours = (now.getUTCHours() + 2) % 24;
      setIsAvailable(hours >= 9 && hours < 20);
    };
    
    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);
  
  const toggleChat = () => {
    setIsOpen(prev => !prev);
    
    // If opening the chat and it's empty, add a welcome message
    if (!isOpen && messages.length === 0) {
      const welcomeMessage = {
        text: "Hello! How can I help you with your application for the Vocal Excellence Workshop?",
        from: 'agent' as const,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMessage]);
    }
  };
  
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const userMessage = {
      text: message,
      from: 'user' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    
    // Simulate agent response
    setTimeout(() => {
      const agentMessage = {
        text: "Thank you for your message! Our team will respond shortly. In the meantime, can I help with anything specific about the workshop?",
        from: 'agent' as const,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-apple-blue text-white 
                  shadow-lg flex items-center justify-center hover:bg-apple-blue-hover transition-colors duration-200"
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Live chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] h-[450px] bg-white rounded-2xl shadow-xl 
                      flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Chat header */}
            <div className="px-4 py-3 bg-apple-blue text-white flex items-center justify-between">
              <div>
                <h3 className="font-medium">Vocal Excellence Support</h3>
                <div className="flex items-center text-sm">
                  {isAvailable ? (
                    <>
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span>Online now</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Available 09:00-20:00 GMT+2</span>
                    </>
                  )}
                </div>
              </div>
              <button 
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`mb-4 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.from === 'user' 
                      ? 'bg-apple-blue text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.from === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chat input */}
            <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-apple-blue text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-apple-blue-hover transition-colors"
                  disabled={!message.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;
