import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import CoursesSection from './components/CoursesSection';
import WhyUsSection from './components/WhyUsSection';
import OutcomesSection from './components/OutcomesSection';
import AskUsSection from './components/AskUsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FinalCTASection from './components/FinalCTASection';
import WhatsAppFAB from './components/WhatsAppFAB';

export const metadata: Metadata = {
  title: 'Uniq Turn | AI, Video Editing, Language & IELTS Classes in Kathmandu',
  description: 'Learn AI Tools, Video Editing, Camera Mastery, Digital Marketing & more at Uniq Turn — Kathmandu\'s leading skills academy. English, Korean, Japanese classes, IELTS/PTE prep & visa guidance. 1000+ students trained. Enroll today.',
  keywords: 'AI course Kathmandu, video editing classes Nepal, IELTS PTE preparation Kathmandu, Korean language class Kathmandu, Japanese language class Kathmandu, digital marketing course Nepal, visa guidance Kathmandu, CapCut editing course, skills training Sundhara',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  openGraph: {
    title: 'Uniq Turn | AI, Video Editing & Language Classes in Kathmandu',
    description: 'Learn practical skills at Kathmandu\'s leading education hub. AI, video editing, digital marketing, IELTS/PTE prep, language classes & visa guidance. 1000+ students trained.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Uniq Turn Education & Skills Hub',
    images: [
      {
        url: '/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uniq Turn Education & Skills Hub - Learn Skills That Get You Hired',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uniq Turn | AI, Video Editing & Language Classes in Kathmandu',
    description: 'Learn practical skills at Kathmandu\'s leading education hub. AI, video editing, digital marketing, IELTS/PTE prep, language classes & visa guidance.',
    images: ['/assets/images/og-image.png'],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen text-foreground overflow-x-hidden relative" style={{ zIndex: 1 }}>
      <Header />
      <HeroSection />
      <CoursesSection />
      <WhyUsSection />
      <OutcomesSection />
      <AskUsSection />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
      <WhatsAppFAB />
    </main>
  );
}