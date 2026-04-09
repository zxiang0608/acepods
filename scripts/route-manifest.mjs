const POD_SLUGS = ['ace-solo', 'ace-solo-plus', 'ace-duo', 'ace-meeting', 'ace-meeting-xl'];

const STATIC_PUBLIC_ROUTES = [
  '/',
  '/office-pods',
  '/compare-office-pods',
  '/pricing',
  '/faq',
  '/installation-support',
  '/office-chairs'
];

const NOINDEX_ROUTES = ['/office-chairs'];

export const getRouteManifest = async () => {
  const podRoutes = POD_SLUGS.map((slug) => `/pods/${slug}`);
  const PUBLIC_ROUTES = [...STATIC_PUBLIC_ROUTES, ...podRoutes];
  const INDEXABLE_ROUTES = PUBLIC_ROUTES.filter((route) => !NOINDEX_ROUTES.includes(route));

  return {
    PUBLIC_ROUTES,
    INDEXABLE_ROUTES,
    NOINDEX_ROUTES
  };
};
