'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Code, Zap } from 'lucide-react';

export default function VSCodeApp() {
  const [repoUrl, setRepoUrl] = useState('https://github.com/iamdhruba/Job-Portal');
  const [mode, setMode] = useState<'view' | 'run'>('view');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const targetRepo = localStorage.getItem('vscode_target_repo');
    if (targetRepo) {
      setRepoUrl(targetRepo);
    }
  }, []);
  
  // Format: https://github.com/iamdhruba/Job-Portal -> iamdhruba/Job-Portal
  const repoPath = repoUrl.replace('https://github.com/', '').replace('.git', '');
  
  // Determine embed URL
  // github1s is INSTANT but view-only. StackBlitz runs the code but takes time to boot WebContainers.
  const embedUrl = mode === 'view' 
    ? `https://github1s.com/${repoPath}`
    : `https://stackblitz.com/github/${repoPath}?embed=1&theme=dark`;

  return (
    <div className="w-full h-full bg-[#1e1e1e] flex flex-col relative">
      {/* VS Code Custom Header Bar */}
      <div className="h-10 bg-[#323233] flex items-center justify-between px-4 border-b border-[#1e1e1e] drag-handle">
        <div className="flex-1" />
        <span className="text-[12px] text-[#cccccc] font-sans flex-1 text-center cursor-default">
          Visual Studio Code - {repoPath}
        </span>
        <div className="flex-1 flex justify-end space-x-2">
          <button 
            onClick={() => { setIsLoading(true); setMode('view'); }}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] transition-colors ${mode === 'view' ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/60 hover:text-white'}`}
            title="Instant code viewer"
          >
            <Zap size={12} />
            <span>Fast Viewer</span>
          </button>
          <button 
            onClick={() => { setIsLoading(true); setMode('run'); }}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] transition-colors ${mode === 'run' ? 'bg-green-600 text-white' : 'bg-white/10 text-white/60 hover:text-white'}`}
            title="Full runnable environment (Takes longer)"
          >
            <Play size={12} />
            <span>Run Env (Slow)</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 w-full relative bg-[#1e1e1e]">
        {/* Loading overlay while iframe loads */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-[#1e1e1e] z-20">
            <div className="flex flex-col items-center">
              <img src="https://raw.githubusercontent.com/PuruVJ/macos-web/main/public/app-icons/vscode/512.png" alt="VS Code" className="w-16 h-16 mb-4 animate-pulse" />
              <span className="text-white/50 text-sm">
                {mode === 'view' ? 'Loading instant viewer...' : 'Booting WebContainers & Cloning Repo... (This may take 30s)'}
              </span>
            </div>
          </div>
        )}
        
        <iframe 
          src={embedUrl}
          className="w-full h-full border-none relative z-10 bg-[#1e1e1e]"
          title="VS Code Workspace"
          onLoad={() => setIsLoading(false)}
          allow="cross-origin-isolated; clipboard-read; clipboard-write; display-capture; fullscreen; geolocation; microphone; camera"
        />
      </div>
    </div>
  );
}
