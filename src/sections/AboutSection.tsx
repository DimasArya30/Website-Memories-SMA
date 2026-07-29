'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ============================================
// GANTI file ini untuk mengganti background statistik
// Taruh foto kelas di: /public/images/about-statistics.jpg
// ============================================
const ABOUT_STAT_BG = '/images/about-statistics.jpg';
const ABOUT_STAT_FALLBACK = 'https://picsum.photos/seed/aboutstat/1920/800';

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
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' });
  const [bgSrc, setBgSrc] = useState(ABOUT_STAT_FALLBACK);

  useEffect(() => {
    fetch(ABOUT_STAT_BG, { method: 'HEAD' })
      .then((res) => { if (res.ok) setBgSrc(ABOUT_STAT_BG); })
      .catch(() => {});
  }, []);

  return (
    <section ref={ref} id="tentang" className="relative overflow-hidden">
      {/* ========== BAGIAN ATAS: Judul + Deskripsi ========== */}
      {/* Background: gradient ungu gelap biasa, BUKAN foto */}
      <div className="relative py-28 sm:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark-200" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-primary-light/60 text-sm tracking-[0.3em] uppercase font-light font-sans">
              About Us
            </span>
            <h2 className="text-gradient font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 mb-6">
              Tentang POFSAIT
            </h2>
            {/* Garis dekoratif ungu */}
            <div className="mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mb-8" />

            <p className="text-white/55 text-base sm:text-lg md:text-xl leading-relaxed font-sans font-light">
              POFSAIT bukan hanya sebuah nama kelas, tetapi keluarga kedua yang tumbuh
              bersama selama tiga tahun. Di sinilah kami belajar, tertawa, berjuang,
              saling mendukung, dan menciptakan kenangan yang akan selalu kami ingat
              sepanjang hidup.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ========== BAGIAN BAWAH: Statistik di atas Foto ========== */}
      {/* Hanya bagian ini yang pakai background foto */}
      <div
        ref={statsRef}
        className="relative py-20 sm:py-28"
        style={{
          backgroundImage: `url(${bgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay hitam 50% + gradient ungu */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/15" />

        {/* Garis atas */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Statistik */}
        <div className="relative z-10 max-w-3xl mx-auto section-padding">
          <div className="grid grid-cols-3 gap-6 sm:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-center"
              >
                <div className="font-display font-bold text-5xl sm:text-6xl md:text-8xl text-white mb-2">
                  <CounterAnimation target={stat.value} inView={statsInView} />
                </div>
                <p className="text-primary-light/70 text-xs sm:text-sm tracking-[0.35em] uppercase font-sans font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}