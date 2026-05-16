import { AppID } from './app';

export interface Notification {
  id: string;
  appId?: AppID;
  title: string;
  message: string;
  timestamp: number;
}

export interface ContextMenuState {
  x: number;
  y: number;
  items: ContextMenuItem[];
}

export interface ContextMenuItem {
  label: string;
  onClick: () => void;
  divider?: boolean;
}

export type WallpaperID = 'ventura-day' | 'ventura-night' | 'sonoma-day' | 'sonoma-night' | 'abstract-blue' | 'abstract-purple' | 'developer' | 'nepal';
