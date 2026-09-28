import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import '../styles/tailwind.css';
import AnimatedBackground from './components/AnimatedBackground';
import WaterRipple from './components/WaterRipple';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
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
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Uniq Turn Education & Skills Hub',
    alternateName: 'Uniq Turn',
    description: 'Leading education and skills training academy in Kathmandu, Nepal. Offering AI, video editing, digital marketing, language classes, IELTS/PTE preparation, and visa guidance.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/images/app_logo.png`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/assets/images/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'CTC Mall, Sundhara',
      addressLocality: 'Kathmandu',
      addressRegion: 'Bagmati',
      postalCode: '44600',
      addressCountry: 'NP',
    },
    telephone: '+977 9746585111',
    email: 'uniqturn.np@gmail.com',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '27.7172',
      longitude: '85.3240',
    },
    areaServed: {
      '@type': 'City',
      name: 'Kathmandu',
      '@id': 'https://en.wikipedia.org/wiki/Kathmandu',
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1000',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/uniqturn',
      'https://www.instagram.com/uniqturn',
      'https://www.tiktok.com/@uniqturn',
    ],
    offers: [
      {
        '@type': 'Course',
        name: 'AI Tools & Automation',
        description: 'Learn AI tools and automation techniques for modern workflows.',
        provider: {
          '@type': 'Organization',
          name: 'Uniq Turn Education & Skills Hub',
        },
      },
      {
        '@type': 'Course',
        name: 'Video Editing & CapCut Mastery',
        description: 'Professional video editing and CapCut techniques for content creators.',
        provider: {
          '@type': 'Organization',
          name: 'Uniq Turn Education & Skills Hub',
        },
      },
      {
        '@type': 'Course',
        name: 'Digital Marketing',
        description: 'Comprehensive digital marketing strategies and tools.',
        provider: {
          '@type': 'Organization',
          name: 'Uniq Turn Education & Skills Hub',
        },
      },
      {
        '@type': 'Course',
        name: 'English Language Classes',
        description: 'Professional English language training for all levels.',
        provider: {
          '@type': 'Organization',
          name: 'Uniq Turn Education & Skills Hub',
        },
      },
      {
        '@type': 'Course',
        name: 'Korean Language Classes',
        description: 'Korean language training from beginner to advanced levels.',
        provider: {
          '@type': 'Organization',
          name: 'Uniq Turn Education & Skills Hub',
        },
      },
      {
        '@type': 'Course',
        name: 'Japanese Language Classes',
        description: 'Japanese language training for career and personal development.',
        provider: {
          '@type': 'Organization',
          name: 'Uniq Turn Education & Skills Hub',
        },
      },
      {
        '@type': 'Course',
        name: 'IELTS Preparation',
        description: 'Comprehensive IELTS exam preparation and coaching.',
        provider: {
          '@type': 'Organization',
          name: 'Uniq Turn Education & Skills Hub',
        },
      },
      {
        '@type': 'Course',
        name: 'PTE Preparation',
        description: 'Professional PTE exam preparation and guidance.',
        provider: {
          '@type': 'Organization',
          name: 'Uniq Turn Education & Skills Hub',
        },
      },
      {
        '@type': 'Course',
        name: 'Visa Guidance & Counseling',
        description: 'Expert visa guidance and application support for international opportunities.',
        provider: {
          '@type': 'Organization',
          name: 'Uniq Turn Education & Skills Hub',
        },
      },
      {
        '@type': 'Course',
        name: 'Camera Mastery',
        description: 'Professional camera techniques and photography fundamentals.',
        provider: {
          '@type': 'Organization',
          name: 'Uniq Turn Education & Skills Hub',
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Funiqturn3589back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.3" /></head>
      <body className={plusJakarta.className}>
        <AnimatedBackground />
        <WaterRipple />
        {children}
</body>
    </html>
  );
}