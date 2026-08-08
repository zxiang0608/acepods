import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { SEO_BRAND_EMAIL } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Editorial Policy', path: '/editorial-policy' }
];

const policySchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Ace Office Pods Editorial and Product Information Policy',
  url: buildCanonical('/editorial-policy'),
  description: 'How Ace Office Pods reviews product facts, prices, evidence, article updates, and corrections.',
  dateModified: '2026-08-08',
  isPartOf: { '@id': 'https://aceofficepods.com/#website' },
  publisher: { '@id': 'https://aceofficepods.com/#organization' }
};

const sections = [
  {
    title: 'Who publishes the website',
    body: 'Product pages and articles are published by the Ace Office Pods team at Ace Workplace Solutions. The content is commercial information about Ace products and services, written to help Malaysian buyers compare pod sizes, uses, prices, installation scope, and project considerations.'
  },
  {
    title: 'Product facts and evidence',
    body: 'We use model-specific product records for dimensions, capacity, included features, starting prices, and technical claims. A claim for one model is not treated as evidence for another model. If supporting documentation has not been recorded, the website labels the claim as unverified or avoids presenting it as independently certified.'
  },
  {
    title: 'Prices and quotations',
    body: 'Online prices are starting prices or prices for the scope stated on the relevant page. Final cost can change with quantity, delivery location, installation conditions, restricted access, and optional items. A written project quotation is the controlling commercial reference.'
  },
  {
    title: 'Articles and external sources',
    body: 'Articles combine Ace product information with practical buying guidance. When an article relies on external research, regulations, standards, or third-party technical information, the relevant source should be linked or named. Commercial opinion and model-specific first-party claims should not be presented as independent evidence.'
  },
  {
    title: 'Review and corrections',
    body: 'Pages are updated when product data, prices, evidence status, or service information changes. Material corrections should replace the inaccurate statement rather than leave conflicting versions across the website and AI discovery files.'
  }
];

export default function EditorialPolicyPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Editorial & Product Information Policy | Ace Office Pods"
        description="How Ace Office Pods reviews product facts, pricing scope, evidence, article sources, updates, and corrections."
        canonical={buildCanonical('/editorial-policy')}
        schemas={[organizationSchema, websiteSchema, policySchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[820px] px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-14">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#68726f]">
          <Link to="/" className="hover:text-[#007653]">Home</Link>{' '}
          / <span>Editorial Policy</span>
        </nav>

        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#007653]">Trust and transparency</p>
        <h1 className="mt-3 text-[34px] font-bold leading-[1.1] tracking-tight text-[#172126] md:text-[46px]">
          Editorial and product information policy
        </h1>
        <p className="mt-3 text-[14px] text-[#68726f]">Last reviewed: 8 August 2026</p>
        <p className="mt-6 text-[17px] leading-[1.7] text-[#4f5c59]">
          This policy explains how Ace Office Pods handles product facts, pricing, evidence, articles, and corrections on aceofficepods.com.
        </p>

        <div className="mt-10 space-y-9 text-[16px] leading-[1.75] text-[#172126]">
          {sections.map((section, index) => (
            <section key={section.title}>
              <h2 className="text-[23px] font-semibold tracking-tight">{index + 1}. {section.title}</h2>
              <p className="mt-3">{section.body}</p>
            </section>
          ))}

          <section>
            <h2 className="text-[23px] font-semibold tracking-tight">6. Report an error</h2>
            <p className="mt-3">
              To report an inaccurate price, specification, claim, attribution, or broken source, email{' '}
              <a href={`mailto:${SEO_BRAND_EMAIL}?subject=Website%20correction`} className="text-[#007653] underline underline-offset-4 hover:no-underline">
                {SEO_BRAND_EMAIL}
              </a>{' '}
              with the page URL and the statement to review.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-5 border-t border-[#cfd5d2] pt-7 text-[14px] font-semibold text-[#007653]">
          <Link to="/about" className="underline-offset-4 hover:underline">About Ace Office Pods</Link>
          <Link to="/articles" className="underline-offset-4 hover:underline">Browse articles</Link>
          <Link to="/contact" className="underline-offset-4 hover:underline">Contact us</Link>
        </div>
      </section>
    </PageShell>
  );
}
