import React from 'react';
import MenuBar from '@/components/menubar/MenuBar';
import Dock from '@/components/dock/Dock';
import WindowManager from '@/components/window/WindowManager';
import DesktopIcon from '@/components/desktop/DesktopIcon';
import Spotlight from '@/components/desktop/Spotlight';
import { useOSStore } from '@/store/useOSStore';
import { useWindowStore } from '@/store/useWindowStore';
import { WallpaperID } from '@/types/os';

const WALLPAPER_MAP: Record<WallpaperID, string> = {
  'ventura-day': '/wallpapers/ventura-day.jpg',
  'ventura-night': 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070',
  'sonoma-day': 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070',
  'sonoma-night': 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029',
  'abstract-blue': 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070',
  'abstract-purple': 'https://images.unsplash.com/photo-1558478551-1a378f63ad28?q=80&w=2070',
  'developer': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070',
  'nepal': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070',
};

export default function Desktop() {
  const openWindow = useWindowStore(state => state.openWindow);
  const wallpaper = useOSStore(state => state.wallpaper);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url('${WALLPAPER_MAP[wallpaper]}')` }}
      ></div>
      
      {/* Desktop Apple Logo Branding */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07] mix-blend-overlay">
        <svg viewBox="0 0 814 1000" width="320" height="320" fill="white">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
        </svg>
      </div>
      <MenuBar />
      <div className="relative h-[calc(100%-28px)] w-full pt-[28px] flex flex-col p-4 space-y-4 flex-wrap content-start pointer-events-none">
        <DesktopIcon appId="projects" label="Projects" onDoubleClick={() => openWindow('projects')} />
        <DesktopIcon appId="skills" label="Gallery" onDoubleClick={() => openWindow('skills')} />
        <DesktopIcon appId="resume" label="Resume" onDoubleClick={() => openWindow('resume')} />
        <DesktopIcon appId="contact" label="Messages" onDoubleClick={() => openWindow('contact')} />
        <DesktopIcon appId="notes" label="Notes" onDoubleClick={() => openWindow('notes')} />
        <DesktopIcon appId="terminal" label="Terminal" onDoubleClick={() => openWindow('terminal')} />
      </div>
      <WindowManager />
      <Dock />
      <Spotlight />
    </div>
  );
}
