import React from 'react';
import { Link } from 'react-router-dom';
import SeoMeta from '../components/SeoMeta';
import SeoPageShell from '../components/SeoPageShell';
import { HOME_FAQ_ITEMS } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, createFaqSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/seo' },
  { name: 'FAQ', path: '/seo/faq' }
];

export default function SeoFaqPage() {
  return (
    <SeoPageShell>
      <SeoMeta
        title="Office Pod FAQ | AcePods"
        description="Read direct answers to common office pod buyer questions on pricing, inclusions, installation, and after-sales support."
        canonical={buildCanonical('/seo/faq')}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs), createFaqSchema('/seo/faq', HOME_FAQ_ITEMS)]}
      />

      <section className="mx-auto w-full max-w-[1100px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/seo" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>FAQ</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#14181c] md:text-[48px]">Office pod FAQ</h1>
        <p className="mt-4 max-w-[70ch] text-[18px] leading-[1.6] text-[#454d56]">
          Direct answers for buyers comparing office pods in Malaysia.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-[1100px] gap-4 px-5 md:px-8">
        {HOME_FAQ_ITEMS.map((item) => (
          <article key={item.question} className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
            <h2 className="text-[24px] font-semibold tracking-tight text-[#1d232a]">{item.question}</h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">{item.answer}</p>
          </article>
        ))}
      </section>
    </SeoPageShell>
  );
}
