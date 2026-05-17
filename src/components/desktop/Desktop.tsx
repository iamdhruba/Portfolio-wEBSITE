import React from 'react';
import Image from 'next/image';
import MenuBar from '@/components/menubar/MenuBar';
import Dock from '@/components/dock/Dock';
import WindowManager from '@/components/window/WindowManager';
import DesktopIcon from '@/components/desktop/DesktopIcon';
import Spotlight from '@/components/desktop/Spotlight';
import { useOSStore } from '@/store/useOSStore';
import { useWindowStore } from '@/store/useWindowStore';
import { WallpaperID } from '@/types/os';
import { APP_REGISTRY } from '@/data/apps';

const WALLPAPER_MAP: Record<WallpaperID, string> = {
  'ventura-day': '/wallpapers/ventura-day.jpg',
  'ventura-night': 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070',
  'sonoma-day': 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070',
  'sonoma-night': 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029',
  'abstract-blue': 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070',
};

export default function Desktop() {
  const openWindow = useWindowStore(state => state.openWindow);
  const wallpaper = useOSStore(state => state.wallpaper);
  const setActiveApp = useOSStore(state => state.setActiveApp);
  const desktopRef = React.useRef<HTMLDivElement>(null);

  const handleDesktopClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // Do not deselect if the click is inside a window, dock, menubar, dropdown, or desktop icon
    if (
      target.closest('.glass') ||
      target.closest('.window-titlebar') ||
      target.closest('.menu-content') ||
      target.closest('.group') ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'A'
    ) {
      return;
    }

    setActiveApp(null);
  };

  return (
    <div 
      ref={desktopRef} 
      className="relative h-full w-full overflow-hidden bg-black text-white select-none"
      onClick={handleDesktopClick}
    >
      {Object.entries(WALLPAPER_MAP).map(([id, url]) => (
        <Image
          key={id}
          src={url}
          alt={id}
          fill
          priority={true}
          sizes="100vw"
          className={`object-cover bg-cover object-center transition-opacity duration-1000 ease-in-out ${wallpaper === id ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'}`}
        />
      ))}
      
      
      <MenuBar />
      
      <div className="relative h-[calc(100%-28px)] w-full pt-[28px] flex flex-col p-4 space-y-4 flex-wrap content-start pointer-events-none">
        {APP_REGISTRY.map(app => (
          <DesktopIcon 
            key={app.id}
            appId={app.id} 
            label={app.label} 
            onDoubleClick={() => openWindow(app.id)}
            containerRef={desktopRef}
          />
        ))}
      </div>

      <WindowManager />
      <Dock />
      <Spotlight />
    </div>
  );
}
