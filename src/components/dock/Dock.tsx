'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
import { useWindowStore } from '@/store/useWindowStore';
import { APP_REGISTRY } from '@/data/apps';
import { App } from '@/types/app';

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const openApps = useOSStore(state => state.openApps);
  const activeApp = useOSStore(state => state.activeApp);
  const openWindow = useWindowStore(state => state.openWindow);

  return (
    <div 
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[9999] px-6 pb-0"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <div className="flex h-[76px] items-center rounded-t-[24px] bg-[#1a1a1a]/30 px-6 space-x-3 border-t border-x border-white/10 backdrop-blur-3xl shadow-[0_-10px_50px_rgba(0,0,0,0.4)]">
        {APP_REGISTRY.map((app, index) => {
          const isOpen = openApps.includes(app.id);
          const isActive = activeApp === app.id;
          return (
            <React.Fragment key={app.id}>
              <DockItem 
                app={app} 
                mouseX={mouseX} 
                isOpen={isOpen}
                isActive={isActive}
                onClick={(e) => {
                  e.stopPropagation();
                  openWindow(app.id);
                }}
              />
              {index === APP_REGISTRY.length - 2 && (
                <div className="h-10 w-[1px] bg-white/10 mx-1" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function DockItem({ app, mouseX, isOpen, isActive, onClick }: { app: App, mouseX: MotionValue, isOpen: boolean, isActive: boolean, onClick: (e: React.MouseEvent) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const setDockIconRect = useOSStore(state => state.setDockIconRect);
  
  React.useEffect(() => {
    if (ref.current) {
      const bounds = ref.current.getBoundingClientRect();
      setDockIconRect(app.id, { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height });
    }
  }, [app.id, setDockIconRect]);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [44, 82, 44]);
  const width = useSpring(widthSync, { damping: 25, stiffness: 300, mass: 0.1 });

  return (
    <div className="flex flex-col items-center justify-center h-full relative group">
      <motion.div
        ref={ref}
        style={{ width }}
        onClick={onClick}
        className="relative aspect-square cursor-pointer items-center justify-center transition-all duration-200"
      >
        {/* Tooltip */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 rounded-lg bg-[#000000]/50 px-3 py-1.5 text-[12px] font-medium text-white opacity-0 backdrop-blur-xl transition-opacity group-hover:opacity-100 border border-white/10 whitespace-nowrap pointer-events-none shadow-2xl z-[10000]">
          {app.label}
        </div>
        
        <Image 
          src={app.icon} 
          alt={app.label} 
          fill
          priority
          sizes="80px"
          className="object-contain drop-shadow-md transition-transform active:scale-90" 
          draggable={false} 
        />
        
        {/* Active Indicator Dot */}
        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-black/80 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
      </motion.div>
    </div>
  );
}

