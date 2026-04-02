import React from 'react';
import { Link } from 'react-router-dom';
import SeoMeta from '../components/SeoMeta';
import SeoPageShell from '../components/SeoPageShell';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/seo' },
  { name: 'Installation and Support', path: '/seo/installation-support' }
];

export default function SeoInstallationSupportPage() {
  return (
    <SeoPageShell>
      <SeoMeta
        title="Office Pod Installation and Support | AcePods"
        description="Understand delivery, installation, and after-sales support for office pods so your project is clear from quote to ongoing use."
        canonical={buildCanonical('/seo/installation-support')}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1100px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/seo" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Installation and Support</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#14181c] md:text-[48px]">Installation and support for office pods</h1>
        <p className="mt-4 max-w-[70ch] text-[18px] leading-[1.6] text-[#454d56]">
          From delivery planning to after-sales service, we keep each step clear so buyers know what to expect before and after installation.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-[1100px] gap-4 px-5 md:grid-cols-2 md:px-8">
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[24px] font-semibold tracking-tight text-[#1d232a]">How does installation work?</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">
            Installation starts with site review, access checks, and placement planning. Final setup is coordinated so the pod is installed with minimal disruption.
          </p>
        </article>
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[24px] font-semibold tracking-tight text-[#1d232a]">What support is provided after delivery?</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">
            After-sales support covers help after handover, including warranty-related service and practical guidance for ongoing daily use.
          </p>
        </article>
      </section>

      <section id="book-viewing" className="mx-auto mt-8 w-full max-w-[1100px] rounded-[10px] border border-[#ddd8cf] bg-white px-5 py-8 md:px-8">
        <h2 className="text-[26px] font-semibold tracking-tight text-[#14181c]">Book viewing and project guidance</h2>
        <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">
          Share your office requirements and pod goals with our team. We can guide model selection, installation planning, and project scope before quotation.
        </p>
        <a href="#" className="mt-5 inline-flex rounded-[8px] bg-[#145b5f] px-6 py-3 text-[15px] font-semibold text-white hover:bg-[#104c4f]">
          Book a Viewing
        </a>
      </section>
    </SeoPageShell>
  );
}
