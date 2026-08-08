import { ARTICLE_SLUGS } from '../src/data/articles.js';

const POD_SLUGS = ['ace-uno', 'ace-plus', 'ace-flex', 'ace-flex-duo', 'ace-meet', 'ace-hub'];

const STATIC_PUBLIC_ROUTES = [
  '/',
  '/portfolio',
  '/articles',
  '/office-pods',
  '/office-pods-near-me',
  '/meeting-pods-malaysia',
  '/office-phone-booth-malaysia',
  '/compare-office-pods',
  '/pricing',
  '/contact',
  '/about',
  '/editorial-policy',
  '/faq',
  '/installation-support',
  '/pod-relocation',
  '/locations',
  '/locations/kuala-lumpur',
  '/locations/shah-alam',
  '/locations/subang-jaya',
  '/locations/penang',
  '/locations/johor-bahru',
  '/office-chairs',
  '/privacy',
  '/terms'
];

const NOINDEX_ROUTES = ['/office-chairs', '/privacy', '/terms'];

export const getRouteManifest = async () => {
  const podRoutes = POD_SLUGS.map((slug) => `/pods/${slug}`);
  const articleRoutes = ARTICLE_SLUGS.map((slug) => `/articles/${slug}`);
  const PUBLIC_ROUTES = [...STATIC_PUBLIC_ROUTES, ...podRoutes, ...articleRoutes];
  const INDEXABLE_ROUTES = PUBLIC_ROUTES.filter((route) => !NOINDEX_ROUTES.includes(route));

  return {
    PUBLIC_ROUTES,
    INDEXABLE_ROUTES,
    NOINDEX_ROUTES
  };
};
