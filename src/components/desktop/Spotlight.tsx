'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, AppWindow, FileText, Globe, Terminal, Calculator, Image } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { useWindowStore } from '@/store/useWindowStore';
import { APP_REGISTRY } from '@/data/apps';

export default function Spotlight() {
  const { spotlightOpen, toggleSpotlight } = useOSStore();
  const { openWindow } = useWindowStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (spotlightOpen) {
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [spotlightOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        toggleSpotlight();
      }
      if (e.key === 'Escape' && spotlightOpen) {
        toggleSpotlight();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spotlightOpen, toggleSpotlight]);

  const results = APP_REGISTRY.filter(app => 
    app.label.toLowerCase().includes(query.toLowerCase()) ||
    app.id.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (appId: string) => {
    openWindow(appId as any);
    toggleSpotlight();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex].id);
    }
  };

  return (
    <AnimatePresence>
      {spotlightOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSpotlight}
            className="fixed inset-0 z-[10000] bg-black/10 backdrop-blur-[2px]"
          />

          {/* Spotlight Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-[15%] z-[10001] w-[600px] overflow-hidden rounded-2xl bg-black/40 shadow-2xl backdrop-blur-[50px] border border-white/10"
          >
            {/* Input Area */}
            <div className="flex items-center space-x-3 px-4 py-4 border-b border-white/10">
              <Search className="h-6 w-6 text-white/40" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Spotlight Search"
                className="flex-1 bg-transparent text-xl text-white outline-none placeholder:text-white/20"
              />
            </div>

            {/* Results Area */}
            {results.length > 0 && (
              <div className="max-h-[400px] overflow-y-auto p-2">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/30">
                  Applications
                </div>
                {results.map((app, index) => (
                  <button
                    key={app.id}
                    onClick={() => handleSelect(app.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                      index === selectedIndex ? 'bg-blue-600 text-white' : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <img src={app.icon} alt="" className="h-7 w-7" />
                    <div className="flex flex-1 flex-col items-start">
                      <span className="text-[13px] font-medium">{app.label}</span>
                      <span className={`text-[10px] ${index === selectedIndex ? 'text-white/60' : 'text-white/30'}`}>
                        Application
                      </span>
                    </div>
                    {index === selectedIndex && (
                      <div className="flex items-center space-x-1 opacity-60">
                        <Command className="h-3 w-3" />
                        <span className="text-[10px]">Return</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Empty State */}
            {query && results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-white/20">
                <Search className="mb-2 h-12 w-12 opacity-10" />
                <p className="text-sm">No results found for "{query}"</p>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 bg-white/5 text-[10px] text-white/30">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <span className="rounded bg-white/10 px-1 py-0.5">ESC</span>
                  <span>to close</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="rounded bg-white/10 px-1 py-0.5">↑↓</span>
                  <span>to navigate</span>
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Command className="h-3 w-3" />
                <span>Space to toggle</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
