import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/useWindowStore';
import Window from './Window';

export default function WindowManager() {
  const windows = useWindowStore((state) => state.windows);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {windows.filter(win => !win.isMinimized).map((win) => (
          <Window key={win.id} win={win} />
        ))}
      </AnimatePresence>
    </div>
  );
}
