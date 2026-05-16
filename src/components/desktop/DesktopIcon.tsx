import React, { useState } from 'react';
import { APP_REGISTRY } from '@/data/apps';

interface DesktopIconProps {
  appId: string;
  label: string;
  onDoubleClick: () => void;
}

export default function DesktopIcon({ appId, label, onDoubleClick }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);
  const app = APP_REGISTRY.find(a => a.id === appId);
  const iconUrl = app?.icon || '';

  return (
    <div 
      className={`flex flex-col items-center justify-start w-24 h-28 pt-2 rounded-lg cursor-pointer transition-colors pointer-events-auto ${selected ? 'bg-blue-500/30 border border-blue-400/50' : 'hover:bg-white/10'}`}
      onClick={() => setSelected(true)}
      onBlur={() => setSelected(false)}
      onDoubleClick={onDoubleClick}
      tabIndex={0}
    >
      <div className="w-16 h-16 drop-shadow-xl flex items-center justify-center">
        {iconUrl ? (
          <img src={iconUrl} alt={label} className="w-full h-full object-contain" draggable={false} />
        ) : (
          <div className="w-12 h-12 bg-gray-500 rounded-xl" />
        )}
      </div>
      <span 
        className={`mt-1 text-sm text-center font-medium px-1 rounded line-clamp-2 leading-tight ${selected ? 'bg-blue-600 text-white' : 'text-white drop-shadow-md'}`} 
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
      >
        {label}
      </span>
    </div>
  );
}
