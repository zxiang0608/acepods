import { SEO_BASE_URL, SEO_BRAND_ALTERNATE_NAMES, SEO_BRAND_LEGAL, SEO_BRAND_PRIMARY, SEO_BRAND_SAME_AS } from './constants';

export const buildCanonical = (path) => `${SEO_BASE_URL}${path}`;
export const buildAbsoluteUrl = (value) => {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SEO_BASE_URL}${value.startsWith('/') ? value : `/${value}`}`;
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SEO_BRAND_PRIMARY,
  legalName: SEO_BRAND_LEGAL,
  alternateName: SEO_BRAND_ALTERNATE_NAMES,
  identifier: '202403171118',
  url: SEO_BASE_URL,
  sameAs: SEO_BRAND_SAME_AS,
  description: 'Silent acoustic office pods for calls, focus, and meetings.'
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SEO_BRAND_PRIMARY,
  alternateName: SEO_BRAND_ALTERNATE_NAMES,
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

export const createProductSchema = ({
  path,
  name,
  description,
  image,
  price,
  priceCurrency = 'MYR',
  availability = 'https://schema.org/InStock',
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
          price: String(price),
          availability
        }
      }
    : {})
});
