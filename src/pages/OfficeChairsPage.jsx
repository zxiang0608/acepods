import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Office Chairs', path: '/office-chairs' }
];

export default function OfficeChairsPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Office Chairs | Ace Office Pods"
        description="Office chair collection from Ace Office Pods is coming soon. Contact our team for updates and early project support."
        canonical={buildCanonical('/office-chairs')}
        robots="noindex, follow"
        keywords={`${SEO_KEYWORDS_COMMON}, office chairs`}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-20 pt-12 md:px-8 md:pt-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Office Chairs</span>
        </nav>

        <h1 className="text-[36px] font-bold tracking-tight text-[#14181c] md:text-[54px]">Office Chairs</h1>
        <p className="mt-4 text-[18px] font-medium text-[#4d555e]">Coming soon.</p>
        <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.6] text-[#4d555e]">
          We are preparing the office chairs collection. If you need recommendations now, contact us and we can share suitable options for your project.
        </p>
        <Link
          to="/installation-support#book-viewing"
          className="mt-7 inline-flex rounded-[8px] bg-[#145b5f] px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#104c4f]"
        >
          Contact us
        </Link>
      </section>
    </PageShell>
  );
}
