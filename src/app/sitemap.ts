import { MetadataRoute } from 'next';

const COURSE_SLUGS = [
  'ai-course',
  'video-editing',
  'camera-mastery',
  'digital-marketing',
  'capcut-editing',
  'english-language',
  'korean-language',
  'japanese-language',
  'ielts-pte-prep',
  'visa-guidance',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const coursePages: MetadataRoute.Sitemap = COURSE_SLUGS.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...coursePages,
  ];
}