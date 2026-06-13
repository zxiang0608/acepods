import React from 'react';
import { Link } from 'react-router-dom';
import SeoMeta from '../components/SeoMeta';
import PageShell from '../components/PageShell';
import { FAQ_PAGE_ITEMS, SEO_KEYWORDS_COMMON } from '../seo/constants';
import { SEO_BASE_URL } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, createFaqSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'FAQ', path: '/faq' }
];

export default function FaqPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Office Pod FAQ Malaysia — Pricing, Delivery & Installation | Ace Office Pods"
        description="Read direct answers to common office pod buyer questions on pricing, inclusions, installation, and after-sales support."
        canonical={buildCanonical('/faq')}
        keywords={`${SEO_KEYWORDS_COMMON}, office pod FAQ, office booth FAQ`}
        schemas={[
          organizationSchema,
          websiteSchema,
          createBreadcrumbSchema(breadcrumbs),
          createFaqSchema('/faq', FAQ_PAGE_ITEMS),
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${SEO_BASE_URL}/faq#faq-intro`,
            url: buildCanonical('/faq'),
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['#faq-intro']
            }
          }
        ]}
      />

      <section className="mx-auto w-full max-w-[1100px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>FAQ</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#14181c] md:text-[48px]">Office pod FAQ</h1>
        <p id="faq-intro" className="mt-4 max-w-[70ch] text-[18px] leading-[1.6] text-[#454d56]">
          Direct answers for buyers comparing office pods in Malaysia.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-[1100px] gap-4 px-5 md:px-8">
        {FAQ_PAGE_ITEMS.map((item) => (
          <article key={item.question} className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
            <h2 className="text-[24px] font-semibold tracking-tight text-[#1d232a]">{item.question}</h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-5 pb-14 pt-8 md:px-8 md:pb-20">
        <div className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[20px] font-semibold tracking-tight text-[#1d232a]">Related links</h2>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-medium text-[#145b5f]">
            <Link to="/meeting-pods-malaysia" className="underline-offset-4 hover:underline">
              Meeting pods in Malaysia
            </Link>
            <Link to="/office-phone-booth-malaysia" className="underline-offset-4 hover:underline">
              Office phone booth solutions
            </Link>
            <Link to="/office-pods" className="underline-offset-4 hover:underline">
              Office pod models
            </Link>
            <Link to="/pricing" className="underline-offset-4 hover:underline">
              Pricing guide
            </Link>
            <Link to="/installation-support" className="underline-offset-4 hover:underline">
              Installation and delivery
            </Link>
            <Link to="/contact" className="underline-offset-4 hover:underline">
              Contact our team
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
