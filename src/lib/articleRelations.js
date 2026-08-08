export const getRelatedArticles = (articles, currentSlug, limit = 3) => {
  if (!Array.isArray(articles) || articles.length < 2 || limit < 1) return [];

  const currentIndex = articles.findIndex((article) => article.slug === currentSlug);
  if (currentIndex === -1) return articles.slice(0, limit);

  const related = [];
  const maximum = Math.min(limit, articles.length - 1);
  for (let offset = 1; offset <= maximum; offset += 1) {
    related.push(articles[(currentIndex + offset) % articles.length]);
  }
  return related;
};
