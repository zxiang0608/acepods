import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Open Pods', path: '/open-pods' }
];

export default function OpenPodsPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Open Pods Coming Soon | Ace Office Pods"
        description="The Ace Open Pods collection is coming soon. Explore our current office pod range or contact Ace Workplace Solutions for help with your workspace."
        canonical={buildCanonical('/open-pods')}
        keywords={`${SEO_KEYWORDS_COMMON}, open pods Malaysia`}
        robots="noindex, follow"
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto flex min-h-[calc(100vh-260px)] w-full max-w-[1200px] items-center px-5 py-20 md:px-8 md:py-28">
        <div className="w-full max-w-[720px]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#007653]">Open Pods</p>
          <h1 className="mt-5 max-w-[14ch] text-[44px] font-bold leading-[1.05] tracking-tight text-[#172126] md:text-[68px]">
            Coming soon.
          </h1>
          <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.65] text-[#59635f]">
            We are preparing the Ace Open Pods collection. Check back soon, or explore our current office pod range while this page is being completed.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/office-pods"
              className="inline-flex rounded-[5px] bg-[#00855a] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#006e4a]"
            >
              View office pods
            </Link>
            <Link
              to="/contact"
              className="inline-flex rounded-[5px] border border-[#aeb8b2] px-6 py-3.5 text-[15px] font-semibold text-[#172126] transition-colors hover:border-[#007653] hover:text-[#007653]"
            >
              Contact Ace
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
