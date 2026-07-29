'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

// ============================================
// GANTI file ini dengan foto profil asli:
// /public/images/media/instagram-profile.jpg
// /public/images/media/tiktok-profile.jpg
// ============================================
const socials = [
  {
    name: 'Instagram',
    handle: '@the.pofsait',
    url: 'https://www.instagram.com/the.pofsait?igsh=MW53cmMyYnU5Z2E0MA%3D%3D&utm_source=qr',
    localImg: '/images/media/instagram-profile.jpg',
    fallbackImg: 'https://picsum.photos/seed/igprofile/800/600',
  },
  {
    name: 'TikTok',
    handle: '@the.pofsait',
    url: 'https://www.tiktok.com/@the.pofsait',
    localImg: '/images/media/tiktok-profile.jpg',
    fallbackImg: 'https://picsum.photos/seed/ttprofile/800/600',
  },
];

export default function MediaSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [imgSources, setImgSources] = useState<Record<string, string>>({});

  useEffect(() => {
    socials.forEach((s) => {
      fetch(s.localImg, { method: 'HEAD' })
        .then((res) => {
          if (res.ok) {
            setImgSources((prev) => ({ ...prev, [s.name]: s.localImg }));
          } else {
            setImgSources((prev) => ({ ...prev, [s.name]: s.fallbackImg }));
          }
        })
        .catch(() => {
          setImgSources((prev) => ({ ...prev, [s.name]: s.fallbackImg }));
        });
    });
  }, []);

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
          <span className="text-primary-light/60 text-sm tracking-[0.3em] uppercase font-light font-sans">
            Stay Connected
          </span>
          <h2 className="text-gradient font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 mb-6">
            Media Sosial
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans font-light">
            Tetap terhubung bersama kami melalui media sosial resmi POFSAIT untuk
            melihat berbagai aktivitas, keseruan, dan kenangan yang terus bertambah.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
              className="group relative rounded-3xl overflow-hidden card-hover block"
              style={{ minHeight: '360px' }}
            >
              {/* Background Foto Profil */}
              {imgSources[social.name] && (
                <Image
                  src={imgSources[social.name]}
                  alt={`${social.name} Profile`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-500 z-[1]" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent z-[1]" />

              {/* Content */}
              <div className="relative z-[2] flex flex-col justify-end h-full p-8">
                <h3 className="font-display font-semibold text-2xl text-white mb-1">
                  {social.name}
                </h3>
                <p className="text-white/50 text-sm mb-6 font-sans">{social.handle}</p>

                <button className="self-start flex items-center gap-2 px-6 py-3 bg-primary/80 hover:bg-primary text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 font-sans">
                  Kunjungi {social.name}
                  <ArrowUpRight size={16} />
                </button>
              </div>

              {/* Glass border */}
              <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none z-[3]" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}