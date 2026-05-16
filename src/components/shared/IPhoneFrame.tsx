import React from 'react';
import { motion } from 'framer-motion';

export default function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-900/50 p-4">
      <motion.div 
        className="relative h-[680px] max-h-full w-[340px] max-w-full overflow-hidden rounded-[47px] border-[8px] border-gray-800 bg-black shadow-2xl shrink-0"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="absolute left-1/2 top-2 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black"></div>
        <div className="h-full w-full overflow-hidden bg-white">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
