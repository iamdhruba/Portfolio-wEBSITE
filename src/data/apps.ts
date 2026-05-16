import { App } from '@/types/app';

export const APP_REGISTRY: App[] = [
  {
    id: 'safari', label: 'Safari',
    icon: 'https://raw.githubusercontent.com/PuruVJ/macos-web/main/public/app-icons/safari/512.png',
    component: 'Safari', defaultSize: { width: 960, height: 640 }, minSize: { width: 600, height: 400 }
  },
  {
    id: 'projects', label: 'Projects',
    // Launchpad icon — grid of apps perfectly represents the projects grid
    icon: 'https://raw.githubusercontent.com/PuruVJ/macos-web/main/public/app-icons/launchpad/512.png',
    component: 'ProjectsApp', defaultSize: { width: 860, height: 620 }, minSize: { width: 600, height: 400 }
  },
  {
    id: 'resume', label: 'Resume',
    // Mail icon — represents the 'email' icon the user mentioned
    icon: 'https://raw.githubusercontent.com/PuruVJ/macos-web/main/public/app-icons/mail/512.png',
    component: 'ResumeApp', defaultSize: { width: 700, height: 860 }, minSize: { width: 500, height: 600 }
  },
  {
    id: 'contact', label: 'Messages',
    // Messages icon — chat / contact
    icon: 'https://raw.githubusercontent.com/PuruVJ/macos-web/main/public/app-icons/messages/512.png',
    component: 'ContactApp', defaultSize: { width: 900, height: 600 }, minSize: { width: 600, height: 400 }
  },
  {
    id: 'notes', label: 'Notes',
    icon: 'https://raw.githubusercontent.com/PuruVJ/macos-web/main/public/app-icons/notes/512.png',
    component: 'NotesApp', defaultSize: { width: 700, height: 520 }, minSize: { width: 500, height: 400 }
  },
  {
    id: 'terminal', label: 'Terminal',
    icon: 'https://raw.githubusercontent.com/PuruVJ/macos-web/main/public/app-icons/terminal/512.png',
    component: 'Terminal', defaultSize: { width: 640, height: 400 }, minSize: { width: 400, height: 300 }
  },
  {
    id: 'skills', label: 'Gallery',
    // Photos icon — gallery of images
    icon: 'https://raw.githubusercontent.com/PuruVJ/macos-web/main/public/app-icons/photos/512.png',
    component: 'SkillsApp', defaultSize: { width: 860, height: 560 }, minSize: { width: 600, height: 400 }
  },
  {
    id: 'calculator', label: 'Calculator',
    icon: 'https://raw.githubusercontent.com/PuruVJ/macos-web/main/public/app-icons/calculator/512.png',
    component: 'Calculator', defaultSize: { width: 320, height: 500 }, minSize: { width: 320, height: 480 }
  },
  {
    id: 'vscode', label: 'VS Code',
    icon: 'https://raw.githubusercontent.com/PuruVJ/macos-web/main/public/app-icons/vscode/512.png',
    component: 'VSCodeApp', defaultSize: { width: 1000, height: 700 }, minSize: { width: 600, height: 400 }
  },
];
