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
