'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import walikelasData from '@/data/walikelas.json';

export default function WalikelasSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="walikelas" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-1/3 right-0 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-primary-light/60 text-sm tracking-[0.3em] uppercase font-light">
            Our Guides
          </span>
          <h2 className="text-gradient font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 mb-6">
            Wali Kelas
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Di balik setiap langkah dan perjalanan kami, terdapat sosok guru yang
            selalu membimbing, mengarahkan, dan memberikan motivasi untuk menjadi
            pribadi yang lebih baik.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {walikelasData.map((guru, i) => (
            <motion.div
              key={guru.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative"
            >
              <div className="glass rounded-3xl overflow-hidden card-hover">
                {/* Foto */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={guru.foto}
                    alt={guru.nama}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display font-semibold text-xl text-white mb-1">
                    {guru.nama}
                  </h3>
                  <p className="text-primary-light/80 text-sm">{guru.peran}</p>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}