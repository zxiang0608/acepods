import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';
import { chairs, formatChairPrice } from '../data/chairs';

const WHATSAPP_LINK = 'https://wa.link/9umr4q';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Office Chairs', path: '/office-chairs' }
];

const tierOrder = ['Executive', 'Managerial', 'Daily work', 'Visitor'];

export default function OfficeChairsPage() {
  const grouped = tierOrder
    .map((tier) => ({ tier, items: chairs.filter((c) => c.tier === tier) }))
    .filter((g) => g.items.length > 0);

  return (
    <PageShell>
      <SeoMeta
        title="Office Chairs | Ace Office Pods"
        description="Ace office chairs — executive, managerial, daily workstation and visitor seating. Delivered and installed with your pod project. Project pricing for volume orders."
        canonical={buildCanonical('/office-chairs')}
        keywords={`${SEO_KEYWORDS_COMMON}, office chairs malaysia, executive chair, ergonomic chair`}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-20 pt-12 md:px-8 md:pt-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-[#68726f]">
          <Link to="/" className="hover:text-[#007653]">Home</Link>{' '}
          / <span>Office Chairs</span>
        </nav>

        <h1 className="text-[36px] font-bold tracking-tight text-[#172126] md:text-[54px]">Office Chairs</h1>
        <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.6] text-[#59635f] md:text-[18px] md:font-medium">
          Complete the office around your pods. Workstations, managerial seating and executive offices —
          matched to the same standard as our pods, delivered and installed together.
          Pricing below is list price; project quantities are quoted separately.
        </p>

        {grouped.map(({ tier, items }) => (
          <div key={tier} className="mt-14">
            <h2 className="mb-6 border-b border-[#e4e7e5] pb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#172126]">
              {tier}
            </h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((chair) => (
                <article key={chair.id} id={chair.id}>
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[8px] border border-[#e4e7e5] bg-[#f6f6f2] p-6">
                    <img
                      src={chair.image}
                      alt={`${chair.name} office chair`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 className="text-[17px] font-semibold text-[#172126]">{chair.name}</h3>
                    <span className="whitespace-nowrap text-[15px] font-bold text-[#00855a]">
                      {formatChairPrice(chair.price)}
                    </span>
                  </div>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#59635f]">{chair.blurb}</p>
                </article>
              ))}
            </div>
          </div>
        ))}

        {/* Closing CTA */}
        <section className="mt-16 rounded-[8px] border border-[#e4e7e5] bg-[#f6f6f2] px-6 py-10 md:px-10">
          <h2 className="text-[22px] font-bold tracking-tight text-[#172126] md:text-[28px]">
            Furnishing a full office?
          </h2>
          <p className="mt-3 max-w-[60ch] text-[15.5px] leading-relaxed text-[#59635f]">
            Tell us headcount and floor plan. We bundle chairs with your pod project into one delivery,
            one installation team and one quotation — with project pricing for volume orders.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-[8px] bg-[#00855a] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#172126]"
            >
              WhatsApp us for project pricing
            </a>
            <Link
              to="/office-pods"
              className="inline-flex h-12 items-center justify-center rounded-[8px] border border-[#172126] px-7 text-[15px] font-semibold text-[#172126] transition-colors hover:bg-[#172126] hover:text-white"
            >
              Browse office pods
            </Link>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
