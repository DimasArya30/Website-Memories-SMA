'use client';

import { useEffect, useRef, useState } from 'react';

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -500, y: -500 });
  const visibleRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
      if (!visibleRef.current) visibleRef.current = true;
      // Throttle dengan rAF — max 60fps
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setPos({ ...posRef.current });
          rafRef.current = 0;
        });
      }
    };

    const handleLeave = () => {
      visibleRef.current = false;
      setPos({ x: -500, y: -500 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleLeave);
    document.body.addEventListener('mouseenter', () => { visibleRef.current = true; });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visibleRef.current && pos.x === -500) return null;

  return (
    <div
      className="fixed pointer-events-none z-[90] w-[350px] h-[350px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(108,59,255,0.06) 0%, transparent 70%)',
        left: pos.x - 175,
        top: pos.y - 175,
        willChange: 'left, top',
      }}
    />
  );
}