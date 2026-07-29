'use client';

import { useEffect, useState } from 'react';

export default function MouseGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[90] w-[400px] h-[400px] rounded-full transition-opacity duration-300"
      style={{
        background: 'radial-gradient(circle, rgba(108,59,255,0.08) 0%, transparent 70%)',
        left: mousePos.x - 200,
        top: mousePos.y - 200,
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
}