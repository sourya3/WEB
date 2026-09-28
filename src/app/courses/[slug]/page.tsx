import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCourseBySlug, ALL_COURSES } from '../data/coursesData';
import CoursePage from '../components/CoursePage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: 'Course Not Found | Uniq Turn' };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const courseUrl = `${baseUrl}/courses/${course.slug}`;

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.seo.description,
    url: courseUrl,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Uniq Turn Education & Skills Hub',
      url: baseUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'CTC Mall, Sundhara',
        addressLocality: 'Kathmandu',
        addressRegion: 'Bagmati',
        addressCountry: 'NP',
      },
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: course.format.toLowerCase().includes('hybrid') ? 'blended' : 'onsite',
      courseWorkload: course.duration,
      location: {
        '@type': 'Place',
        name: 'Uniq Turn Education & Skills Hub',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'CTC Mall, Sundhara',
          addressLocality: 'Kathmandu',
          addressCountry: 'NP',
        },
      },
    },
    teaches: course.outcomes.map((o) => o.text),
    educationalLevel: 'Beginner to Intermediate',
    inLanguage: 'en',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `https://wa.me/9779746585111?text=${course.whatsappMessage}`,
    },
  };

  return {
    title: course.seo.title,
    description: course.seo.description,
    keywords: course.seo.keywords,
    alternates: { canonical: courseUrl },
    openGraph: {
      title: course.seo.title,
      description: course.seo.description,
      type: 'website',
      url: courseUrl,
      siteName: 'Uniq Turn Education & Skills Hub',
      images: [
        {
          url: '/assets/images/og-image.png',
          width: 1200,
          height: 630,
          alt: `${course.name} at Uniq Turn Kathmandu`,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: course.seo.title,
      description: course.seo.description,
      images: ['/assets/images/og-image.png'],
    },
    other: {
      'script:ld+json': JSON.stringify(courseSchema),
    },
  };
}

export default async function CoursePageRoute({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  return <CoursePage course={course} />;
}
