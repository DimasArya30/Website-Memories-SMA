'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import MouseGlow from '@/components/MouseGlow';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import MediaSection from '@/sections/MediaSection';
import WalikelasSection from '@/sections/WalikelasSection';
import AnggotaSection from '@/sections/AnggotaSection';

// Dynamic imports untuk performa — tidak dimuat saat first paint
const FloatingParticles = dynamic(
  () => import('@/components/FloatingParticles'),
  { ssr: false }
);
const GallerySection = dynamic(
  () => import('@/sections/GallerySection'),
  { ssr: false }
);
const PrestasiSection = dynamic(
  () => import('@/sections/PrestasiSection'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <SmoothScrollProvider>
        <ScrollProgress />
        <MouseGlow />
        <FloatingParticles />
        <Navbar />
        <main className="relative z-[2]">
          <HeroSection />
          <AboutSection />
          <MediaSection />
          <WalikelasSection />
          <AnggotaSection />
          <GallerySection />
          <PrestasiSection />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </>
  );
}