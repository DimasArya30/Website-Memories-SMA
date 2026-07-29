'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '#home', label: 'Home', page: '/' },
  { href: '#tentang', label: 'Tentang', page: '/' },
  { href: '#media', label: 'Media', page: '/' },
  { href: '#walikelas', label: 'Wali Kelas', page: '/' },
  { href: '#anggota', label: 'Anggota', page: '/', fullPage: '/anggota' },
  { href: '#gallery', label: 'Gallery', page: '/' },
  { href: '#prestasi', label: 'Prestasi', page: '/' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = (link: typeof navLinks[0]) => {
    setMobileOpen(false);

    // Jika ada halaman penuh (seperti /anggota) dan kita sedang di halaman itu
    if (link.fullPage && pathname === link.fullPage) {
      // Sudah di halaman tujuan, scroll ke atas
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Jika link punya halaman penuh dan kita bukan di halaman itu
    if (link.fullPage && pathname !== link.fullPage) {
      // Navigasi ke halaman penuh
      window.location.href = link.fullPage;
      return;
    }

    // Untuk link anchor di halaman utama
    if (pathname !== '/') {
      window.location.href = '/' + link.href;
      return;
    }

    const el = document.querySelector(link.href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
          {/* Logo — diperbesar ~18% */}
          <a
            href={pathname === '/' ? '#home' : '/'}
            onClick={(e) => {
              e.preventDefault();
              if (pathname !== '/') {
                window.location.href = '/';
              } else {
                document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="relative z-10 flex items-center gap-3 group"
          >
            <Image
              src="/images/logo.png"
              alt="POFSAIT"
              width={52}
              height={52}
              className="transition-transform duration-300 group-hover:scale-110"
              priority
            />
            <div className="hidden sm:block">
              <span className="text-gradient font-display font-bold text-lg leading-tight block">
                THE POFSAIT
              </span>
              <span className="text-white/40 text-[11px] tracking-[0.2em] uppercase">
                MIPA 2 SMANEKA
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link)}
                className="relative px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-300 group bg-transparent border-0 cursor-pointer"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-6" />
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-10 p-2 text-white/80 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Separator — selalu terlihat */}
        <div className="navbar-separator" />
      </motion.nav>

      {/* Mobile Menu */}
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
                  onClick={() => handleClick(link)}
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