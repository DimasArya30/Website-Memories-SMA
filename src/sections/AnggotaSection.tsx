'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import anggotaData from '@/data/anggota.json';

function TiltCard({ anggota, index, isInView }: {
  anggota: typeof anggotaData[0];
  index: number;
  isInView: boolean;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.8),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative cursor-pointer"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div className="glass rounded-2xl overflow-hidden">
          {/* Foto */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={anggota.foto}
              alt={anggota.nama}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Nama */}
          <div className="p-3 text-center">
            <h4 className="text-white/90 text-sm font-medium truncate group-hover:text-white transition-colors">
              {anggota.nama}
            </h4>
          </div>
        </div>

        {/* Glow border on hover */}
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/40 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/20 pointer-events-none" />
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-transparent group-hover:to-primary-light/10 transition-all duration-500 pointer-events-none blur-sm" />
      </div>
    </motion.div>
  );
}

export default function AnggotaSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="anggota" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-200 to-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary-light/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-primary-light/60 text-sm tracking-[0.3em] uppercase font-light">
            Our Family
          </span>
          <h2 className="text-gradient font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 mb-6">
            Anggota Kelas
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            36 pribadi dengan karakter, impian, dan cerita yang berbeda, namun
            dipersatukan dalam satu keluarga bernama POFSAIT.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {anggotaData.map((anggota, i) => (
            <TiltCard
              key={anggota.id}
              anggota={anggota}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}