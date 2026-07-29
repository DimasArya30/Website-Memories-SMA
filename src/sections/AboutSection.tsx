'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, User, UserRound } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
}

const stats: StatItem[] = [
  { icon: <Users size={28} />, value: 36, label: 'Jumlah Siswa', suffix: ' Orang' },
  { icon: <User size={28} />, value: 12, label: 'Boy', suffix: '' },
  { icon: <UserRound size={28} />, value: 24, label: 'Girls', suffix: '' },
];

function CounterAnimation({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="tentang"
      className="relative py-28 sm:py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-0 w-[300px] h-[300px] bg-primary-light/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto section-padding">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-primary-light/60 text-sm tracking-[0.3em] uppercase font-light">
            About Us
          </span>
          <h2 className="text-gradient font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 mb-6">
            Tentang POFSAIT
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            POFSAIT bukan sekadar nama kelas, melainkan sebuah keluarga yang tumbuh
            bersama selama tiga tahun penuh perjuangan, tawa, mimpi, dan kenangan
            yang tak akan pernah terlupakan.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass rounded-2xl p-8 text-center card-hover group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary-light mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                {stat.icon}
              </div>
              <div className="font-display font-bold text-4xl sm:text-5xl text-white mb-2">
                <CounterAnimation
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </div>
              <p className="text-white/40 text-sm tracking-wider uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}