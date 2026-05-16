import React, { useEffect, useState } from 'react';
import { useOSStore } from '@/store/useOSStore';
import { useWindowStore } from '@/store/useWindowStore';
import { APP_REGISTRY } from '@/data/apps';
import { Wifi, Battery, Search, SlidersHorizontal, Check } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { WallpaperID } from '@/types/os';

export default function MenuBar() {
  const activeAppId = useOSStore(state => state.activeApp);
  const activeApp = APP_REGISTRY.find(a => a.id === activeAppId);
  const { setWallpaper, wallpaper: currentWallpaper, setPhase } = useOSStore();
  const { windows, minimizeWindow, closeWindow } = useWindowStore();
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  const activeWindow = windows.find(w => w.appId === activeAppId && !w.isMinimized);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !time) return null;

  const wallpapers: { id: WallpaperID; label: string }[] = [
    { id: 'ventura-day', label: 'Ventura Day' },
    { id: 'ventura-night', label: 'Ventura Night' },
    { id: 'sonoma-day', label: 'Sonoma Day' },
    { id: 'sonoma-night', label: 'Sonoma Night' },
    { id: 'abstract-blue', label: 'Abstract Blue' },
    { id: 'abstract-purple', label: 'Abstract Purple' },
    { id: 'developer', label: 'Developer' },
    { id: 'nepal', label: 'Nepal' },
  ];

  return (
    <div className="glass absolute top-0 z-[9999] flex h-[28px] w-full select-none items-center justify-between px-4 text-[13px] font-medium text-white/90" style={{ background: 'var(--menubar-bg)' }}>
      <div className="flex items-center space-x-1">
        {/* Apple Menu */}
        <MenuWrapper trigger={
          <svg viewBox="0 0 170 170" width="14" height="14" fill="currentColor" className="mx-2">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69.0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58.0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.92.21-9.84-1.96-14.74-6.53-3.13-2.73-7.1-7.43-11.92-14.12-5.06-7.06-9.67-15.3-13.84-24.7-4.16-9.4-6.24-18.94-6.24-28.6 0-11.66 2.76-21.46 8.28-29.41 5.52-7.95 12.83-12.02 21.94-12.23 4.23-.11 9.28 1.13 15.16 3.7 5.88 2.58 9.53 3.88 10.96 3.88 1.43 0 5.25-1.4 11.45-4.18 6.2-2.78 11.83-4 16.89-3.65 6.34.46 11.85 2.22 16.52 5.29 4.67 3.07 8.35 6.8 11.04 11.2-10.51 6.54-15.68 15.18-15.5 25.92.19 8.78 3.51 16.14 9.97 22.06 6.46 5.92 13.9 9.38 22.33 10.37-1.74 5.37-3.83 10.4-6.28 15.12zM116.86 31.96c-4.48 5.6-10.82 8.78-19.04 9.53-1.01-8.32 1.63-15.35 7.9-21.1C111.99 14.64 119.5 11.43 128.2 11c1.07 8.68-2.71 15.68-11.34 20.96z"/>
          </svg>
        }>
          <DropdownMenu.Item className="menu-item">About This Mac</DropdownMenu.Item>
          <DropdownMenu.Separator className="menu-separator" />
          <DropdownMenu.Item className="menu-item">System Settings...</DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item">App Store...</DropdownMenu.Item>
          <DropdownMenu.Separator className="menu-separator" />
          <DropdownMenu.Item className="menu-item" onSelect={() => setPhase('boot')}>Restart...</DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item" onSelect={() => setPhase('boot')}>Shut Down...</DropdownMenu.Item>
          <DropdownMenu.Separator className="menu-separator" />
          <DropdownMenu.Item className="menu-item" onSelect={() => setPhase('lock')}>Lock Screen</DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item" onSelect={() => setPhase('lock')}>Log Out Dhruba...</DropdownMenu.Item>
        </MenuWrapper>

        <span className="px-3 font-bold">{activeApp?.label || 'Finder'}</span>
        
        <MenuWrapper trigger="File">
          <DropdownMenu.Item className="menu-item">New Window</DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item">New Tab</DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item">Open...</DropdownMenu.Item>
          <DropdownMenu.Separator className="menu-separator" />
          <DropdownMenu.Item className="menu-item" onSelect={() => activeWindow && closeWindow(activeWindow.id)}>Close Window</DropdownMenu.Item>
        </MenuWrapper>

        <MenuWrapper trigger="Edit">
          <DropdownMenu.Item className="menu-item">Undo</DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item">Redo</DropdownMenu.Item>
          <DropdownMenu.Separator className="menu-separator" />
          <DropdownMenu.Item className="menu-item">Cut</DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item">Copy</DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item">Paste</DropdownMenu.Item>
        </MenuWrapper>

        <MenuWrapper trigger="View">
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="menu-item flex justify-between">
              Change Wallpaper <span>▶</span>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent className="menu-content ml-1">
                {wallpapers.map(wp => (
                  <DropdownMenu.Item 
                    key={wp.id} 
                    className="menu-item flex items-center justify-between"
                    onClick={() => setWallpaper(wp.id)}
                  >
                    {wp.label}
                    {currentWallpaper === wp.id && <Check size={12} className="ml-2" />}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <DropdownMenu.Separator className="menu-separator" />
          <DropdownMenu.Item className="menu-item">Enter Full Screen</DropdownMenu.Item>
        </MenuWrapper>

        <MenuWrapper trigger="Window">
          <DropdownMenu.Item className="menu-item" onSelect={() => activeWindow && minimizeWindow(activeWindow.id)}>Minimize</DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item">Zoom</DropdownMenu.Item>
          <DropdownMenu.Separator className="menu-separator" />
          <DropdownMenu.Item className="menu-item">Bring All to Front</DropdownMenu.Item>
        </MenuWrapper>

        <MenuWrapper trigger="Help">
          <DropdownMenu.Item className="menu-item">Search</DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item">MacOS Help</DropdownMenu.Item>
        </MenuWrapper>
      </div>
      
      <div className="flex items-center space-x-1">
        <MenuWrapper trigger={<Battery size={15} className="opacity-80 mt-[2px]" />}>
          <DropdownMenu.Item className="menu-item opacity-50">Battery: 84%</DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item opacity-50">Power Source: Power Adapter</DropdownMenu.Item>
          <DropdownMenu.Separator className="menu-separator" />
          <DropdownMenu.Item className="menu-item">Battery Settings...</DropdownMenu.Item>
        </MenuWrapper>

        <MenuWrapper trigger={<Wifi size={15} className="opacity-80 mt-[2px]" />}>
          <DropdownMenu.Item className="menu-item flex items-center justify-between">
            <span>Dhruba_5G</span>
            <Check size={12} className="ml-4" />
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="menu-separator" />
          <DropdownMenu.Item className="menu-item opacity-50">Guest_Network</DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item opacity-50">Starbucks_WiFi</DropdownMenu.Item>
          <DropdownMenu.Separator className="menu-separator" />
          <DropdownMenu.Item className="menu-item">Wi-Fi Settings...</DropdownMenu.Item>
        </MenuWrapper>

        <button 
          className="px-2 outline-none hover:bg-white/10 rounded-md py-1 transition-colors"
          onClick={() => useOSStore.getState().toggleSpotlight()}
        >
          <Search size={15} className="opacity-80 mt-[2px]" />
        </button>

        <MenuWrapper trigger={<SlidersHorizontal size={15} className="opacity-80 mt-[2px]" />}>
          <div className="p-2 space-y-3 w-48">
            <div className="bg-white/10 rounded-lg p-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold">Wi-Fi</span>
                <div className="w-8 h-4 bg-blue-500 rounded-full relative">
                  <div className="w-3.5 h-3.5 bg-white rounded-full absolute right-[2px] top-[2px]"></div>
                </div>
              </div>
              <span className="text-[10px] opacity-70">Dhruba_5G</span>
            </div>
            
            <div className="bg-white/10 rounded-lg p-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold">Bluetooth</span>
                <div className="w-8 h-4 bg-blue-500 rounded-full relative">
                  <div className="w-3.5 h-3.5 bg-white rounded-full absolute right-[2px] top-[2px]"></div>
                </div>
              </div>
              <span className="text-[10px] opacity-70">AirPods Pro Connected</span>
            </div>
          </div>
        </MenuWrapper>
        
        <span className="px-2 font-medium">
          {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} 
          {' '}
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </span>
      </div>
    </div>
  );
}

function MenuWrapper({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="px-3 outline-none hover:bg-white/10 rounded-md py-0.5 transition-colors">
        {trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="menu-content" sideOffset={5} align="start">
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

