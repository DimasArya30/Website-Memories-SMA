'use client';

import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import MouseGlow from '@/components/MouseGlow';
import FloatingParticles from '@/components/FloatingParticles';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import MediaSection from '@/sections/MediaSection';
import WalikelasSection from '@/sections/WalikelasSection';
import AnggotaSection from '@/sections/AnggotaSection';
import GallerySection from '@/sections/GallerySection';
import PrestasiSection from '@/sections/PrestasiSection';

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