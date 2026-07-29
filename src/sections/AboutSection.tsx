'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ============================================
// GANTI FILE INI untuk mengganti background Tentang
// Taruh foto kelas di: /public/images/about-bg.jpg
// ============================================
const ABOUT_BACKGROUND = '/images/about-bg.jpg';
const ABOUT_FALLBACK = 'https://picsum.photos/seed/aboutclass/1920/1080';

function CounterAnimation({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return <span>{count}</span>;
}

const stats = [
  { value: 36, label: 'SISWA' },
  { value: 12, label: 'BOYS' },
  { value: 24, label: 'GIRLS' },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [bgSrc, setBgSrc] = useState(ABOUT_FALLBACK);

  useEffect(() => {
    fetch(ABOUT_BACKGROUND, { method: 'HEAD' })
      .then((res) => { if (res.ok) setBgSrc(ABOUT_BACKGROUND); })
      .catch(() => {});
  }, []);

  return (
    <section
      ref={ref}
      id="tentang"
      className="relative py-32 sm:py-44 overflow-hidden"
    >
      {/* Background Foto Kelas */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgSrc})` }}
      />

      {/* Overlay hitam + gradient ungu */}
      <div className="absolute inset-0 z-[1] bg-black/60" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-primary/10 via-transparent to-primary/15" />

      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-[2]" />

      <div className="relative z-10 max-w-5xl mx-auto section-padding text-center">
        {/* Judul */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <span className="text-primary-light/60 text-sm tracking-[0.3em] uppercase font-light font-sans">
            About Us
          </span>
          <h2 className="text-gradient font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 mb-6">
            Tentang POFSAIT
          </h2>
          {/* Garis dekoratif ungu */}
          <div className="mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* Deskripsi */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-20 font-sans font-light"
        >
          POFSAIT bukan hanya sebuah nama kelas, tetapi keluarga kedua yang tumbuh
          bersama selama tiga tahun. Di sinilah kami belajar, tertawa, berjuang,
          saling mendukung, dan menciptakan kenangan yang akan selalu kami ingat
          sepanjang hidup.
        </motion.p>

        {/* Statistik — di atas background, tanpa card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center"
            >
              <div className="font-display font-bold text-6xl sm:text-7xl md:text-8xl text-white mb-2">
                <CounterAnimation target={stat.value} inView={isInView} />
              </div>
              <p className="text-primary-light/70 text-sm tracking-[0.35em] uppercase font-sans font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}