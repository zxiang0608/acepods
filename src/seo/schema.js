import {
  SEO_BASE_URL,
  SEO_BRAND_ALTERNATE_NAMES,
  SEO_BRAND_AREA_SERVED,
  SEO_BRAND_EMAIL,
  SEO_BRAND_COUNTRY,
  SEO_BRAND_IDENTIFIER,
  SEO_BRAND_LEGAL,
  SEO_BRAND_LOGO,
  SEO_BRAND_PHONE,
  SEO_BRAND_POSTAL_CODE,
  SEO_BRAND_PRIMARY,
  SEO_BRAND_SAME_AS,
  SEO_BRAND_SHOWROOM_LOCALITY,
  SEO_BRAND_SHOWROOM_REGION,
  SEO_BRAND_STREET_ADDRESS,
  SEO_FACTS_REVIEWED_ON
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
  description: `Ace Office Pods (${SEO_BRAND_LEGAL}) supplies office pods and office booths for calls, focus, and meetings in ${SEO_BRAND_AREA_SERVED}.`
};

export const serviceOrganizationSchema = {
  ...organizationSchema,
  '@type': ['Organization', 'ProfessionalService'],
  description: `Ace Office Pods (${SEO_BRAND_LEGAL}) supplies office pods and office booths for calls, focus, and meetings in ${SEO_BRAND_AREA_SERVED}.`
};

export const localBusinessSchema = {
  ...organizationSchema,
  '@type': ['Organization', 'LocalBusiness', 'FurnitureStore', 'ProfessionalService'],
  '@id': `${SEO_BASE_URL}/#organization`,
  name: SEO_BRAND_PRIMARY,
  priceRange: 'RM8,850+',
  image: [
    SEO_BRAND_LOGO,
    `${SEO_BASE_URL}/og-image.jpg`
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: SEO_BRAND_STREET_ADDRESS,
    addressLocality: SEO_BRAND_SHOWROOM_LOCALITY,
    addressRegion: SEO_BRAND_SHOWROOM_REGION,
    postalCode: SEO_BRAND_POSTAL_CODE,
    addressCountry: SEO_BRAND_COUNTRY
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 3.07523,
    longitude: 101.44187
  },
  hasMap: 'https://maps.app.goo.gl/nJHHvTLD5YEov9e4A',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    }
  ],
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Klang Valley' },
    { '@type': 'AdministrativeArea', name: 'Petaling Jaya' },
    { '@type': 'AdministrativeArea', name: 'Damansara' },
    { '@type': 'AdministrativeArea', name: 'Kuala Lumpur' },
    { '@type': 'AdministrativeArea', name: SEO_BRAND_AREA_SERVED },
    { '@type': 'Country', name: 'Malaysia' }
  ],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office pod showroom viewing by appointment' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office pod delivery and installation in Klang Valley and West Malaysia' } }
  ]
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
    'Ace Office Pods (Ace Workplace Solutions), supplier of office pods and office booths for calls, focus, and meetings in Malaysia.',
  dateModified: SEO_FACTS_REVIEWED_ON,
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

export const createPricingItemListSchema = (path, items) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Office Pod Pricing in Malaysia',
  url: buildCanonical(path),
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: item.name,
      brand: {
        '@type': 'Brand',
        name: SEO_BRAND_PRIMARY
      },
      category: 'Office pods',
      url: buildCanonical(item.path),
      offers: {
        '@type': 'Offer',
        priceCurrency: item.priceCurrency || 'MYR',
        price: String(item.price),
        url: buildCanonical(item.path),
        seller: {
          '@id': `${SEO_BASE_URL}/#organization`
        }
      }
    }
  }))
});

export const createProductSchema = ({
  path,
  name,
  description,
  image,
  price,
  priceCurrency = 'MYR',
  category = 'Office pods',
  additionalProperties = []
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
  ...(additionalProperties.length
      ? {
          additionalProperty: additionalProperties
            .filter((property) => property?.name && property?.value)
            .map((property) => ({
              '@type': 'PropertyValue',
              name: property.name,
              value: property.value
            }))
        }
      : {}),
  ...(typeof price === 'number'
      ? {
          offers: {
            '@type': 'Offer',
            url: buildCanonical(path),
            priceCurrency,
            price: String(price),
            seller: {
              '@id': `${SEO_BASE_URL}/#organization`
            }
          }
        }
      : {})
});
