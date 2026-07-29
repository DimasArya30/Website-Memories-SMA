'use client';

import Image from 'next/image';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-100/50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto section-padding py-16">
        <div className="flex flex-col items-center text-center">
          {/* Logo — diperbesar */}
          <Image
            src="/images/logo.png"
            alt="POFSAIT"
            width={88}
            height={88}
            className="mb-6 opacity-80"
          />

          <h3 className="text-gradient font-display font-bold text-2xl mb-1">
            THE POFSAIT
          </h3>
          <p className="text-white/40 text-sm tracking-[0.25em] uppercase mb-8">
            MIPA 2 SMANEKA
          </p>

          <div className="flex items-center gap-4 mb-10">
            <a
              href="https://www.instagram.com/the.pofsait?igsh=MW53cmMyYnU5Z2E0MA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.tiktok.com/@the.pofsait"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              aria-label="TikTok"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z" />
              </svg>
            </a>
          </div>

          <p className="text-white/30 text-sm">
            Made with <span className="text-red-400">&#10084;</span> by POFSAIT
          </p>
          <p className="text-white/20 text-xs mt-2">
            &copy; {new Date().getFullYear()} THE POFSAIT — MIPA 2 SMANEKA. All memories reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}