import React from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/useWindowStore';
import { useOSStore } from '@/store/useOSStore';
import { APP_REGISTRY } from '@/data/apps';
import Safari from '../apps/safari/Safari';
import ProjectsApp from '../apps/projects/ProjectsApp';
import ResumeApp from '../apps/resume/ResumeApp';
import ContactApp from '../apps/contact/ContactApp';
import NotesApp from '../apps/notes/NotesApp';
import Terminal from '../apps/terminal/terminal';
import SkillsApp from '../apps/skills/SkillsApp';
import Calculator from '../apps/calculator/Calculator';
import VSCodeApp from '../apps/vscode/VSCodeApp';
import IPhoneFrame from '@/components/shared/IPhoneFrame';

export default function Window({ win }: any) {
  const { updateWindow, bringToFront, closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();
  const setActiveApp = useOSStore(state => state.setActiveApp);



  const handleFocus = () => {
    bringToFront(win.id);
    setActiveApp(win.appId);
  };

  const appDef = APP_REGISTRY.find(a => a.id === win.appId);

  const dockIconRects = useOSStore(state => state.dockIconRects);
  const iconRect = dockIconRects[win.appId];


  // Calculate start position relative to the window's actual X/Y
  const startX = iconRect ? iconRect.x - win.x : 0;
  const startY = iconRect ? iconRect.y - win.y : 100;
  const startScale = iconRect ? iconRect.width / win.width : 0.1;

  return (
    <Rnd
      position={{ x: win.x, y: win.y }}
      size={{ width: win.width, height: win.height }}
      minWidth={win.minWidth}
      minHeight={win.minHeight}
      dragHandleClassName="window-titlebar"
      bounds="parent"
      className="pointer-events-auto"
      onDragStart={handleFocus}
      onDragStop={(e, d) => {
        if (!win.isMaximized) {
          updateWindow(win.id, { x: d.x, y: d.y });
        }
      }}
      onResizeStart={handleFocus}
      onResizeStop={(e, dir, ref, delta, pos) => {
        if (!win.isMaximized) {
          updateWindow(win.id, {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            ...pos
          });
        }
      }}
      style={{ zIndex: win.zIndex }}
      enableResizing={!win.isMaximized}
      disableDragging={win.isMaximized}
    >
      <motion.div
        layout
        className="glass flex h-full w-full flex-col overflow-hidden rounded-[12px] shadow-window"
        initial={{ 
          x: startX, 
          y: startY, 
          scale: startScale, 
          opacity: 0,
          filter: 'blur(10px)'
        }}
        animate={{ 
          x: 0, 
          y: 0, 
          scale: 1, 
          opacity: 1,
          filter: 'blur(0px)'
        }}
        exit={{ 
          x: startX, 
          y: startY, 
          scale: startScale, 
          opacity: 0,
          filter: 'blur(10px)'
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 260, 
          damping: 26,
          layout: { type: 'spring', stiffness: 300, damping: 30 }
        }}
        onClick={handleFocus}
        style={{ backgroundColor: 'var(--window-bg)' }}
      >
        <div 
          className="window-titlebar flex h-[40px] w-full items-center px-4 relative z-50 shrink-0"
          style={{ backgroundColor: 'var(--window-header)', borderBottom: '1px solid var(--window-border)' }}
        >
          <div className="group flex items-center space-x-2">
            <button 
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] border border-black/10 shadow-inner" 
              onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/60">✕</span>
            </button>
            <button 
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] border border-black/10 shadow-inner"
              onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/60">−</span>
            </button>
            <button 
              className="flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] border border-black/10 shadow-inner"
              onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
            >
              <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-black/60">⤢</span>
            </button>
          </div>
          <div className="flex-1 text-center text-[13px] font-semibold text-white/90 truncate px-4">
            {win.title}
          </div>
          <div className="w-14" />
        </div>
        
        <div className="flex-1 overflow-hidden relative bg-[#0f0f0f]">
          {win.appId === 'safari' && <Safari />}
          {win.appId === 'projects' && <ProjectsApp />}
          {win.appId === 'resume' && <ResumeApp />}
          {win.appId === 'contact' && <ContactApp />}
          {win.appId === 'notes' && <NotesApp />}
          {win.appId === 'terminal' && <Terminal />}
          {win.appId === 'skills' && <SkillsApp />}
          {win.appId === 'calculator' && <Calculator />}
          {win.appId === 'vscode' && <VSCodeApp />}
        </div>
      </motion.div>
    </Rnd>
  );
}
