import React from 'react';
import { Link } from 'react-router-dom';
import SeoMeta from '../components/SeoMeta';
import PageShell from '../components/PageShell';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const COMPARISON_ROWS = [
  { model: 'Ace Solo',     path: '/pods/ace-solo',     capacity: '1 pax',        dimensions: '1200 × 1000 mm', from: 'RM12,500', bestFor: 'Calls, quick focus' },
  { model: 'Ace Plus',     path: '/pods/ace-plus',     capacity: '1 pax',        dimensions: '1000 × 1000 mm', from: 'RM14,500', bestFor: 'Extended daily use, 27 dBA' },
  { model: 'Ace Flex',     path: '/pods/ace-flex',     capacity: '1 pax',        dimensions: '1600 × 1200 mm', from: 'RM19,900', bestFor: 'Spacious solo work' },
  { model: 'Ace Flex Duo', path: '/pods/ace-flex-duo', capacity: '2 pax',        dimensions: '1600 × 1200 mm', from: 'RM23,900', bestFor: 'One-to-one discussions' },
  { model: 'Ace Meet',     path: '/pods/ace-meet',     capacity: '2–4 pax',      dimensions: '2200 × 1200 mm', from: 'RM22,200', bestFor: 'Small team meetings' },
  { model: 'Ace Hub',      path: '/pods/ace-hub',      capacity: 'Up to 6 pax',  dimensions: '2200 × 1500 mm', from: 'RM27,800', bestFor: 'Larger group collaboration' }
];

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Compare Office Pods', path: '/compare-office-pods' }
];

export default function CompareOfficePodsPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Compare Office Pods by Price, Installation and Support | Ace Office Pods"
        description="Compare office pods beyond headline price. Review installation, support, warranty coverage, and office-fit considerations before buying."
        canonical={buildCanonical('/compare-office-pods')}
        keywords={`${SEO_KEYWORDS_COMMON}, compare office pods, office booth comparison`}
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

      <section className="mx-auto w-full max-w-[1100px] px-5 md:px-8">
        <h2 className="text-[22px] font-semibold tracking-tight text-[#14181c]">Office pod model comparison</h2>
        <div className="mt-4 overflow-x-auto rounded-[10px] border border-[#ddd8cf]">
          <table className="w-full min-w-[560px] border-collapse bg-white text-[14px]">
            <thead>
              <tr className="border-b border-[#ddd8cf] bg-[#f8f6f2]">
                <th className="px-4 py-3 text-left font-semibold text-[#14181c]">Model</th>
                <th className="px-4 py-3 text-left font-semibold text-[#14181c]">Capacity</th>
                <th className="px-4 py-3 text-left font-semibold text-[#14181c]">W × D</th>
                <th className="px-4 py-3 text-left font-semibold text-[#14181c]">From</th>
                <th className="px-4 py-3 text-left font-semibold text-[#14181c]">Best for</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.model} className={`border-b border-[#f0ece5] ${i % 2 === 0 ? '' : 'bg-[#fdfcfa]'}`}>
                  <td className="px-4 py-3 font-semibold text-[#145b5f]">
                    <Link to={row.path} className="hover:underline underline-offset-4">{row.model}</Link>
                  </td>
                  <td className="px-4 py-3 text-[#30363d]">{row.capacity}</td>
                  <td className="px-4 py-3 text-[#30363d]">{row.dimensions}</td>
                  <td className="px-4 py-3 font-semibold text-[#30363d]">{row.from}</td>
                  <td className="px-4 py-3 text-[#4d555e]">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[13px] text-[#6a7683]">All prices are starting prices. Final cost depends on delivery location, installation scope, and selected options.</p>
      </section>

      <section className="mx-auto mt-6 grid w-full max-w-[1100px] gap-5 px-5 md:px-8">
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
        <Link to="/meeting-pods-malaysia" className="underline-offset-4 hover:underline">
          Compare meeting pods
        </Link>
        <Link to="/office-phone-booth-malaysia" className="underline-offset-4 hover:underline">
          Compare phone booth pods
        </Link>
        <Link to="/office-pods" className="underline-offset-4 hover:underline">
          View office pod types
        </Link>
        <Link to="/pricing" className="underline-offset-4 hover:underline">
          View office pod pricing
        </Link>
        <Link to="/installation-support" className="underline-offset-4 hover:underline">
          Learn about installation and support
        </Link>
        <Link to="/contact" className="underline-offset-4 hover:underline">
          Ask for a recommendation
        </Link>
      </section>
    </PageShell>
  );
}
