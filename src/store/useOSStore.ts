import { create } from 'zustand';
import { WallpaperID, Notification, ContextMenuState } from '@/types/os';
import { AppID } from '@/types/app';

interface OSState {
  phase: 'boot' | 'lock' | 'desktop';
  theme: 'dark' | 'light';
  wallpaper: WallpaperID;
  activeApp: AppID | null;
  openApps: AppID[];
  notifications: Notification[];
  spotlightOpen: boolean;
  missionControlOpen: boolean;
  notificationCenterOpen: boolean;
  contextMenu: ContextMenuState | null;
  dockIconRects: Record<string, { x: number, y: number, width: number, height: number }>;

  user: {
    name: string;
    description: string;
    profilePic: string;
  };
  setPhase: (phase: 'boot' | 'lock' | 'desktop') => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setWallpaper: (wallpaper: WallpaperID) => void;
  setUser: (user: Partial<OSState['user']>) => void;
  setActiveApp: (appId: AppID | null) => void;
  addOpenApp: (appId: AppID) => void;
  removeOpenApp: (appId: AppID) => void;
  toggleSpotlight: () => void;
  setDockIconRect: (appId: string, rect: { x: number, y: number, width: number, height: number }) => void;
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
  dockIconRects: {},
  user: {
    name: 'Dhruba Raj Chaudhary',
    description: 'Full Stack Developer',
    profilePic: '/image/pp.jpeg',
  },

  setPhase: (phase) => set({ phase }),
  setTheme: (theme) => set({ theme }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  setUser: (userData) => set((state) => ({ user: { ...state.user, ...userData } })),
  setActiveApp: (activeApp) => set({ activeApp }),
  addOpenApp: (appId) => set((state) => ({ openApps: state.openApps.includes(appId) ? state.openApps : [...state.openApps, appId] })),
  removeOpenApp: (appId) => set((state) => ({ openApps: state.openApps.filter((id) => id !== appId) })),
  toggleSpotlight: () => set((state) => ({ spotlightOpen: !state.spotlightOpen })),
  setDockIconRect: (appId, rect) => set((state) => ({ 
    dockIconRects: { ...state.dockIconRects, [appId]: rect } 
  })),
}));
