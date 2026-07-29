'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Trophy } from 'lucide-react';
import prestasiData from '@/data/prestasi.json';

import 'swiper/css';
import 'swiper/css/pagination';

export default function PrestasiSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="prestasi" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-200 to-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-primary-light/60 text-sm tracking-[0.3em] uppercase font-light">
            Achievements
          </span>
          <h2 className="text-gradient font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 mb-6">
            Prestasi
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Perjalanan kami tidak hanya dipenuhi kenangan, tetapi juga berbagai
            pencapaian yang menjadi bukti kerja sama, semangat, dan kebersamaan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {prestasiData.map((item, i) => (
              <SwiperSlide key={item.id}>
                <div className="glass rounded-2xl overflow-hidden card-hover group h-full">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.foto}
                      alt={item.judul}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
                    {/* Trophy badge */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                      <Trophy size={18} className="text-yellow-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-lg text-white mb-3 group-hover:text-primary-light transition-colors duration-300">
                      {item.judul}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>

                  {/* Hover border */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}