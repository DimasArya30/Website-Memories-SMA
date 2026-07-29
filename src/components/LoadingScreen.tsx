'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Hanya tampil sekali per sesi browser
    // Tidak akan muncul lagi saat navigasi internal
    const hasLoaded = sessionStorage.getItem('pofsait-loaded');
    if (hasLoaded) return;

    setIsLoading(true);

    const timer = setTimeout(() => {
      setFadeOut(true);
      sessionStorage.setItem('pofsait-loaded', 'true');
      setTimeout(() => setIsLoading(false), 600);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark ${
        fadeOut ? 'fade-out-up' : ''
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="logo-reveal relative z-10">
        <Image
          src={`/images/logo.png?v=${Date.now()}`}
          alt="THE POFSAIT"
          width={180}
          height={180}
          priority
          unoptimized
          className="drop-shadow-2xl"
        />
      </div>

      <div className="mt-10 w-48 h-1 bg-white/10 rounded-full overflow-hidden relative z-10">
        <div className="h-full bg-gradient-animated rounded-full loading-bar" />
      </div>

      <p className="mt-5 text-primary-light/60 text-sm tracking-[0.3em] uppercase font-light relative z-10">
        Loading Memories
      </p>
    </div>
  );
}