import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';

export default function LockScreen() {
  const setPhase = useOSStore((state) => state.setPhase);
  const user = useOSStore((state) => state.user);
  const lockScreenSleep = useOSStore((state) => state.lockScreenSleep);
  const setLockScreenSleep = useOSStore((state) => state.setLockScreenSleep);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    const handleWake = () => {
      setLockScreenSleep(false);
    };

    window.addEventListener('keydown', handleWake);
    window.addEventListener('mousedown', handleWake);

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleWake);
      window.removeEventListener('mousedown', handleWake);
    };
  }, [setLockScreenSleep]);

  const handleUnlock = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.stopPropagation();
    setPhase('desktop');
  };

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const formattedDate = time.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

  if (lockScreenSleep) {
    return <div className="fixed inset-0 z-[9999] bg-black cursor-default" />;
  }

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
      <div className="absolute inset-0 z-0" style={{ filter: 'blur(40px) brightness(0.7)' }}>
        <Image
          src="/wallpapers/ventura-day.jpg"
          alt="Lockscreen Wallpaper"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-white">
        <div className="mb-8 text-center">
          <div className="text-[72px] font-thin tracking-wider">{formattedTime}</div>
          <div className="text-lg opacity-80">{formattedDate}</div>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-white/40 bg-white/10">
            <Image src={user.profilePic} alt="Profile" fill priority sizes="96px" className="object-cover" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-medium tracking-wide">{user.name}</h1>
            <p className="text-sm opacity-60">{user.description}</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 z-20 animate-pulse text-sm text-white/60">
        Click or press any key to unlock
      </div>
    </motion.div>
  );
}
