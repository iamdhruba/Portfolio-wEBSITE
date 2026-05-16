import React, { useEffect } from 'react';
import { useOSStore } from '@/store/useOSStore';

export default function BootScreen() {
  const setPhase = useOSStore((state) => state.setPhase);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('lock');
    }, 3500);
    return () => clearTimeout(timer);
  }, [setPhase]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black transition-opacity duration-700 ease-in-out">
      <div className="animate-fade-in text-white duration-1000">
        <svg viewBox="0 0 512 512" width="80" height="80" fill="currentColor">
          <path d="M388.53 266.94c-.25-56.76 46.24-84.03 48.33-85.31-26.41-38.64-67.58-43.91-82.16-44.51-34.86-3.55-68.04 20.49-85.73 20.49-17.7 0-45.1-20.11-74.05-19.82-38.08.57-73.18 22.14-92.74 56.12-39.46 68.61-10.1 169.95 28.52 225.8 18.9 27.27 41.34 57.84 70.83 56.71 28.42-1.09 39.15-18.3 73.55-18.3 34.34 0 44.1 18.3 74.08 17.71 30.55-.57 50.15-27.75 68.89-55.15 21.68-31.7 30.63-62.36 31.11-63.98-.67-.32-59.93-23.01-60.67-91.86M315.69 114.5c15.59-18.91 26.13-45.2 23.25-71.4-22.56.91-49.88 15.03-66.04 33.91-14.47 16.79-27.13 43.68-23.76 69.2 25.12 2.01 50.96-12.8 66.55-31.71" />
        </svg>
      </div>
      <div className="mt-20 h-[6px] w-56 overflow-hidden rounded-full bg-white/10 border border-white/5">
        <div className="h-full bg-white/90 transition-all ease-linear" style={{ width: '100%', animation: 'progressBar 3s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both' }}></div>
      </div>
      <style>{`
        @keyframes progressBar {
          0% { width: 0%; }
          10% { width: 15%; }
          50% { width: 45%; }
          80% { width: 85%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
