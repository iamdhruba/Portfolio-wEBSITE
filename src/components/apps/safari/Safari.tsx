'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCw, Lock, Share, Plus, X, Globe, AlertCircle, ExternalLink, Search, Clock, Bookmark, LayoutGrid } from 'lucide-react';
import PortfolioSite from './PortfolioSite';

interface Tab {
  id: string;
  url: string;
  inputValue: string;
  isExternal: boolean;
  externalUrl: string;
  history: string[];
  historyIndex: number;
  isNewTab: boolean;
}

export default function Safari() {
  const [tabs, setTabs] = useState<Tab[]>([{
    id: 'initial',
    url: 'dhruba.studio',
    inputValue: 'dhruba.studio',
    isExternal: false,
    externalUrl: '',
    history: ['dhruba.studio'],
    historyIndex: 0,
    isNewTab: false
  }]);
  const [activeTabId, setActiveTabId] = useState('initial');
  const [isLoading, setIsLoading] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const updateActiveTab = (updates: Partial<Tab>) => {
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, ...updates } : t));
  };

  const addTab = () => {
    const newId = Math.random().toString(36).substring(7);
    const newTab: Tab = {
      id: newId,
      url: '',
      inputValue: '',
      isExternal: false,
      externalUrl: '',
      history: [],
      historyIndex: -1,
      isNewTab: true
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const navigate = useCallback((target: string) => {
    const cleaned = target.trim();
    if (!cleaned) return;

    const isSearch = !cleaned.includes('.') && !cleaned.startsWith('http');
    let newExternal = false;
    let newUrl = '';
    let isStudio = cleaned.toLowerCase() === 'dhruba.studio';

    if (isSearch) {
      newUrl = `https://duckduckgo.com/?q=${encodeURIComponent(cleaned)}&kp=-1&kl=us-en`;
      newExternal = true;
    } else if (isStudio) {
      newExternal = false;
    } else {
      newUrl = cleaned.startsWith('http') ? cleaned : 'https://' + cleaned;
      newExternal = true;
    }

    const newHistory = [...activeTab.history.slice(0, activeTab.historyIndex + 1), cleaned];
    
    updateActiveTab({
      isExternal: newExternal,
      externalUrl: newUrl,
      inputValue: cleaned,
      url: cleaned,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      isNewTab: false
    });

    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  }, [activeTab, activeTabId]);

  const goBack = () => {
    if (activeTab.historyIndex <= 0) return;
    const newIndex = activeTab.historyIndex - 1;
    const target = activeTab.history[newIndex];
    updateActiveTab({
      historyIndex: newIndex,
      inputValue: target,
      url: target,
      isExternal: target !== 'dhruba.studio',
      externalUrl: target === 'dhruba.studio' ? '' : (target.startsWith('http') ? target : 'https://' + target),
      isNewTab: false
    });
  };

  const goForward = () => {
    if (activeTab.historyIndex >= activeTab.history.length - 1) return;
    const newIndex = activeTab.historyIndex + 1;
    const target = activeTab.history[newIndex];
    updateActiveTab({
      historyIndex: newIndex,
      inputValue: target,
      url: target,
      isExternal: target !== 'dhruba.studio',
      externalUrl: target === 'dhruba.studio' ? '' : (target.startsWith('http') ? target : 'https://' + target),
      isNewTab: false
    });
  };

  const handleShare = () => {
    const shareUrl = activeTab.isExternal ? activeTab.externalUrl : 'https://dhruba.studio';
    navigator.clipboard.writeText(shareUrl);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const isRestricted = activeTab.isExternal && 
    (activeTab.externalUrl.includes('google.com') || 
     activeTab.externalUrl.includes('facebook.com') || 
     activeTab.externalUrl.includes('youtube.com') || 
     activeTab.externalUrl.includes('twitter.com') ||
     activeTab.externalUrl.includes('github.com'));

  return (
    <div className="flex h-full w-full flex-col bg-[#1a1a1a] text-white">
      {/* Tab Bar */}
      <div className="flex items-center bg-[#2a2a2a] px-2 pt-2 space-x-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`group relative flex items-center min-w-[140px] max-w-[220px] h-9 px-3 rounded-t-lg cursor-pointer transition-all ${
              activeTabId === tab.id ? 'bg-[#3a3a3a] text-white' : 'text-white/40 hover:bg-[#323232]'
            }`}
          >
            {tab.isNewTab ? <Search size={12} className="mr-2" /> : <Globe size={12} className={`mr-2 flex-shrink-0 ${activeTabId === tab.id ? 'text-blue-400' : 'text-white/20'}`} />}
            <span className="text-[11px] font-medium truncate flex-1">{tab.isNewTab ? 'New Tab' : tab.inputValue}</span>
            <button
              onClick={(e) => closeTab(e, tab.id)}
              className="ml-2 p-1 rounded-full hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={10} />
            </button>
            {activeTabId === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
            )}
          </div>
        ))}
        <button onClick={addTab} className="p-2 rounded-md hover:bg-white/10 text-white/40 transition-colors">
          <Plus size={16} />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center space-x-3 border-b border-white/10 bg-[#3a3a3a] px-4 py-2.5">
        <div className="flex items-center space-x-1">
          <button onClick={goBack} disabled={activeTab.historyIndex <= 0} className="p-1.5 rounded hover:bg-white/10 disabled:opacity-20 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={goForward} disabled={activeTab.historyIndex >= activeTab.history.length - 1} className="p-1.5 rounded hover:bg-white/10 disabled:opacity-20 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex flex-1 items-center rounded-xl bg-black/40 border border-white/5 px-4 py-1.5 space-x-2 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
          {!activeTab.isNewTab && (
            isLoading
              ? <RotateCw size={12} className="text-blue-400 animate-spin flex-shrink-0" />
              : <Lock size={12} className="text-green-400/70 flex-shrink-0" />
          )}
          {activeTab.isNewTab && <Search size={12} className="text-white/40 flex-shrink-0" />}
          <input
            type="text"
            value={activeTab.inputValue}
            onChange={e => updateActiveTab({ inputValue: e.target.value })}
            onKeyDown={e => { if (e.key === 'Enter') navigate(activeTab.inputValue); }}
            onFocus={e => e.target.select()}
            className="flex-1 bg-transparent text-[13px] font-medium text-white/90 outline-none placeholder-white/20"
            placeholder="Search or enter website"
          />
        </div>

        <div className="flex items-center space-x-1">
          <button onClick={handleShare} className="p-2 rounded hover:bg-white/10 transition-colors relative">
            <Share size={16} className="opacity-60" />
            <AnimatePresence>
              {showShareToast && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="absolute bottom-full mb-3 right-0 bg-blue-600 text-[10px] px-3 py-1.5 rounded-lg font-bold shadow-xl whitespace-nowrap"
                >
                  LINK COPIED
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <button onClick={addTab} className="p-2 rounded hover:bg-white/10 transition-colors"><Plus size={16} className="opacity-60" /></button>
        </div>
      </div>

      {/* Loading Progress */}
      <div className="h-[2px] w-full bg-transparent overflow-hidden">
        {isLoading && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative bg-[#0f0f0f]">
        {activeTab.isNewTab ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
             <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-white/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] border border-white/5 rounded-full" />
             </div>

             <motion.div 
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
               className="w-full max-w-lg flex flex-col items-center z-10"
             >
                <div className="w-16 h-16 mb-12 relative">
                   <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse" />
                   <div className="relative w-full h-full border border-white/10 rounded-2xl flex items-center justify-center bg-black/40">
                      <Search size={24} className="text-white/40" />
                   </div>
                </div>
                
                <div className="w-full relative group">
                   <input 
                     autoFocus
                     type="text"
                     placeholder="Search or enter URL..."
                     value={activeTab.inputValue}
                     onChange={e => updateActiveTab({ inputValue: e.target.value })}
                     onKeyDown={e => { if (e.key === 'Enter') navigate(activeTab.inputValue); }}
                     className="w-full bg-transparent border-b border-white/10 py-4 px-2 text-xl font-medium text-center outline-none focus:border-blue-500/50 transition-colors placeholder:text-white/5"
                   />
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue-500 group-focus-within:w-full transition-all duration-700" />
                </div>
             </motion.div>
          </div>
        ) : activeTab.isExternal ? (
          <>
            {isRestricted && (
              <div className="absolute inset-0 z-50 bg-[#0f0f0f] flex flex-col items-center justify-center p-6 @md:p-12 overflow-hidden">
                {/* Background Grid & Particles */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                   <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(217, 74, 56, 0.2) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                   <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border border-white/5 rounded-full" />
                </div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 flex flex-col items-center w-full max-w-xl"
                >
                  {/* Holographic Preview Card */}
                  <div className="relative group/card cursor-pointer mb-12" style={{ perspective: '1000px' }}>
                     <motion.div 
                       whileHover={{ rotateX: 15, rotateY: -15, scale: 1.05 }}
                       className="w-72 h-48 @md:w-96 @md:h-64 bg-black/40 border border-white/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-500"
                       style={{ transformStyle: 'preserve-3d' }}
                     >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#d94a38]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                        <div className="absolute top-4 left-4 flex gap-1.5">
                           <div className="w-2 h-2 rounded-full bg-red-500/40" />
                           <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                           <div className="w-2 h-2 rounded-full bg-green-500/40" />
                        </div>

                        <div className="flex flex-col items-center gap-6 relative z-10">
                           <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner group-hover/card:scale-110 transition-transform">
                              <Globe size={32} className="text-[#d94a38] opacity-60" />
                           </div>
                           <div className="flex flex-col items-center gap-2">
                              <span className="fd text-[10px] uppercase tracking-[0.4em] font-black text-white/20">Mirroring Link</span>
                              <span className="fp text-xl font-bold uppercase tracking-tight text-[#eaddcf]">{activeTab.inputValue}</span>
                           </div>
                        </div>

                        {/* Interactive Scan Line */}
                        <motion.div 
                          animate={{ top: ['-10%', '110%'] }} 
                          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d94a38]/40 to-transparent z-20 pointer-events-none" 
                        />
                     </motion.div>
                  </div>

                  <div className="flex flex-col items-center gap-8">
                     <div className="flex flex-col items-center gap-2">
                        <h3 className="fp text-2xl font-black uppercase text-[#eaddcf]">Security Mirror Mode</h3>
                        <p className="fd text-xs text-white/30 max-w-xs text-center leading-relaxed">
                           External node encryption detected. Tunneling to direct transmission for full accessibility.
                        </p>
                     </div>

                     <div className="flex items-center gap-4">
                        <button 
                          onClick={() => updateActiveTab({ isExternal: false, url: 'dhruba.studio', inputValue: 'dhruba.studio', isNewTab: false })}
                          className="fd text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                        >
                          Abort Mission
                        </button>
                        <a 
                          href={activeTab.externalUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-4 bg-[#d94a38] text-black px-8 py-3.5 rounded-full fd text-[11px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-[#d94a38]/20"
                        >
                          Establish Tunnel <ExternalLink size={14} />
                        </a>
                     </div>
                  </div>
                </motion.div>
              </div>
            )}
            <iframe 
              src={activeTab.externalUrl} 
              className="w-full h-full border-none bg-white" 
              title="Safari Browser"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms" 
            />
          </>
        ) : (
          <div className="w-full h-full overflow-y-auto overflow-x-hidden hide-scrollbar [container-type:inline-size]">
            <PortfolioSite />
          </div>
        )}
      </div>
    </div>
  );
}


