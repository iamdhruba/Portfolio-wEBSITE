import { AppID } from './app';

export interface WindowInstance {
  id: string;           // uuid
  appId: AppID;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  minWidth: number;
  minHeight: number;
  prevBounds?: { x: number; y: number; width: number; height: number };
}
