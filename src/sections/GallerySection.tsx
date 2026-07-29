'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import galleryData from '@/data/gallery.json';

const ITEMS_PER_PAGE = 8;

function getPageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | string)[] = [1];
  if (current > 3) pages.push('...');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
}

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const totalPages = Math.ceil(galleryData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = galleryData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const openModal = (pageItemIndex: number) => {
    setModalIndex(startIndex + pageItemIndex);
    setImageLoaded(false);
    setModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalIndex(0);
    setImageLoaded(false);
  }, []);

  // Reset imageLoaded saat ganti foto
  useEffect(() => {
    setImageLoaded(false);
  }, [modalIndex]);

  // Prefetch tetangga SETELAH foto utama selesai dimuat
  useEffect(() => {
    if (!imageLoaded || !modalOpen) return;

    const prevIdx = (modalIndex - 1 + galleryData.length) % galleryData.length;
    const nextIdx = (modalIndex + 1) % galleryData.length;

    [prevIdx, nextIdx].forEach((idx) => {
      const img = new window.Image();
      img.src = galleryData[idx].image;
    });
  }, [imageLoaded, modalIndex, modalOpen]);

  // ESC menutup modal
  useEffect(() => {
    if (!modalOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') {
        setImageLoaded(false);
        setModalIndex((prev) => (prev + 1) % galleryData.length);
      }
      if (e.key === 'ArrowLeft') {
        setImageLoaded(false);
        setModalIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
      }
    };

    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [modalOpen, closeModal]);

  const changePage = (page: number) => {
    setCurrentPage(page);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section ref={ref} id="gallery" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-primary-light/60 text-sm tracking-[0.3em] uppercase font-light font-sans">
            Our Moments
          </span>
          <h2 className="text-gradient font-display font-bold text-4xl sm:text-5xl md:text-6xl mt-4 mb-6">
            Gallery Memories
          </h2>
          <p className="text-white/45 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans font-light">
            Setiap foto adalah potongan cerita yang akan selalu mengingatkan bahwa
            masa putih abu-abu adalah salah satu perjalanan terindah dalam hidup.
          </p>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {currentItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => openModal(i)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1]" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-[2]">
                  <p className="text-white text-xs sm:text-sm font-sans font-medium truncate">{item.title}</p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]">
                  <div className="w-10 h-10 rounded-full glass-strong flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500 pointer-events-none z-[3]" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-12"
          >
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:border-primary/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-white/60 disabled:hover:border-transparent text-sm font-sans cursor-pointer border-0 bg-transparent"
            >
              <ChevronLeft size={18} />
            </button>

            {getPageNumbers(currentPage, totalPages).map((page, i) =>
              typeof page === 'string' ? (
                <span key={`e-${i}`} className="w-10 h-10 flex items-center justify-center text-white/30 text-sm font-sans">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-sans font-medium transition-all duration-300 cursor-pointer border-0 ${
                    currentPage === page
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'glass text-white/60 hover:text-white hover:border-primary/40'
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:border-primary/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-white/60 disabled:hover:border-transparent text-sm font-sans cursor-pointer border-0 bg-transparent"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </div>

      {/* ========== MODAL / LIGHTBOX ========== */}
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeModal}
        >
          {/* CLOSE */}
          <button
            onClick={(e) => { e.stopPropagation(); closeModal(); }}
            className="absolute top-5 right-5 z-[10001] w-14 h-14 rounded-2xl glass-strong flex items-center justify-center text-white/70 hover:text-white hover:bg-primary/30 hover:scale-110 transition-all duration-300 cursor-pointer border-0"
            aria-label="Close"
          >
            <X size={28} strokeWidth={2} />
          </button>

          {/* PREV */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setImageLoaded(false);
              setModalIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-[10001] w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white/70 hover:text-white hover:bg-primary/20 transition-all duration-300 cursor-pointer border-0"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* NEXT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setImageLoaded(false);
              setModalIndex((prev) => (prev + 1) % galleryData.length);
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[10001] w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white/70 hover:text-white hover:bg-primary/20 transition-all duration-300 cursor-pointer border-0"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

          {/* FOTO + LOADING INDICATOR */}
          <div
            className="relative max-w-[90vw] max-h-[80vh] aspect-[16/10] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading Spinner — tampil saat gambar belum siap */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="modal-spinner" />
                <p className="text-white/30 text-xs mt-4 font-sans">Memuat foto...</p>
              </div>
            )}

            {/* Gambar — fade in setelah loaded */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: imageLoaded ? 1 : 0 }}
            >
              <Image
                src={galleryData[modalIndex].image}
                alt={galleryData[modalIndex].title}
                fill
                className="object-contain"
                sizes="90vw"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

          {/* CAPTION & COUNTER */}
          <div
            className="absolute bottom-6 left-0 right-0 text-center z-[10001] pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white/80 text-sm font-sans font-medium mb-1">
              {galleryData[modalIndex].title}
            </p>
            <p className="text-white/30 text-xs font-sans">
              {modalIndex + 1} / {galleryData.length}
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
}