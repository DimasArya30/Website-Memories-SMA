'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import anggotaData from '@/data/anggota.json';

function MemberCard({
  anggota,
  index,
  isInView,
}: {
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
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.03, 0.6),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div className="glass rounded-2xl overflow-hidden">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={anggota.foto}
              alt={anggota.nama}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="p-3 text-center">
            <h4 className="text-white/90 text-sm font-medium truncate group-hover:text-white transition-colors font-sans">
              {anggota.nama}
            </h4>
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/40 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/20 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function AnggotaPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <>
      <Navbar />

      <main className="relative z-[2] pt-28 pb-20 min-h-screen">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-dark" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div ref={ref} className="relative z-10 max-w-6xl mx-auto section-padding">
          {/* Breadcrumb / Back */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              href="/#anggota"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-300 font-sans"
            >
              <ArrowLeft size={18} />
              Kembali ke Beranda
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <span className="text-primary-light/60 text-sm tracking-[0.3em] uppercase font-light font-sans">
              All Members
            </span>
            <h1 className="text-gradient font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 mb-4">
              Semua Anggota
            </h1>
            <p className="text-white/40 text-base font-sans font-light">
              36 anggota keluarga POFSAIT — MIPA 2 SMANEKA
            </p>
            <div className="mx-auto mt-6 w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.div>

          {/* Grid Semua Anggota */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {anggotaData.map((anggota, i) => (
              <MemberCard key={anggota.id} anggota={anggota} index={i} isInView={isInView} />
            ))}
          </div>

          {/* Back button bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center mt-16"
          >
            <Link
              href="/#anggota"
              className="inline-flex items-center gap-2 px-8 py-3.5 glass text-white/70 hover:text-white font-medium rounded-full text-sm tracking-wide hover:border-primary/40 transition-all duration-300 font-sans"
            >
              <ArrowLeft size={18} />
              Kembali ke Beranda
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}