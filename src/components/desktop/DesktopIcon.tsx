'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { APP_REGISTRY } from '@/data/apps';
import { useOSStore } from '@/store/useOSStore';

interface DesktopIconProps {
  appId: string;
  label: string;
  onDoubleClick: () => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function DesktopIcon({ appId, label, onDoubleClick, containerRef }: DesktopIconProps) {
  const app = APP_REGISTRY.find(a => a.id === appId);
  const iconUrl = app?.icon || '';
  const setIconPosition = useOSStore(state => state.setIconPosition);
  const setActiveApp = useOSStore(state => state.setActiveApp);
  const savedPos = useOSStore(state => state.iconPositions[appId]) || { x: 0, y: 0 };
  const activeApp = useOSStore(state => state.activeApp);
  const isSelected = activeApp === appId;
  
  // Local state to handle smooth dragging
  const [pos, setPos] = useState(savedPos);

  // Sync with store on mount or store change (if another component updates it)
  useEffect(() => {
    setPos(savedPos);
  }, [savedPos.x, savedPos.y]);

  const isDragging = React.useRef(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDragging.current) return;
    setActiveApp(appId as any);
  };

  const handleDragStart = () => {
    isDragging.current = true;
  };

  return (
    <motion.div 
      drag
      dragMomentum={false}
      dragConstraints={containerRef}
      initial={false}
      animate={{ x: pos.x, y: pos.y }}
      onDragStart={handleDragStart}
      onDragEnd={(_, info) => {
        const newPos = { x: pos.x + info.offset.x, y: pos.y + info.offset.y };
        setPos(newPos);
        setIconPosition(appId, newPos);
        // Deselect after moving
        setActiveApp(null);
        // Reset dragging state after a short delay to block the click event
        setTimeout(() => {
          isDragging.current = false;
        }, 100);
      }}
      className={`group flex flex-col items-center justify-start w-24 h-28 pt-2 rounded-lg cursor-pointer transition-all duration-200 pointer-events-auto select-none z-10 ${
        isSelected ? 'bg-white/15' : 'active:bg-white/20'
      }`}
      onDoubleClick={onDoubleClick}
      onClick={handleClick}
      whileDrag={{ 
        scale: 1.05, 
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}
    >
      <div className="relative w-16 h-16 drop-shadow-2xl flex items-center justify-center pointer-events-none group-active:brightness-75 transition-all">
        {iconUrl ? (
          <Image src={iconUrl} alt={label} fill priority sizes="64px" className="object-contain" draggable={false} />
        ) : (
          <div className="w-12 h-12 bg-gray-500 rounded-xl" />
        )}
      </div>
      <span 
        className={`mt-1 text-[11px] text-center font-medium px-2 py-0.5 rounded-md line-clamp-2 leading-tight transition-all text-white ${
          isSelected ? 'bg-blue-600 shadow-lg' : 'group-active:bg-blue-600 group-active:shadow-lg'
        }`} 
        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
      >
        {label}
      </span>
    </motion.div>
  );
}
