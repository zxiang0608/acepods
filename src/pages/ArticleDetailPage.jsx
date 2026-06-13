import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { ARTICLES, findArticleBySlug } from '../data/articles';
import { getArticleImageBySlug } from '../lib/articleImages';
import { buildAbsoluteUrl, buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';

const renderInlineContent = (text) => {
  const tokens = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;
  let tokenKey = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(<React.Fragment key={`text-${tokenKey}`}>{text.slice(lastIndex, match.index)}</React.Fragment>);
      tokenKey += 1;
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      tokens.push(<strong key={`bold-${tokenKey}`}>{token.slice(2, -2)}</strong>);
      tokenKey += 1;
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, url] = linkMatch;
        if (url.startsWith('/')) {
          tokens.push(
            <Link key={`link-${tokenKey}`} to={url} className="text-[#145b5f] underline underline-offset-4 hover:no-underline">
              {label}
            </Link>
          );
        } else {
          tokens.push(
            <a key={`link-${tokenKey}`} href={url} className="text-[#145b5f] underline underline-offset-4 hover:no-underline">
              {label}
            </a>
          );
        }
        tokenKey += 1;
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(<React.Fragment key={`tail-${tokenKey}`}>{text.slice(lastIndex)}</React.Fragment>);
  }

  return tokens;
};

const renderArticleContent = (content) => {
  const elements = [];
  let index = 0;

  while (index < content.length) {
    const line = content[index];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${index}`} className="pt-2 text-[28px] font-semibold tracking-tight text-[#14181c]">
          {line.slice(3)}
        </h2>
      );
      index += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${index}`} className="pt-1 text-[22px] font-semibold tracking-tight text-[#1d232a]">
          {line.slice(4)}
        </h3>
      );
      index += 1;
      continue;
    }

    if (line.startsWith('- ')) {
      const items = [];
      while (index < content.length && content[index].startsWith('- ')) {
        items.push(content[index].slice(2));
        index += 1;
      }
      elements.push(
        <ul key={`ul-${index}`} className="list-disc space-y-1 pl-6 text-[17px] leading-[1.7] text-[#30363d]">
          {items.map((item, itemIndex) => (
            <li key={`li-${itemIndex}`}>{renderInlineContent(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    const isTableHeader = line.startsWith('|') && line.endsWith('|');
    const isSeparator = index + 1 < content.length && /^\|[-\s|:]+\|$/.test(content[index + 1]);
    if (isTableHeader && isSeparator) {
      const headerCells = line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim());
      index += 2;
      const rows = [];
      while (index < content.length && content[index].startsWith('|') && content[index].endsWith('|')) {
        rows.push(
          content[index]
            .split('|')
            .slice(1, -1)
            .map((cell) => cell.trim())
        );
        index += 1;
      }

      elements.push(
        <div key={`table-${index}`} className="overflow-x-auto rounded-[10px] border border-[#ddd8cf] bg-white">
          <table className="min-w-full border-collapse text-left text-[15px] leading-[1.55] text-[#30363d]">
            <thead>
              <tr className="border-b border-[#e7e2d9] bg-[#f7f5f0]">
                {headerCells.map((cell, cellIndex) => (
                  <th key={`th-${cellIndex}`} className="px-4 py-3 font-semibold text-[#1d232a]">
                    {renderInlineContent(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`tr-${rowIndex}`} className="border-b border-[#efebe3] last:border-b-0">
                  {row.map((cell, cellIndex) => (
                    <td key={`td-${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top">
                      {renderInlineContent(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    elements.push(
      <p key={`p-${index}`} className="text-[17px] leading-[1.7] text-[#30363d]">
        {renderInlineContent(line)}
      </p>
    );
    index += 1;
  }

  return elements;
};

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const article = findArticleBySlug(slug || '');

  if (!article) {
    return (
      <PageShell>
        <section className="mx-auto w-full max-w-[1200px] px-5 pb-16 pt-14 md:px-8 md:pb-20">
          <h1 className="text-[34px] font-bold tracking-tight text-[#14181c] md:text-[48px]">Article not found</h1>
          <Link to="/articles" className="mt-4 inline-flex text-[16px] font-semibold text-[#145b5f] underline-offset-4 hover:underline">
            Back to articles
          </Link>
        </section>
      </PageShell>
    );
  }

  const canonicalPath = `/articles/${article.slug}`;
  const articleImage = getArticleImageBySlug(article.slug);
  const relatedArticles = ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/articles' },
    { name: article.title, path: canonicalPath }
  ];

  return (
    <PageShell>
      <SeoMeta
        title={article.seoTitle || `${article.title} | Ace Office Pods`}
        description={article.seoDescription || article.excerpt}
        canonical={buildCanonical(canonicalPath)}
        ogImage={buildAbsoluteUrl(articleImage)}
        keywords={`${SEO_KEYWORDS_COMMON}, office pod article`}
        schemas={[
          organizationSchema,
          websiteSchema,
          createBreadcrumbSchema(breadcrumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.seoDescription || article.excerpt,
            image: buildAbsoluteUrl(articleImage),
            datePublished: article.date,
            url: buildCanonical(canonicalPath),
            publisher: {
              '@type': 'Organization',
              name: 'Ace Office Pods',
              url: buildCanonical('/')
            },
            ...(article.author
              ? {
                  author: {
                    '@type': 'Organization',
                    name: article.author.name,
                    url: buildCanonical('/')
                  }
                }
              : {})
          }
        ]}
      />

      <section className="mx-auto w-full max-w-[1000px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          /{' '}
          <Link to="/articles" className="hover:text-[#145b5f]">
            Articles
          </Link>{' '}
          / <span>{article.title}</span>
        </nav>

        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#66707a]">
          {article.category} · {article.date}
        </p>
        <h1 className="mt-3 text-[34px] font-bold leading-[1.1] tracking-tight text-[#14181c] md:text-[48px]">{article.title}</h1>
        {article.author && (
          <p className="mt-3 text-[14px] text-[#65707a]">
            By <span className="font-semibold text-[#2e3338]">{article.author.name}</span>
            {article.author.role ? <span> · {article.author.role}</span> : null}
          </p>
        )}
        <p id={`article-${article.slug}-answer`} className="mt-4 text-[18px] leading-[1.6] text-[#4d555e]">{article.excerpt}</p>
      </section>

      <section className="mx-auto w-full max-w-[1000px] px-5 md:px-8">
        <img
          src={articleImage}
          alt={article.title}
          width="1200"
          height="675"
          className="h-[360px] w-full rounded-[10px] object-cover md:h-[420px]"
          fetchPriority="high"
        />
      </section>

      <section className="mx-auto w-full max-w-[1000px] px-5 pb-8 pt-8 md:px-8">
        <div className="space-y-4">{renderArticleContent(article.content)}</div>
      </section>

      <section className="mx-auto w-full max-w-[1000px] px-5 pb-8 md:px-8">
        <div className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[24px] font-semibold tracking-tight text-[#14181c]">Continue your shortlist</h2>
          <div className="mt-4 flex flex-wrap gap-5 text-[15px] font-semibold text-[#145b5f]">
            <Link to="/office-pods" className="underline-offset-4 hover:underline">
              View office pod models
            </Link>
            <Link to="/pricing" className="underline-offset-4 hover:underline">
              View office pod pricing
            </Link>
            <Link to="/contact" className="underline-offset-4 hover:underline">
              Contact our team
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1000px] px-5 pb-16 md:px-8 md:pb-20">
        <h2 className="text-[24px] font-semibold tracking-tight text-[#14181c]">Related articles</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {relatedArticles.map((item) => (
            <article key={item.slug} className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
              <h3 className="text-[20px] font-semibold tracking-tight text-[#1d232a]">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-[#4d555e]">{item.excerpt}</p>
              <Link to={`/articles/${item.slug}`} className="mt-3 inline-flex text-[14px] font-semibold text-[#145b5f] underline-offset-4 hover:underline">
                Read article
              </Link>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
