'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, 80]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image dengan Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <Image
          src="https://picsum.photos/seed/classphoto2024/1920/1080"
          alt="Kelas MIPA 2"
          fill
          className="object-cover scale-110"
          priority
          quality={80}
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark/70 via-dark/60 to-dark" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />

      {/* Mouse-follow glow */}
      <div
        className="absolute z-[2] w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(108,59,255,0.12) 0%, transparent 70%)',
          left: `calc(50% + ${mousePos.x}px - 250px)`,
          top: `calc(50% + ${mousePos.y}px - 250px)`,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl"
        style={{ opacity: textOpacity, y: textY }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-primary-light/80 text-sm sm:text-base tracking-[0.4em] uppercase font-light mb-6"
          >
            Welcome to
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-2"
          >
            MIPA 2
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-gradient font-display font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-8"
          >
            THE POFSAIT
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/50 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12"
          >
            &ldquo;Buat memories terbaik bersama keluarga kedua yang penuh cerita, tawa, perjuangan, dan prestasi.&rdquo;
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollTo('#tentang')}
              className="btn-ripple px-8 py-3.5 bg-gradient-animated text-white font-medium rounded-full text-sm tracking-wide hover:shadow-xl hover:shadow-primary/30 transition-shadow duration-300"
            >
              Explore Memories
            </button>
            <button
              onClick={() => scrollTo('#gallery')}
              className="btn-ripple px-8 py-3.5 glass text-white/80 font-medium rounded-full text-sm tracking-wide hover:text-white hover:border-primary/40 transition-all duration-300"
            >
              Lihat Gallery
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-white/30 text-[11px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-float z-0" />
      <div className="absolute bottom-1/4 right-[10%] w-48 h-48 bg-primary-light/10 rounded-full blur-[80px] animate-float-delayed z-0" />
    </section>
  );
}