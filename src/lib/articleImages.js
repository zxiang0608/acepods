const ARTICLE_IMAGE_ALT_OVERRIDES = {
  'are-office-pods-worth-the-cost-malaysia':
    'Ace office pods arranged in a modern Malaysian workplace for private calls and meetings',
  'office-phone-booth-vs-office-pod':
    'Office phone booth and larger office pod options for different workplace uses',
  'how-long-do-office-pods-last':
    'Ace office pod installed in a commercial workplace for long-term daily use'
};

export const getArticleImageBySlug = (slug) => `/articles/images/${slug}.webp`;

export const getArticleImageAltBySlug = (slug, fallback) =>
  ARTICLE_IMAGE_ALT_OVERRIDES[slug] || fallback;
