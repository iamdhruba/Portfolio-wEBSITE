const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n', 'utf-8');
};

write('src/components/boot/BootScreen.tsx', `
import React, { useEffect } from 'react';
import { useOSStore } from '@/store/useOSStore';

export default function BootScreen() {
  const setPhase = useOSStore((state) => state.setPhase);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('macos-booted');
    if (hasBooted) {
      setPhase('lock');
      return;
    }
    
    const timer = setTimeout(() => {
      sessionStorage.setItem('macos-booted', '1');
      setPhase('lock');
    }, 3500);
    return () => clearTimeout(timer);
  }, [setPhase]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black transition-opacity duration-700 ease-in-out">
      <div className="animate-fade-in text-white delay-500 duration-1000">
        <svg viewBox="0 0 170 170" width="64" height="64" fill="currentColor">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69.0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58.0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.92.21-9.84-1.96-14.74-6.53-3.13-2.73-7.1-7.43-11.92-14.12-5.06-7.06-9.67-15.3-13.84-24.7-4.16-9.4-6.24-18.94-6.24-28.6 0-11.66 2.76-21.46 8.28-29.41 5.52-7.95 12.83-12.02 21.94-12.23 4.23-.11 9.28 1.13 15.16 3.7 5.88 2.58 9.53 3.88 10.96 3.88 1.43 0 5.25-1.4 11.45-4.18 6.2-2.78 11.83-4 16.89-3.65 6.34.46 11.85 2.22 16.52 5.29 4.67 3.07 8.35 6.8 11.04 11.2-10.51 6.54-15.68 15.18-15.5 25.92.19 8.78 3.51 16.14 9.97 22.06 6.46 5.92 13.9 9.38 22.33 10.37-1.74 5.37-3.83 10.4-6.28 15.12zM116.86 31.96c-4.48 5.6-10.82 8.78-19.04 9.53-1.01-8.32 1.63-15.35 7.9-21.1C111.99 14.64 119.5 11.43 128.2 11c1.07 8.68-2.71 15.68-11.34 20.96z"/>
        </svg>
      </div>
      <div className="mt-16 h-1 w-44 overflow-hidden rounded-full bg-gray-800">
        <div className="h-full bg-white transition-all ease-linear" style={{ width: '100%', animation: 'progressBar 2.3s linear 0.5s both' }}></div>
      </div>
      <style>{`
        @keyframes progressBar {
          0% { width: 0%; }
          10% { width: 15%; }
          50% { width: 45%; }
          80% { width: 85%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
`);

write('src/components/lock/LockScreen.tsx', `
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';

export default function LockScreen() {
  const setPhase = useOSStore((state) => state.setPhase);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    setPhase('desktop');
  };

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const formattedDate = time.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <motion.div 
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: '-100vh' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, opacity: { duration: 0.7 } }}
      onClick={handleUnlock}
      onKeyDown={handleUnlock}
      tabIndex={0}
    >
      <div className="absolute inset-0 bg-[url('/wallpapers/ventura-day.jpg')] bg-cover bg-center" style={{ filter: 'blur(40px) brightness(0.7)' }}></div>
      
      <div className="relative z-10 flex flex-col items-center text-white">
        <div className="mb-8 text-center">
          <div className="text-[72px] font-thin tracking-wider">{formattedTime}</div>
          <div className="text-lg opacity-80">{formattedDate}</div>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/40">
            <div className="h-full w-full bg-blue-500 flex items-center justify-center text-3xl font-bold">DR</div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-medium tracking-wide">Dhruba Raj Chaudhary</h1>
            <p className="text-sm opacity-60">Full Stack Developer</p>
          </div>
        </div>

        <div className="absolute bottom-16 animate-pulse text-sm opacity-60">
          Click or press any key to unlock
        </div>
      </div>
    </motion.div>
  );
}
`);

write('src/components/desktop/Desktop.tsx', `
import React from 'react';
import MenuBar from '@/components/menubar/MenuBar';
import Dock from '@/components/dock/Dock';
import WindowManager from '@/components/window/WindowManager';
import { useOSStore } from '@/store/useOSStore';

export default function Desktop() {
  const wallpaper = useOSStore(state => state.wallpaper);
  
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-blue-900 bg-cover bg-center" style={{ backgroundImage: "url('/wallpapers/ventura-day.jpg')" }}></div>
      <MenuBar />
      <div className="relative h-[calc(100%-28px)] w-full pt-[28px]">
        <WindowManager />
        <Dock />
      </div>
    </div>
  );
}
`);

write('src/components/menubar/MenuBar.tsx', `
import React, { useEffect, useState } from 'react';
import { useOSStore } from '@/store/useOSStore';
import { APP_REGISTRY } from '@/data/apps';
import { Wifi, Battery, Search, SlidersHorizontal } from 'lucide-react';

export default function MenuBar() {
  const activeAppId = useOSStore(state => state.activeApp);
  const activeApp = APP_REGISTRY.find(a => a.id === activeAppId);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass absolute top-0 z-[9999] flex h-[28px] w-full select-none items-center justify-between px-4 text-xs font-medium text-white/90" style={{ background: 'var(--menubar-bg)' }}>
      <div className="flex items-center space-x-4">
        <svg viewBox="0 0 170 170" width="14" height="14" fill="currentColor">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69.0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58.0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.92.21-9.84-1.96-14.74-6.53-3.13-2.73-7.1-7.43-11.92-14.12-5.06-7.06-9.67-15.3-13.84-24.7-4.16-9.4-6.24-18.94-6.24-28.6 0-11.66 2.76-21.46 8.28-29.41 5.52-7.95 12.83-12.02 21.94-12.23 4.23-.11 9.28 1.13 15.16 3.7 5.88 2.58 9.53 3.88 10.96 3.88 1.43 0 5.25-1.4 11.45-4.18 6.2-2.78 11.83-4 16.89-3.65 6.34.46 11.85 2.22 16.52 5.29 4.67 3.07 8.35 6.8 11.04 11.2-10.51 6.54-15.68 15.18-15.5 25.92.19 8.78 3.51 16.14 9.97 22.06 6.46 5.92 13.9 9.38 22.33 10.37-1.74 5.37-3.83 10.4-6.28 15.12zM116.86 31.96c-4.48 5.6-10.82 8.78-19.04 9.53-1.01-8.32 1.63-15.35 7.9-21.1C111.99 14.64 119.5 11.43 128.2 11c1.07 8.68-2.71 15.68-11.34 20.96z"/>
        </svg>
        <span className="font-bold">{activeApp?.label || 'Finder'}</span>
        <span className="opacity-80">File</span>
        <span className="opacity-80">Edit</span>
        <span className="opacity-80">View</span>
        <span className="opacity-80">Window</span>
        <span className="opacity-80">Help</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <Battery size={14} className="opacity-80" />
        <Wifi size={14} className="opacity-80" />
        <Search size={14} className="opacity-80" />
        <SlidersHorizontal size={14} className="opacity-80" />
        <span>{time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
}
`);

console.log("Desktop and shell components generated.");
