import React from 'react';
import { Link } from 'react-router-dom';
import SeoMeta from '../components/SeoMeta';
import PageShell from '../components/PageShell';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Compare Office Pods', path: '/compare-office-pods' }
];

export default function CompareOfficePodsPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Compare Office Pods by Price, Installation and Support | AcePods"
        description="Compare office pods beyond headline price. Review installation, support, warranty coverage, and office-fit considerations before buying."
        canonical={buildCanonical('/compare-office-pods')}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1100px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Compare Office Pods</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#14181c] md:text-[48px]">
          What buyers often overlook when comparing office pods
        </h1>
        <p className="mt-4 max-w-[70ch] text-[18px] leading-[1.6] text-[#454d56]">
          Compare more confidently when pricing, installation, and support are clear upfront.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-[1100px] gap-5 px-5 md:px-8">
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[25px] font-semibold tracking-tight text-[#14181c]">See the full project price upfront</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">
            Headline price alone is not enough. Review the total project scope including delivery, installation, and selected add-ons before comparing options.
          </p>
        </article>
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[25px] font-semibold tracking-tight text-[#14181c]">Installation matters more than most buyers expect</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">
            Access routes, placement constraints, and onsite coordination affect timeline and cost. Installation planning should be part of comparison from the start.
          </p>
        </article>
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[25px] font-semibold tracking-tight text-[#14181c]">Delivery is not the end of the buying experience</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">
            Check what after-sales support and service response are included so the pod remains practical to run after installation.
          </p>
        </article>
      </section>

      <section className="mx-auto mt-6 w-full max-w-[1100px] rounded-[10px] border border-[#ddd8cf] bg-white px-6 py-6 md:px-8">
        <h2 className="text-[24px] font-semibold tracking-tight text-[#14181c]">What to compare before you commit</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[16px] leading-[1.6] text-[#4d555e]">
          <li>Pod fit for calls, focused work, or meetings</li>
          <li>Installation scope, access, and placement constraints</li>
          <li>After-sales support and warranty coverage</li>
          <li>How the pod fits your layout and team flow</li>
        </ul>
      </section>

      <section className="mx-auto mt-10 flex w-full max-w-[1100px] flex-wrap gap-5 px-5 text-[15px] font-semibold text-[#145b5f] md:px-8">
        <Link to="/office-pods" className="underline-offset-4 hover:underline">
          View office pod types
        </Link>
        <Link to="/pricing" className="underline-offset-4 hover:underline">
          View office pod pricing
        </Link>
        <Link to="/installation-support" className="underline-offset-4 hover:underline">
          Learn about installation and support
        </Link>
      </section>
    </PageShell>
  );
}
