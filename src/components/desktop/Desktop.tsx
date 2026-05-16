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
        <svg viewBox="0 0 170 170" width="320" height="320" fill="white">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69.0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58.0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.92.21-9.84-1.96-14.74-6.53-3.13-2.73-7.1-7.43-11.92-14.12-5.06-7.06-9.67-15.3-13.84-24.7-4.16-9.4-6.24-18.94-6.24-28.6 0-11.66 2.76-21.46 8.28-29.41 5.52-7.95 12.83-12.02 21.94-12.23 4.23-.11 9.28 1.13 15.16 3.7 5.88 2.58 9.53 3.88 10.96 3.88 1.43 0 5.25-1.4 11.45-4.18 6.2-2.78 11.83-4 16.89-3.65 6.34.46 11.85 2.22 16.52 5.29 4.67 3.07 8.35 6.8 11.04 11.2-10.51 6.54-15.68 15.18-15.5 25.92.19 8.78 3.51 16.14 9.97 22.06 6.46 5.92 13.9 9.38 22.33 10.37-1.74 5.37-3.83 10.4-6.28 15.12zM116.86 31.96c-4.48 5.6-10.82 8.78-19.04 9.53-1.01-8.32 1.63-15.35 7.9-21.1C111.99 14.64 119.5 11.43 128.2 11c1.07 8.68-2.71 15.68-11.34 20.96z"/>
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
