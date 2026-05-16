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
          <svg viewBox="0 0 24 24" width="16" height="16" fill="white" className="mx-2 -mt-[1px]">
            <path d="M17.05 20.28c-.96.95-2.04 1.72-3.23 1.72-1.16 0-1.54-.73-2.83-.73s-1.74.71-2.83.71c-1.14 0-2.22-.81-3.21-1.79-2.02-2.02-3.55-5.71-3.55-8.91 0-3.19 1.63-4.88 3.19-4.88 1.1 0 2.11.66 2.78.66.66 0 1.83-.79 3.14-.79 1.1 0 2.22.56 2.94 1.48-2.61 1.54-2.18 5.17.43 6.22-1.01 2.37-2.1 4.34-3.06 5.32zm-3.03-15.63c-.02 1.34-1.12 2.68-2.68 2.68-1.56 0-2.41-1.37-2.39-2.68.02-1.34 1.13-2.68 2.68-2.68 1.55 0 2.41 1.37 2.39 2.68z"/>
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

