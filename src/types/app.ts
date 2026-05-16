export type AppID = 'safari' | 'aboutme' | 'projects' | 'resume' | 'contact' | 'notes' | 'terminal' | 'music' | 'finder' | 'vscode' | 'settings' | 'photos' | 'skills' | 'calculator';

export interface App {
  id: AppID;
  label: string;
  icon: string;
  component: string;
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
}
