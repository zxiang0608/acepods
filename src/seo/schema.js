import {
  SEO_BASE_URL,
  SEO_BRAND_ALTERNATE_NAMES,
  SEO_BRAND_AREA_SERVED,
  SEO_BRAND_EMAIL,
  SEO_BRAND_IDENTIFIER,
  SEO_BRAND_LEGAL,
  SEO_BRAND_LOGO,
  SEO_BRAND_PHONE,
  SEO_BRAND_PRIMARY,
  SEO_BRAND_SAME_AS
} from './constants';

export const buildCanonical = (path) => `${SEO_BASE_URL}${path}`;
export const buildAbsoluteUrl = (value) => {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SEO_BASE_URL}${value.startsWith('/') ? value : `/${value}`}`;
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SEO_BASE_URL}/#organization`,
  name: SEO_BRAND_PRIMARY,
  legalName: SEO_BRAND_LEGAL,
  alternateName: SEO_BRAND_ALTERNATE_NAMES,
  identifier: SEO_BRAND_IDENTIFIER,
  url: SEO_BASE_URL,
  logo: SEO_BRAND_LOGO,
  email: SEO_BRAND_EMAIL,
  telephone: SEO_BRAND_PHONE,
  areaServed: {
    '@type': 'AdministrativeArea',
    name: SEO_BRAND_AREA_SERVED
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SEO_BRAND_PHONE,
    email: SEO_BRAND_EMAIL,
    contactType: 'sales',
    areaServed: 'MY',
    availableLanguage: ['en', 'ms']
  },
  sameAs: SEO_BRAND_SAME_AS,
  description: 'Ace Office Pods (Ace Workplace Solutions) supplies office pods and office booths for calls, focus, and meetings in Malaysia.'
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SEO_BASE_URL}/#website`,
  name: SEO_BRAND_PRIMARY,
  alternateName: SEO_BRAND_ALTERNATE_NAMES,
  url: SEO_BASE_URL,
  publisher: {
    '@id': `${SEO_BASE_URL}/#organization`
  }
};

export const homepageWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Ace Office Pods by Ace Workplace Solutions',
  url: SEO_BASE_URL,
  description:
    'Ace Office Pods (Ace Workplace Solutions), supplier of office pods and office booths for calls, focus, and meetings. 100% locally made in Malaysia.',
  isPartOf: {
    '@id': `${SEO_BASE_URL}/#website`
  },
  about: [
    { '@type': 'Thing', name: 'Ace Office Pods' },
    { '@type': 'Thing', name: 'Ace Workplace Solutions' },
    { '@type': 'Thing', name: 'office pods' },
    { '@type': 'Thing', name: 'office booths' }
  ],
  mentions: [
    { '@type': 'Thing', name: 'acoustic office pods' },
    { '@type': 'Place', name: 'Malaysia' },
    { '@type': 'Place', name: SEO_BRAND_AREA_SERVED }
  ]
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

export const createProductSchema = ({
  path,
  name,
  description,
  image,
  price,
  priceCurrency = 'MYR',
  category = 'Office pods'
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  description,
  ...(image ? { image: [buildAbsoluteUrl(image)] } : {}),
  brand: {
    '@type': 'Brand',
    name: SEO_BRAND_PRIMARY
  },
  category,
  url: buildCanonical(path),
  ...(typeof price === 'number'
    ? {
        offers: {
          '@type': 'Offer',
          url: buildCanonical(path),
          priceCurrency,
          price: String(price)
        }
      }
    : {})
});
