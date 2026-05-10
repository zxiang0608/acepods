import { ARTICLE_SLUGS } from '../src/data/articles.js';

const POD_SLUGS = ['ace-solo', 'ace-plus', 'ace-flex', 'ace-flex-duo', 'ace-meet', 'ace-hub'];

const STATIC_PUBLIC_ROUTES = [
  '/',
  '/portfolio',
  '/articles',
  '/office-pods',
  '/meeting-pods-malaysia',
  '/office-phone-booth-malaysia',
  '/compare-office-pods',
  '/pricing',
  '/contact',
  '/faq',
  '/installation-support',
  '/office-chairs'
];

const NOINDEX_ROUTES = ['/office-chairs'];

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
