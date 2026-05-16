'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitBranch, 
  ExternalLink, 
  Search, 
  LayoutGrid, 
  List, 
  Star, 
  Clock, 
  Smartphone,
  Globe,
  Settings,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
  Play
} from 'lucide-react';
import { useWindowStore } from '@/store/useWindowStore';

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  { 
    id: 'trust-nepal',
    title: 'Trust Nepal Escrow', 
    category: 'Mobile',
    tech: 'Flutter, Node.js, eSewa', 
    desc: 'A sophisticated P2P escrow platform for secure transactions in Nepal. Integrated with local payment gateways and features real-time chat.', 
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070',
    repo: 'https://github.com/iamdhruba/Trust-Nepal---Escrow',
    live: '#',
    isHot: true
  },
  { 
    id: 'focusflow',
    title: 'Focusflow', 
    category: 'Mobile',
    tech: 'Flutter, Clean Architecture', 
    desc: 'Productivity and focus management app designed to help users manage tasks and stay concentrated using the Pomodoro technique.', 
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072',
    repo: 'https://github.com/iamdhruba/Focusflow',
    live: '#'
  },
  { 
    id: 'confess-nepal',
    title: 'Confess Nepal', 
    category: 'Web',
    tech: 'Flutter, Node.js, Socket.io', 
    desc: 'Anonymous social confession platform. Features real-time feeds, anonymous interactions, and community moderation.', 
    img: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=2071',
    repo: 'https://github.com/iamdhruba/Confess-Nepal',
    live: '#'
  },
  { 
    id: 'job-portal',
    title: 'Job Portal', 
    category: 'Web',
    tech: 'React, MongoDB, Docker', 
    desc: 'Full-stack recruitment portal with employer dashboards, candidate management, and real-time communication tools.', 
    img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072',
    repo: 'https://github.com/iamdhruba/Job-Portal',
    live: '#'
  },
  { 
    id: 'typewriter',
    title: 'Veg Typing', 
    category: 'Utility',
    tech: 'React, Vite, CSS', 
    desc: 'High-performance utility for practicing Nepali typing with real-time accuracy and WPM tracking.', 
    img: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=1973',
    repo: 'https://github.com/iamdhruba/Veg-Typing',
    live: '#'
  },
  { 
    id: 'loksewa',
    title: 'Loksewa Tayari', 
    category: 'Mobile',
    tech: 'Flutter, Firebase', 
    desc: 'Comprehensive preparation application for Nepal Public Service Commission (Loksewa) exams.', 
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070',
    repo: 'https://github.com/iamdhruba/Loksewa-Tayari',
    live: '#'
  },
];

export default function ProjectsApp() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'small' | 'list'>('grid');
  const [runningProject, setRunningProject] = useState<string | null>(null);

  const filtered = PROJECTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.tech.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Web', 'Mobile', 'Utility'];

  const { openWindow } = useWindowStore();
  const handleRunLocal = async (project: any) => {
    setRunningProject(project.id);
    
    // Pass the repo URL via localStorage
    localStorage.setItem('vscode_target_repo', project.repo);
    
    // Open the VS Code App within the OS
    openWindow('vscode');
    
    setTimeout(() => setRunningProject(null), 500);
  };

  return (
    <div className="flex h-full w-full bg-[#1c1c1c] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-56 bg-[#252525] border-r border-black/30 flex flex-col p-4">
        <h2 className="text-[11px] font-bold text-white/30 uppercase tracking-widest mb-4 px-2">Navigation</h2>
        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[13px] transition-colors ${
                activeCategory === cat ? 'bg-blue-600 text-white' : 'text-white/70 hover:bg-white/5'
              }`}
            >
              {cat === 'All' && <LayoutGrid size={14} />}
              {cat === 'Web' && <Globe size={14} />}
              {cat === 'Mobile' && <Smartphone size={14} />}
              {cat === 'Utility' && <Settings size={14} />}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto p-3 bg-white/5 rounded-xl border border-white/10">
          <p className="text-[10px] text-white/40 leading-tight">
            Click <Play size={8} className="inline" /> to instantly view or run projects in a virtual VS Code environment.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Toolbar */}
        <div className="h-14 border-b border-black/30 flex items-center justify-between px-6 bg-[#1c1c1c]/50 backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold tracking-tight">Project Explorer</h1>
            <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white/20 shadow-sm' : 'text-white/40 hover:text-white'}`}
                title="Large Grid"
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('small')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'small' ? 'bg-white/20 shadow-sm' : 'text-white/40 hover:text-white'}`}
                title="Small Grid"
              >
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-current rounded-sm opacity-50" />
                  <div className="w-1.5 h-1.5 bg-current rounded-sm opacity-50" />
                  <div className="w-1.5 h-1.5 bg-current rounded-sm opacity-50" />
                  <div className="w-1.5 h-1.5 bg-current rounded-sm opacity-50" />
                </div>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white/20 shadow-sm' : 'text-white/40 hover:text-white'}`}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
              <input 
                type="text" 
                placeholder="Search projects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-black/20 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs w-56 outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Projects Display */}
        <div className="flex-1 overflow-y-auto p-6 hide-scrollbar bg-[#1c1c1c]">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div
                    layout
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    className="group relative flex flex-col bg-[#2a2a2a] rounded-xl border border-white/5 overflow-hidden hover:border-blue-500/30 transition-all shadow-xl"
                  >
                    {/* Hot Badge */}
                    {p.isHot && (
                      <div className="absolute top-2 right-2 z-10 flex items-center space-x-1 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-lg">
                        <Zap size={8} fill="currentColor" />
                        <span>HOT</span>
                      </div>
                    )}

                    <div className="aspect-[16/10] relative overflow-hidden bg-black/40">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] via-transparent to-transparent" />
                      
                      {/* Play Hover Overlay */}
                      <button 
                        onClick={() => handleRunLocal(p)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]"
                      >
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center shadow-xl scale-75 group-hover:scale-100 transition-transform">
                          {runningProject === p.id ? (
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Play size={18} fill="white" className="ml-0.5" />
                          )}
                        </div>
                      </button>
                    </div>

                    <div className="p-3.5 flex flex-col flex-1">
                      <div className="flex items-center space-x-1.5 mb-1.5">
                        {p.category === 'Mobile' ? <Smartphone size={12} className="text-blue-400" /> : <Globe size={12} className="text-purple-400" />}
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">{p.category}</span>
                      </div>
                      <h3 className="text-sm font-bold mb-1 tracking-tight truncate">{p.title}</h3>
                      <p className="text-[11px] text-white/50 mb-3 line-clamp-2 leading-snug">{p.desc}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {p.tech.split(', ').slice(0, 3).map(t => (
                          <span key={t} className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded-md border border-white/5 text-white/60 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-2.5">
                        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                          <GitBranch size={14} />
                        </a>
                        <button className="flex items-center space-x-1 text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider">
                          <span>Details</span>
                          <ExternalLink size={10} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : viewMode === 'small' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div
                    layout
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    className="group relative flex flex-col bg-[#2a2a2a] rounded-xl border border-white/5 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-black/40">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <button 
                        onClick={() => handleRunLocal(p)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60"
                      >
                        <Play size={20} fill="white" />
                      </button>
                    </div>
                    <div className="p-3 flex flex-col">
                      <h3 className="text-[13px] font-bold truncate">{p.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[9px] text-white/30 uppercase font-medium">{p.category}</span>
                        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                          <GithubIcon size={12} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
                >
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden shadow-lg">
                    <img src={p.img} alt="" className="h-full w-full object-cover" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRunLocal(p); }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play size={16} fill="white" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold tracking-tight">{p.title}</h3>
                    <p className="text-xs text-white/40 line-clamp-1">{p.desc}</p>
                  </div>
                  <div className="hidden lg:flex flex-wrap gap-1.5 max-w-[200px] justify-end">
                    {p.tech.split(', ').slice(0, 3).map(t => (
                      <span key={t} className="text-[9px] bg-white/10 px-2 py-0.5 rounded-md text-white/60">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 text-white/30 px-6 group-hover:text-white transition-colors border-l border-white/10 ml-4">
                    <a href={p.repo} target="_blank" rel="noopener noreferrer"><GithubIcon size={18} /></a>
                    <ExternalLink size={18} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
