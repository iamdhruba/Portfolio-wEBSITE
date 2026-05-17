'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
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
  const theme = useOSStore(state => state.theme);
  const isDark = theme === 'dark';
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hi there! I am Dhruba Raj Chaudhary.', sender: 'contact', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'text' },
    { id: 2, text: 'You can ask me about my skills, experience, education, or how to contact me!', sender: 'contact', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    const newMsg: Message = { id: Date.now(), text: userText, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'text' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      let replyText = "That's interesting! I'd love to chat more about that. You can ask me about my specific tech stack, the projects I've built, or how to get in touch for a collaboration.";
      const lowerInput = userText.toLowerCase();

      const keywords = {
        skills: ["skill", "tech", "stack", "language", "coding", "program"],
        experience: ["experience", "work", "job", "career", "history"],
        education: ["education", "study", "college", "university", "degree", "csit"],
        contact: ["contact", "email", "hire", "reach", "message", "linkedin"],
        projects: ["project", "portfolio", "build", "make", "create", "app"],
        greetings: ["hello", "hi", "hey", "yo", "morning", "evening"]
      };

      if (keywords.skills.some(k => lowerInput.includes(k))) {
        replyText = "I'm a Full Stack specialist. My core arsenal includes React, Next.js, and Node.js for web, plus Flutter for high-performance mobile apps. I also have deep experience with Firebase, MongoDB, and SQL databases.";
      } else if (keywords.experience.some(k => lowerInput.includes(k))) {
        replyText = "I've been working as a freelance Full Stack developer since 2022. I've delivered complex platforms like the Trust Nepal Escrow system and various modern job portals, focusing on security and fluid user experiences.";
      } else if (keywords.education.some(k => lowerInput.includes(k))) {
        replyText = "I am currently pursuing my Bachelor in Computer Science and Information Technology (BSc. CSIT) at Ambikeshwari Campus, Tribhuvan University. My studies focus on software architecture and algorithmic efficiency.";
      } else if (keywords.contact.some(k => lowerInput.includes(k))) {
        replyText = "The best way to reach me is via email at dhrubaraj977@gmail.com or via phone at +977-9705402345 for any professional inquiries!";
      } else if (keywords.projects.some(k => lowerInput.includes(k))) {
        replyText = "You can see my highlighted work in the 'Projects' app on the desktop. I'm particularly proud of my Escrow Nepal system and this very macOS Portfolio OS you're interacting with right now!";
      } else if (keywords.greetings.some(k => lowerInput.includes(k))) {
        replyText = "Hello! I'm Dhruba's AI assistant. I'm here to help you navigate his work and background. What would you like to know?";
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
    <div className={`flex h-full w-full font-sans overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-black/40 text-white' : 'bg-white/80 text-black'
    } backdrop-blur-3xl`}>
      {/* Sidebar - iMessage Style */}
      <div className={`w-64 md:w-80 border-r flex flex-col transition-colors duration-300 ${
        isDark ? 'border-white/10 bg-black/20' : 'border-black/10 bg-white/40'
      }`}>
        <div className="h-14 flex items-center justify-between px-4">
          <div className="flex space-x-2">
            <button className={`p-1.5 rounded-lg transition-colors ${
              isDark ? 'hover:bg-white/10 text-blue-400' : 'hover:bg-black/5 text-blue-500'
            }`}>
              <SquarePen size={16} />
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-[13px] font-semibold tracking-wide">Messages</span>
          </div>
          <div className="w-8" /> {/* Spacer */}
        </div>

        <div className="px-4 mb-3">
          <div className="relative group">
            <Search className={`absolute left-2.5 top-1.5 h-3.5 w-3.5 transition-colors ${
              isDark ? 'text-white/40 group-focus-within:text-white/70' : 'text-black/40 group-focus-within:text-black/70'
            }`} />
            <input 
              type="text" 
              placeholder="Search" 
              className={`w-full rounded-md py-1 pl-8 pr-3 text-[13px] outline-none transition-all ${
                isDark 
                  ? 'bg-white/10 text-white placeholder:text-white/40 focus:bg-white/20 focus:ring-1 focus:ring-white/30' 
                  : 'bg-black/5 text-black placeholder:text-black/40 focus:bg-black/10 focus:ring-1 focus:ring-black/20'
              }`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar px-2 space-y-1 pb-2">
          {CONTACTS.map(contact => (
            <div 
              key={contact.id}
              className={`flex items-center p-2 rounded-lg space-x-3 cursor-pointer transition-all duration-200 ${
                contact.active 
                  ? 'bg-blue-500 shadow-md text-white' 
                  : isDark ? 'hover:bg-white/10 text-white/90' : 'hover:bg-black/5 text-black/90'
              }`}
            >
              <div className={`h-11 w-11 rounded-full ${contact.color} flex items-center justify-center text-white font-semibold text-lg shadow-inner ring-1 ring-white/20`}>
                {contact.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-[13px] font-semibold truncate ${contact.active ? 'text-white' : ''}`}>{contact.name}</span>
                  <span className={`text-[10px] ${contact.active ? 'text-white/80' : isDark ? 'text-white/50' : 'text-black/50'}`}>{contact.time}</span>
                </div>
                <p className={`text-[12px] truncate ${contact.active ? 'text-white/90' : isDark ? 'text-white/60' : 'text-black/60'}`}>{contact.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Chat Header */}
        <div className={`h-14 border-b flex items-center justify-between px-5 transition-colors duration-300 ${
          isDark ? 'border-white/10 bg-black/20' : 'border-black/10 bg-white/40'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold">Dhruba Raj</span>
              <span className={`text-[10px] ${isDark ? 'text-white/50' : 'text-black/50'}`}>iMessage</span>
            </div>
          </div>
          <div className={`flex items-center space-x-4 ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>
            <button className={`p-1.5 rounded-md transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
              <Video size={16} />
            </button>
            <button className={`p-1.5 rounded-md transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
              <Info size={16} />
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-2 hide-scrollbar">
          {messages.map((m, i) => {
            const isFirstInGroup = i === 0 || messages[i-1].sender !== m.sender;
            const isLastInGroup = i === messages.length - 1 || messages[i+1].sender !== m.sender;
            
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
                key={m.id} 
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} ${isFirstInGroup ? 'mt-4' : 'mt-0.5'}`}
              >
                {m.type === 'image' ? (
                  <div className="max-w-[70%] rounded-2xl overflow-hidden shadow-sm border border-white/10">
                    <img src={m.src} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`relative max-w-[75%] md:max-w-[60%] px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
                    m.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-2xl' 
                      : isDark ? 'bg-white/10 text-white rounded-2xl ring-1 ring-white/5' : 'bg-black/5 text-black rounded-2xl ring-1 ring-black/5'
                  } ${
                    isLastInGroup 
                      ? (m.sender === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm') 
                      : ''
                  }`}>
                    {m.text}
                  </div>
                )}
                {isLastInGroup && m.sender === 'user' && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-[10px] mr-1 mt-1 ${isDark ? 'text-white/40' : 'text-black/40'}`}
                  >
                    Delivered
                  </motion.span>
                )}
              </motion.div>
            );
          })}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start mt-2"
            >
              <div className={`rounded-2xl px-4 py-3 flex items-center space-x-1.5 shadow-sm ${
                isDark ? 'bg-white/10 ring-1 ring-white/5' : 'bg-black/5 ring-1 ring-black/5'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full animate-bounce ${isDark ? 'bg-white/50' : 'bg-black/50'}`} style={{ animationDelay: '0s' }} />
                <span className={`h-1.5 w-1.5 rounded-full animate-bounce ${isDark ? 'bg-white/50' : 'bg-black/50'}`} style={{ animationDelay: '0.1s' }} />
                <span className={`h-1.5 w-1.5 rounded-full animate-bounce ${isDark ? 'bg-white/50' : 'bg-black/50'}`} style={{ animationDelay: '0.2s' }} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Bar */}
        <div className={`p-4 transition-colors duration-300 ${
          isDark ? 'bg-black/20 border-t border-white/5' : 'bg-white/40 border-t border-black/5'
        }`}>
          <div className="flex items-center space-x-3">
            <button className={`p-1.5 rounded-full transition-colors ${
              isDark ? 'text-white/50 hover:bg-white/10' : 'text-black/50 hover:bg-black/5'
            }`}>
              <Plus size={20} />
            </button>
            <div className="flex-1 relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="iMessage"
                className={`w-full rounded-full py-1.5 pl-4 pr-20 text-[14px] outline-none transition-all shadow-sm ${
                  isDark 
                    ? 'bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/20' 
                    : 'bg-white/80 border border-black/10 text-black placeholder:text-black/40 focus:border-black/30 focus:bg-white'
                }`}
              />
              <div className={`absolute right-3 flex items-center space-x-2 ${
                isDark ? 'text-white/40' : 'text-black/40'
              }`}>
                <button className={`transition-colors ${isDark ? 'hover:text-white/80' : 'hover:text-black/80'}`}>
                  <Mic size={16} />
                </button>
                <button className={`transition-colors ${isDark ? 'hover:text-white/80' : 'hover:text-black/80'}`}>
                  <Smile size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
