"use client";
import React, { useEffect, useState } from 'react';
import { useOSStore } from '@/store/useOSStore';
import BootScreen from '@/components/boot/BootScreen';
import LockScreen from '@/components/lock/LockScreen';
import Desktop from '@/components/desktop/Desktop';

export default function Home() {
  const phase = useOSStore((state) => state.phase);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="h-screen w-screen overflow-hidden">
      {phase === 'boot' && <BootScreen />}
      {phase === 'lock' && <LockScreen />}
      {phase === 'desktop' && <Desktop />}
    </main>
  );
}
