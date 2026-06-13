import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { ARTICLES } from '../data/articles';
import { getArticleImageBySlug } from '../lib/articleImages';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Articles', path: '/articles' }
];

export default function ArticlesPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Office Pod Articles and Guides | Ace Office Pods"
        description="Browse practical articles on office pods, office booths, phone booths, and meeting pod planning for modern workplaces in Malaysia."
        canonical={buildCanonical('/articles')}
        keywords={`${SEO_KEYWORDS_COMMON}, office pod articles, office booth guide`}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Articles</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#14181c] md:text-[48px]">Office pod articles and planning guides</h1>
        <p className="mt-4 max-w-[72ch] text-[18px] leading-[1.6] text-[#454d56]">
          Explore practical guidance on office pods and office booths, including use-case planning, sizing, and workspace fit.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-[1200px] gap-5 px-5 pb-16 md:grid-cols-2 md:px-8 md:pb-20">
        {ARTICLES.map((article) => (
          <article key={article.slug} className="overflow-hidden rounded-[10px] border border-[#ddd8cf] bg-white">
            <img
              src={getArticleImageBySlug(article.slug)}
              alt={article.title}
              width="1200"
              height="675"
              className="h-[220px] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#66707a]">
                {article.category} · {article.date}
              </p>
              <h2 className="mt-3 text-[25px] font-semibold tracking-tight text-[#1d232a]">{article.title}</h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-[#4d555e]">{article.excerpt}</p>
              <Link to={`/articles/${article.slug}`} className="mt-4 inline-flex text-[15px] font-semibold text-[#145b5f] underline-offset-4 hover:underline">
                Read article
              </Link>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
