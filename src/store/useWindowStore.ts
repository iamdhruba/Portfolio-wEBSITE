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
            const menuBarHeight = 28;
            const dockHeight = 84; // 72px + 12px margin
            return { 
              ...w, 
              isMaximized: true, 
              prevBounds: { x: w.x, y: w.y, width: w.width, height: w.height }, 
              x: 0, 
              y: menuBarHeight, 
              width: window.innerWidth, 
              height: window.innerHeight - menuBarHeight - dockHeight 
            };
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
