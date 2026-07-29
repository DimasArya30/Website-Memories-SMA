'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const socials = [
  {
    name: 'Instagram',
    handle: '@the.pofsait',
    url: 'https://www.instagram.com/the.pofsait?igsh=MW53cmMyYnU5Z2E0MA%3D%3D&utm_source=qr',
    color: 'from-pink-500 via-purple-500 to-orange-400',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@the.pofsait',
    url: 'https://www.tiktok.com/@the.pofsait',
    color: 'from-cyan-400 via-purple-500 to-pink-500',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z" />
      </svg>
    ),
  },
];

export default function MediaSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="media" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-200 to-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-primary-light/60 text-sm tracking-[0.3em] uppercase font-light">
            Stay Connected
          </span>
          <h2 className="text-gradient font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 mb-6">
            Media Sosial
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Tetap terhubung bersama kami melalui media sosial resmi POFSAIT untuk
            melihat berbagai aktivitas, keseruan, dan kenangan yang terus bertambah.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass rounded-2xl p-8 text-center card-hover group relative overflow-hidden"
            >
              {/* Gradient glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 text-white/70 mb-6 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                  {social.icon}
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-1">
                  {social.name}
                </h3>
                <p className="text-white/40 text-sm mb-4">{social.handle}</p>
                <span className="inline-flex items-center gap-2 text-primary-light text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Kunjungi <ExternalLink size={14} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}