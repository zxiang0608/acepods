import { SEO_BASE_URL } from './constants';

export const buildCanonical = (path) => `${SEO_BASE_URL}${path}`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AcePods',
  url: SEO_BASE_URL,
  description: 'Acoustic office pods for calls, focus, and meetings.'
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AcePods',
  url: SEO_BASE_URL
};

export const createFaqSchema = (path, items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  })),
  url: buildCanonical(path)
});

export const createBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: buildCanonical(item.path)
  }))
});
