const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n', 'utf-8');
};

// data
write('src/data/apps.ts', `
import { App } from '@/types/app';

export const APP_REGISTRY: App[] = [
  { id: 'safari', label: 'Safari', icon: '/icons/safari.png', component: 'Safari', defaultSize: { width: 960, height: 640 }, minSize: { width: 600, height: 400 } },
  { id: 'aboutme', label: 'About Me', icon: '/icons/aboutme.png', component: 'AboutApp', defaultSize: { width: 380, height: 680 }, minSize: { width: 360, height: 640 } },
  { id: 'projects', label: 'Projects', icon: '/icons/projects.png', component: 'ProjectsApp', defaultSize: { width: 800, height: 580 }, minSize: { width: 600, height: 400 } },
  { id: 'resume', label: 'Resume', icon: '/icons/resume.png', component: 'ResumeApp', defaultSize: { width: 680, height: 860 }, minSize: { width: 500, height: 600 } },
  { id: 'contact', label: 'Contact', icon: '/icons/contact.png', component: 'ContactApp', defaultSize: { width: 400, height: 600 }, minSize: { width: 300, height: 400 } },
  { id: 'notes', label: 'Notes', icon: '/icons/notes.png', component: 'NotesApp', defaultSize: { width: 520, height: 560 }, minSize: { width: 400, height: 400 } },
  { id: 'terminal', label: 'Terminal', icon: '/icons/terminal.png', component: 'Terminal', defaultSize: { width: 640, height: 400 }, minSize: { width: 400, height: 300 } },
  { id: 'music', label: 'Music', icon: '/icons/music.png', component: 'MusicApp', defaultSize: { width: 480, height: 580 }, minSize: { width: 300, height: 400 } },
  { id: 'finder', label: 'Finder', icon: '/icons/finder.png', component: 'Finder', defaultSize: { width: 780, height: 520 }, minSize: { width: 500, height: 400 } },
  { id: 'vscode', label: 'VS Code', icon: '/icons/vscode.png', component: 'VSCodeApp', defaultSize: { width: 900, height: 620 }, minSize: { width: 600, height: 400 } },
  { id: 'settings', label: 'Settings', icon: '/icons/settings.png', component: 'SettingsApp', defaultSize: { width: 660, height: 460 }, minSize: { width: 500, height: 300 } }
];
`);

// stores
write('src/store/useOSStore.ts', `
import { create } from 'zustand';
import { AppID, WallpaperID, Notification, ContextMenuState } from '@/types/os';
import { AppID as TypedAppID } from '@/types/app';

interface OSState {
  phase: 'boot' | 'lock' | 'desktop';
  theme: 'dark' | 'light';
  wallpaper: WallpaperID;
  activeApp: TypedAppID | null;
  openApps: TypedAppID[];
  notifications: Notification[];
  spotlightOpen: boolean;
  missionControlOpen: boolean;
  notificationCenterOpen: boolean;
  contextMenu: ContextMenuState | null;

  setPhase: (phase: 'boot' | 'lock' | 'desktop') => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setWallpaper: (wallpaper: WallpaperID) => void;
  setActiveApp: (appId: TypedAppID | null) => void;
  addOpenApp: (appId: TypedAppID) => void;
  removeOpenApp: (appId: TypedAppID) => void;
}

export const useOSStore = create<OSState>((set) => ({
  phase: 'boot',
  theme: 'dark',
  wallpaper: 'ventura-day',
  activeApp: null,
  openApps: [],
  notifications: [],
  spotlightOpen: false,
  missionControlOpen: false,
  notificationCenterOpen: false,
  contextMenu: null,

  setPhase: (phase) => set({ phase }),
  setTheme: (theme) => set({ theme }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  setActiveApp: (activeApp) => set({ activeApp }),
  addOpenApp: (appId) => set((state) => ({ openApps: state.openApps.includes(appId) ? state.openApps : [...state.openApps, appId] })),
  removeOpenApp: (appId) => set((state) => ({ openApps: state.openApps.filter((id) => id !== appId) })),
}));
`);

write('src/store/useWindowStore.ts', `
import { create } from 'zustand';
import { WindowInstance } from '@/types/window';
import { AppID } from '@/types/app';
import { APP_REGISTRY } from '@/data/apps';

interface WindowState {
  windows: WindowInstance[];
  focusedWindowId: string | null;
  openWindow: (appId: AppID, options?: Partial<WindowInstance>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindow: (id: string, patch: Partial<WindowInstance>) => void;
  bringToFront: (id: string) => void;
}

let zCounter = 100;

export const useWindowStore = create<WindowState>((set, get) => ({
  windows: [],
  focusedWindowId: null,

  openWindow: (appId, options) => {
    const state = get();
    // Check if window already open
    const existing = state.windows.find(w => w.appId === appId);
    if (existing) {
      if (existing.isMinimized) state.updateWindow(existing.id, { isMinimized: false });
      state.bringToFront(existing.id);
      return;
    }

    const appDef = APP_REGISTRY.find(a => a.id === appId);
    if (!appDef) return;

    const newWindow: WindowInstance = {
      id: crypto.randomUUID(),
      appId,
      title: appDef.label,
      x: 80 + (state.windows.length * 24),
      y: 48 + (state.windows.length * 24),
      width: appDef.defaultSize.width,
      height: appDef.defaultSize.height,
      zIndex: ++zCounter,
      isMinimized: false,
      isMaximized: false,
      isFocused: true,
      minWidth: appDef.minSize.width,
      minHeight: appDef.minSize.height,
      ...options
    };

    set({ windows: [...state.windows, newWindow], focusedWindowId: newWindow.id });
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter(w => w.id !== id),
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true, isFocused: false } : w),
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w => {
        if (w.id === id) {
          if (w.isMaximized) {
            return { ...w, isMaximized: false, x: w.prevBounds?.x || 80, y: w.prevBounds?.y || 48, width: w.prevBounds?.width || 800, height: w.prevBounds?.height || 600 };
          } else {
            return { ...w, isMaximized: true, prevBounds: { x: w.x, y: w.y, width: w.width, height: w.height }, x: 0, y: 28, width: window.innerWidth, height: window.innerHeight - 28 - 72 };
          }
        }
        return w;
      })
    }));
  },

  focusWindow: (id) => get().bringToFront(id),

  updateWindow: (id, patch) => {
    set((state) => ({
      windows: state.windows.map(w => w.id === id ? { ...w, ...patch } : w)
    }));
  },

  bringToFront: (id) => {
    zCounter++;
    set((state) => ({
      windows: state.windows.map(w => w.id === id ? { ...w, zIndex: zCounter, isFocused: true } : { ...w, isFocused: false }),
      focusedWindowId: id
    }));
  }
}));
`);

// layout and page
write('src/app/layout.tsx', `
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dhruba Raj Chaudhary — Full Stack Developer',
  description: 'Interactive macOS portfolio of Dhruba Raj Chaudhary.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`);

write('src/app/page.tsx', `
"use client";
import React, { useEffect, useState } from 'react';
import { useOSStore } from '@/store/useOSStore';
import BootScreen from '@/components/boot/BootScreen';
import LockScreen from '@/components/lock/LockScreen';
import Desktop from '@/components/desktop/Desktop';

export default function Home() {
  const phase = useOSStore((state) => state.phase);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="h-screen w-screen overflow-hidden">
      {phase === 'boot' && <BootScreen />}
      {phase === 'lock' && <LockScreen />}
      {phase === 'desktop' && <Desktop />}
    </main>
  );
}
`);

console.log("Stores, types, and basic layout setup generated.");
