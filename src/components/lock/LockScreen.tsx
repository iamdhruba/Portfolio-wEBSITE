import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';

export default function LockScreen() {
  const setPhase = useOSStore((state) => state.setPhase);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Add global key listener to unlock
    const handleGlobalKey = (e: KeyboardEvent) => {
      handleUnlock();
    };
    window.addEventListener('keydown', handleGlobalKey);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleGlobalKey);
    };
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
          <div className="h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/40 bg-white/10">
            <img src="/image/pp.jpeg" alt="Profile" className="h-full w-full object-cover" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-medium tracking-wide">Dhruba Raj Chaudhary</h1>
            <p className="text-sm opacity-60">Full Stack Developer</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 z-20 animate-pulse text-sm text-white/60">
        Click or press any key to unlock
      </div>
    </motion.div>
  );
}
