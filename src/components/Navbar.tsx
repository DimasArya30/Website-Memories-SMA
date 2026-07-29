'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Tidak ada fullPage — semua navigasi pure scroll dalam satu halaman
const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#media', label: 'Media' },
  { href: '#walikelas', label: 'Wali Kelas' },
  { href: '#anggota', label: 'Anggota' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#prestasi', label: 'Prestasi' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Semua navigasi menggunakan scrollIntoView — tidak pernah reload halaman
  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-lg shadow-primary/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto section-padding flex items-center justify-between">
          <button
            onClick={() => handleClick('#home')}
            className="relative z-10 flex items-center gap-3 group bg-transparent border-0 cursor-pointer p-0"
          >
            <Image
              src={`/images/logo.png?v=${Date.now()}`}
              alt="POFSAIT"
              width={52}
              height={52}
              className="transition-transform duration-300 group-hover:scale-110"
              priority
              unoptimized
            />
            <div className="hidden sm:block text-left">
              <span className="text-gradient font-display font-bold text-lg leading-tight block">
                THE POFSAIT
              </span>
              <span className="text-white/40 text-[11px] tracking-[0.2em] uppercase">
                MIPA 2 SMANEKA
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="relative px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-300 group bg-transparent border-0 cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-6" />
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-10 p-2 text-white/80 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="navbar-separator" />
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[190] bg-dark/95 backdrop-blur-2xl flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="text-2xl font-display font-semibold text-white/70 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}