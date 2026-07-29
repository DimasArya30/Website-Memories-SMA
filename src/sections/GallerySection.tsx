'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from 'swiper/modules';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import galleryData from '@/data/gallery.json';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightbox.open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox({ open: false, index: 0 });
      if (e.key === 'ArrowRight') {
        setLightbox((prev) => ({
          ...prev,
          index: (prev.index + 1) % galleryData.length,
        }));
      }
      if (e.key === 'ArrowLeft') {
        setLightbox((prev) => ({
          ...prev,
          index: (prev.index - 1 + galleryData.length) % galleryData.length,
        }));
      }
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightbox.open]);

  return (
    <section ref={ref} id="gallery" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-primary-light/60 text-sm tracking-[0.3em] uppercase font-light">
            Our Moments
          </span>
          <h2 className="text-gradient font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 mb-6">
            Gallery Memories
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Setiap foto adalah potongan cerita yang akan selalu mengingatkan bahwa
            masa putih abu-abu adalah salah satu perjalanan terindah dalam hidup.
          </p>
        </motion.div>

        {/* Main Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, Thumbs]}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            className="rounded-2xl overflow-hidden"
          >
            {galleryData.map((item, i) => (
              <SwiperSlide key={item.id}>
                <div
                  className="relative aspect-[16/10] cursor-pointer group"
                  onClick={() => setLightbox({ open: true, index: i })}
                >
                  <Image
                    src={item.foto}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 1280px) 100vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-sm font-medium">{item.caption}</p>
                  </div>
                  {/* Click indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full glass-strong flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbs */}
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Thumbs]}
            spaceBetween={8}
            slidesPerView="auto"
            freeMode
            watchSlidesProgress
            className="mt-4 !overflow-visible"
          >
            {galleryData.map((item) => (
              <SwiperSlide key={item.id} className="!w-16 !h-16 sm:!w-20 sm:!h-20 rounded-xl overflow-hidden opacity-50 transition-opacity duration-300 [&.swiper-slide-thumb-active]:opacity-100">
                <Image
                  src={item.foto}
                  alt={item.caption}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="80px"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lightbox-overlay"
            onClick={() => setLightbox({ open: false, index: 0 })}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox({ open: false, index: 0 })}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) => ({
                  ...prev,
                  index: (prev.index - 1 + galleryData.length) % galleryData.length,
                }));
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) => ({
                  ...prev,
                  index: (prev.index + 1) % galleryData.length,
                }));
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[85vh] aspect-[16/10]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryData[lightbox.index].foto}
                alt={galleryData[lightbox.index].caption}
                fill
                className="object-contain rounded-lg"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-white/70 text-sm">
                {galleryData[lightbox.index].caption}
              </p>
              <p className="text-white/30 text-xs mt-1">
                {lightbox.index + 1} / {galleryData.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}