'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Smile, 
  Mic, 
  Video, 
  Info, 
  Search, 
  SquarePen,
  ChevronLeft
} from 'lucide-react';

const CONTACTS = [
  { id: 1, name: 'Dhruba Raj', lastMsg: 'Feel free to ask me anything!', time: 'Now', active: true, color: 'bg-gradient-to-tr from-blue-500 to-blue-600' },
];

interface Message {
  id: number;
  text?: string;
  sender: 'user' | 'contact';
  time: string;
  type?: 'text' | 'image';
  src?: string;
}

export default function ContactApp() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hi there! I am Dhruba Raj Chaudhary.', sender: 'contact', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'text' },
    { id: 2, text: 'You can ask me about my skills, experience, education, or how to contact me!', sender: 'contact', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    const newMsg: Message = { id: Date.now(), text: userText, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'text' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      let replyText = "I'm not sure I understand. You can ask me about my skills, projects, or how to hire me!";
      const lowerInput = userText.toLowerCase();

      if (lowerInput.includes('skill') || lowerInput.includes('tech')) {
        replyText = "I specialize in Flutter, React, Next.js, Node.js, and Firebase. I love building scalable applications!";
      } else if (lowerInput.includes('experience') || lowerInput.includes('work')) {
        replyText = "I have experience working as a full-stack developer, creating platforms like Trust Nepal Escrow and Job Portal.";
      } else if (lowerInput.includes('education') || lowerInput.includes('study')) {
        replyText = "I am currently pursuing a BSc. CSIT at Patan Multiple Campus (Tribhuvan University).";
      } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('hire')) {
        replyText = "You can reach me at dhrubarajchaudhary498@gmail.com or connect with me on LinkedIn!";
      } else if (lowerInput.includes('project') || lowerInput.includes('portfolio')) {
        replyText = "Check out the Projects app on my desktop to see my work, including Escrow Nepal and Typewriter App!";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        replyText = "Hello! How can I help you today?";
      }

      const reply: Message = { 
        id: Date.now() + 1, 
        text: replyText, 
        sender: 'contact', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="flex h-full w-full bg-white text-black font-sans overflow-hidden">
      {/* Sidebar - iMessage Style */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-[#f6f6f6]/80 backdrop-blur-xl">
        <div className="p-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <button className="p-1 hover:bg-gray-200 rounded-lg text-blue-500 transition-colors">
              <SquarePen size={18} />
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-[13px] font-semibold">Messages</span>
          </div>
          <div className="w-8" /> {/* Spacer */}
        </div>

        <div className="px-4 mb-2">
          <div className="relative">
            <Search className="absolute left-2 top-1.5 h-3.5 w-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-gray-200/50 rounded-lg py-1 pl-7 pr-3 text-[13px] outline-none placeholder:text-gray-500 focus:bg-gray-200 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {CONTACTS.map(contact => (
            <div 
              key={contact.id}
              className={`flex items-center p-3 space-x-3 cursor-pointer transition-colors ${contact.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-200/50'}`}
            >
              <div className={`h-12 w-12 rounded-full ${contact.color} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                {contact.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-[14px] font-semibold truncate ${contact.active ? 'text-white' : 'text-black'}`}>{contact.name}</span>
                  <span className={`text-[11px] ${contact.active ? 'text-white/70' : 'text-gray-400'}`}>{contact.time}</span>
                </div>
                <p className={`text-[13px] truncate ${contact.active ? 'text-white/80' : 'text-gray-500'}`}>{contact.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 bg-white/80 backdrop-blur-xl">
          <div className="flex items-center space-x-2">
            <span className="text-[14px] font-semibold">Dhruba Raj</span>
            <span className="text-[10px] text-gray-400">iMessage</span>
          </div>
          <div className="flex items-center space-x-4 text-blue-500">
            <Video size={18} className="cursor-pointer hover:opacity-70" />
            <Info size={18} className="cursor-pointer hover:opacity-70" />
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 hide-scrollbar">
          {messages.map((m, i) => {
            const isFirstInGroup = i === 0 || messages[i-1].sender !== m.sender;
            const isLastInGroup = i === messages.length - 1 || messages[i+1].sender !== m.sender;
            
            return (
              <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} ${isFirstInGroup ? 'mt-4' : 'mt-0.5'}`}>
                {m.type === 'image' ? (
                  <div className="max-w-[70%] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <img src={m.src} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`relative max-w-[70%] px-4 py-2 text-[14px] leading-tight ${
                    m.sender === 'user' 
                      ? 'bg-[#34c759] text-white rounded-2xl' 
                      : 'bg-[#e9e9eb] text-black rounded-2xl'
                  } ${
                    isLastInGroup 
                      ? (m.sender === 'user' ? 'rounded-br-md' : 'rounded-bl-md') 
                      : ''
                  }`}>
                    {m.text}
                  </div>
                )}
                {isLastInGroup && m.sender === 'user' && (
                  <span className="text-[10px] text-gray-400 mr-1 mt-1">Read</span>
                )}
              </div>
            );
          })}
          {isTyping && (
            <div className="flex flex-col items-start mt-2">
              <div className="bg-[#e9e9eb] rounded-2xl px-4 py-2 flex items-center space-x-1">
                <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar - iMessage Style */}
        <div className="p-4 bg-white">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Plus size={20} />
            </button>
            <div className="flex-1 relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="iMessage"
                className="w-full border border-gray-300 rounded-full py-1.5 pl-4 pr-20 text-[14px] outline-none focus:border-gray-400 transition-all shadow-inner"
              />
              <div className="absolute right-2 flex items-center space-x-2 text-gray-400">
                <Mic size={18} className="cursor-pointer hover:text-gray-600" />
                <Smile size={18} className="cursor-pointer hover:text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
