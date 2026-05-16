import React from 'react';
import { 
  Globe, 
  User, 
  Briefcase, 
  FileText, 
  Mail, 
  FileEdit, 
  TerminalSquare, 
  Music, 
  FolderOpen, 
  Code2, 
  Settings,
  Image as ImageIcon,
  Trash2,
  Code
} from 'lucide-react';
import { AppID } from '@/types/app';

export function AppIcon({ appId, size = 40, className = '' }: { appId: string; size?: number; className?: string }) {
  const iconProps = { size, className: `${className} drop-shadow-md` };
  
  switch (appId) {
    case 'safari': return <Globe {...iconProps} className={`text-blue-400 ${className}`} />;
    case 'aboutme': return <User {...iconProps} className={`text-green-400 ${className}`} />;
    case 'projects': return <Briefcase {...iconProps} className={`text-purple-400 ${className}`} />;
    case 'skills': return <Code {...iconProps} className={`text-yellow-400 ${className}`} />;
    case 'resume': return <FileText {...iconProps} className={`text-red-400 ${className}`} />;
    case 'contact': return <Mail {...iconProps} className={`text-blue-300 ${className}`} />;
    case 'notes': return <FileEdit {...iconProps} className={`text-yellow-200 ${className}`} />;
    case 'terminal': return <TerminalSquare {...iconProps} className={`text-gray-400 ${className}`} />;
    case 'music': return <Music {...iconProps} className={`text-pink-400 ${className}`} />;
    case 'finder': return <FolderOpen {...iconProps} className={`text-blue-500 ${className}`} />;
    case 'vscode': return <Code2 {...iconProps} className={`text-blue-600 ${className}`} />;
    case 'photos': return <ImageIcon {...iconProps} className={`text-purple-500 ${className}`} />;
    case 'settings': return <Settings {...iconProps} className={`text-gray-500 ${className}`} />;
    case 'trash': return <Trash2 {...iconProps} className={`text-gray-400 ${className}`} />;
    default: return <div className={`bg-gray-700 rounded-lg flex items-center justify-center ${className}`} style={{ width: size, height: size }}><span className="text-white font-bold text-xs">?</span></div>;
  }
}
