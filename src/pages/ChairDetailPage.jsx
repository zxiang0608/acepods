import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { chairs, formatChairPrice } from '../data/chairs';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const WHATSAPP_LINK = 'https://wa.link/9umr4q';

// Per-chair long-form content. Specs stay "on request" until Nic's supplier
// data lands — do not invent dimensions, materials or certifications.
const CHAIR_CONTENT = {
  'ace-monarch': {
    useCases: [
      ['Director & C-suite offices', 'A commanding highback that anchors the most senior room in the company.'],
      ['Boardrooms', 'Executive seating for the head table where presence matters.'],
      ['Premium private offices', 'Full ergonomic adjustment for long, decision-heavy days.']
    ],
    highlights: [
      'Full ergonomic adjustments — seat height, depth, recline and armrests',
      'Integrated headrest for full-day executive comfort',
      'Premium upholstery matched to executive office finishes',
      'Delivered and installed alongside your pod project'
    ],
    faqs: [
      ['Is this chair suitable for daily full-day use?', 'Yes — it is built as a top-of-range executive highback with full ergonomic adjustments for extended sitting.'],
      ['Can I order just one chair?', 'Yes. Single orders are welcome; project quantities for full offices are quoted separately on WhatsApp.'],
      ['Does the price include installation?', 'List price covers the chair. Delivery and installation can be bundled with your pod project or quoted separately within Klang Valley.']
    ]
  },
  'ace-regal': {
    useCases: [
      ['Directors’ offices', 'Refined executive presence without overstepping the budget.'],
      ['Senior manager rooms', 'Highback comfort for leadership teams.'],
      ['Client-facing offices', 'A credible, polished look behind every desk clients see.']
    ],
    highlights: [
      'Executive highback profile with a refined, understated look',
      'All-day seating comfort for senior roles',
      'Pairs with Ace Monarch for a tiered executive suite',
      'Delivered and installed alongside your pod project'
    ],
    faqs: [
      ['What is the difference between Ace Regal and Ace Monarch?', 'Monarch is our top-of-range executive model with the fullest adjustment set and premium upholstery; Regal delivers the same executive highback character at a lower list price.'],
      ['Can I mix Regal and Monarch in one floor?', 'Yes — many projects use Monarch for directors and Regal for senior managers. We quote mixed volumes on WhatsApp.'],
      ['How soon can it be delivered?', 'Lead times depend on stock and project size — confirm current availability on WhatsApp before scheduling.']
    ]
  },
  'ace-apex': {
    useCases: [
      ['Managerial workstations', 'Breathable mesh back for managers who move between meetings.'],
      ['Team lead desks', 'Adjustable lumbar support for long working hours.'],
      ['Modern open-plan floors', 'A lighter visual profile than upholstered highbacks.']
    ],
    highlights: [
      'Premium mesh back keeps long sessions cool and breathable',
      'Adjustable lumbar support for individual fit',
      'Managerial presence without a bulky silhouette',
      'Delivered and installed alongside your pod project'
    ],
    faqs: [
      ['Why choose mesh over upholstery?', 'Mesh backs breathe better in Malaysia’s climate and suit users who prefer lighter back support with adjustable lumbar.'],
      ['Is the lumbar support adjustable?', 'Yes — Apex includes adjustable lumbar so each user can tune lower-back support.'],
      ['What is the weight capacity?', 'Detailed specifications are available on request — ask on WhatsApp and we will share the supplier sheet.']
    ]
  },
  'ace-crest': {
    useCases: [
      ['Managerial offices', 'Sculpted highback balancing authority and comfort.'],
      ['Supervisor stations', 'All-day support for shift-lead and supervisor roles.'],
      ['Guest-facing management areas', 'A composed look for semi-private spaces.']
    ],
    highlights: [
      'Sculpted highback design with balanced support',
      'Comfort tuned for extended managerial hours',
      'Sits between Apex and Regal in the range',
      'Delivered and installed alongside your pod project'
    ],
    faqs: [
      ['How does Crest compare to Apex?', 'Crest is a sculpted managerial highback with a fuller silhouette; Apex is a breathable mesh model with adjustable lumbar. Both serve managerial desks — choice comes down to style preference.'],
      ['Is it suitable for tall users?', 'General suitability questions are best confirmed against the spec sheet — request it on WhatsApp.'],
      ['Can we test-sit before ordering?', 'Yes — visit our Klang factory showroom together with your pod viewing. Book through WhatsApp.']
    ]
  },
  'ace-pace': {
    useCases: [
      ['Workstations & benching', 'The dependable everyday chair for rows of desks.'],
      ['Shared & hot desks', 'Simple adjustments anyone can set in seconds.'],
      ['Back offices & pantries', 'Durable seating for high-turnover zones.']
    ],
    highlights: [
      'Dependable everyday workhorse construction',
      'Straightforward adjustments for shared use',
      'Best-value seated position in the Ace range',
      'Delivered and installed alongside your pod project'
    ],
    faqs: [
      ['Is Pace suitable for 8-hour days?', 'Pace is designed as a dependable daily workstation chair. For executive-level all-day comfort, consider Ace Apex or above.'],
      ['Do you offer bulk pricing?', 'Yes — project quantities are quoted separately. Send your quantity and floor plan on WhatsApp.'],
      ['What colours are available?', 'Colour options follow current supplier stock — confirm availability on WhatsApp before specifying.']
    ]
  },
  'ace-guest': {
    useCases: [
      ['Meeting corners', 'Keeps visitor seating consistent across every discussion spot.'],
      ['Reception areas', 'Professional cantilever seating for short waits.'],
      ['Pod-side discussions', 'The natural companion seat outside any Ace pod.']
    ],
    highlights: [
      'Cantilever frame — clean, modern visitor profile',
      'Keeps meeting corners visually consistent',
      'No castors: stable, fixed-position seating',
      'Delivered and installed alongside your pod project'
    ],
    faqs: [
      ['Does Ace Guest have wheels?', 'No — it is a cantilever visitor chair designed to stay planted beside pods, desks and meeting tables.'],
      ['Can it pair with other Ace chairs?', 'Yes — it is commonly specified alongside Ace Meet pods and Pace workstations for a consistent look.'],
      ['Is stacking possible?', 'Ace Lite (not Guest) is the stackable option for training-room volumes. Confirm stacking needs on WhatsApp.']
    ]
  },
  'ace-lite': {
    useCases: [
      ['Training rooms', 'Light, stackable seats for variable class sizes.'],
      ['Pantries & break areas', 'Practical seating that moves where needed.'],
      ['Event & overflow seating', 'Lowest-cost coverage for peak occupancy.']
    ],
    highlights: [
      'Lightweight and easy to reposition',
      'Stackable for flexible room layouts',
      'Most accessible entry price in the range',
      'Delivered and installed alongside your pod project'
    ],
    faqs: [
      ['How many stack?', 'Stacking configuration depends on the current model revision — confirm on WhatsApp before planning storage.'],
      ['Is Lite comfortable for long sessions?', 'Lite is designed for short-duration and multipurpose areas. For desk-based work, choose Ace Pace or above.'],
      ['What is the minimum order?', 'Single units are fine. Volume pricing applies for training-room and fit-out projects — quote via WhatsApp.']
    ]
  }
};

export default function ChairDetailPage() {
  const { slug } = useParams();
  const chair = chairs.find((c) => c.id === slug);
  const content = chair ? CHAIR_CONTENT[chair.id] : null;

  if (!chair || !content) {
    return (
      <PageShell>
        <section className="mx-auto w-full max-w-[1200px] px-5 pb-20 pt-24 md:px-8">
          <h1 className="text-[32px] font-bold tracking-tight text-[#172126]">Chair not found</h1>
          <p className="mt-3 text-[16px] text-[#59635f]">
            <Link to="/office-chairs" className="text-[#007653] hover:underline">← Back to all office chairs</Link>
          </p>
        </section>
      </PageShell>
    );
  }

  const others = chairs.filter((c) => c.id !== chair.id).slice(0, 3);
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Office Chairs', path: '/office-chairs' },
    { name: chair.name, path: `/office-chairs/${chair.id}` }
  ];

  return (
    <PageShell>
      <SeoMeta
        title={`${chair.name} Office Chair | Ace Office Pods`}
        description={`${chair.name} — ${chair.blurb} List price ${formatChairPrice(chair.price)}. Delivered and installed with your Ace pod project across Klang Valley.`}
        canonical={buildCanonical(`/office-chairs/${chair.id}`)}
        keywords={`${SEO_KEYWORDS_COMMON}, ${chair.name.toLowerCase()}, office chair malaysia`}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <article className="mx-auto w-full max-w-[1200px] px-5 pb-20 pt-12 md:px-8 md:pt-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-[#68726f]">
          <Link to="/" className="hover:text-[#007653]">Home</Link>{' '}
          / <Link to="/office-chairs" className="hover:text-[#007653]">Office Chairs</Link>{' '}
          / <span>{chair.name}</span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[8px] border border-[#e4e7e5] bg-[#f6f6f2] p-10">
            <img
              src={chair.image}
              alt={`${chair.name} office chair`}
              decoding="async"
              className="max-h-full max-w-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#007653]">{chair.tier}</p>
            <h1 className="mt-2 text-[34px] font-bold tracking-tight text-[#172126] md:text-[46px]">{chair.name}</h1>
            <p className="mt-4 max-w-[54ch] text-[16px] leading-[1.6] text-[#59635f]">{chair.blurb}</p>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-[28px] font-bold text-[#00855a]">{formatChairPrice(chair.price)}</span>
              <span className="text-[14px] text-[#68726f]">list price · project quantities quoted separately</span>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-12 w-full max-w-[320px] items-center justify-center rounded-[6px] bg-[#007653] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#005f43]"
            >
              Ask about {chair.name} on WhatsApp
            </a>
            <p className="mt-3 text-[13px] leading-relaxed text-[#68726f]">
              Delivered and installed by the same team as our pods — one project, one contact.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <section className="mt-16">
          <h2 className="border-b border-[#e4e7e5] pb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#172126]">
            Why {chair.name}
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {content.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#37403d]">
                <span aria-hidden="true" className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#00855a]" />
                {h}
              </li>
            ))}
          </ul>
        </section>

        {/* Use cases */}
        <section className="mt-16">
          <h2 className="border-b border-[#e4e7e5] pb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#172126]">
            Where it fits
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {content.useCases.map(([title, desc]) => (
              <div key={title} className="rounded-[6px] border border-[#e4e7e5] bg-[#f6f6f2] px-6 py-6">
                <h3 className="text-[15px] font-semibold text-[#172126]">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#59635f]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="border-b border-[#e4e7e5] pb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#172126]">
            Quick answers about {chair.name}
          </h2>
          <dl className="mt-6 space-y-6">
            {content.faqs.map(([q, a]) => (
              <div key={q}>
                <dt className="text-[15px] font-semibold text-[#172126]">{q}</dt>
                <dd className="mt-1 max-w-[70ch] text-[14.5px] leading-relaxed text-[#59635f]">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Other chairs */}
        <section className="mt-16">
          <h2 className="border-b border-[#e4e7e5] pb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#172126]">
            Other Ace chairs
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            {others.map((c) => (
              <Link key={c.id} to={`/office-chairs/${c.id}`} className="group">
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[8px] border border-[#e4e7e5] bg-[#f6f6f2] p-6">
                  <img
                    src={c.image}
                    alt={`${c.name} office chair`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="text-[15px] font-semibold text-[#172126] group-hover:text-[#007653]">{c.name}</span>
                  <span className="whitespace-nowrap text-[14px] font-bold text-[#00855a]">{formatChairPrice(c.price)}</span>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/office-chairs" className="mt-6 inline-block text-[14px] font-semibold text-[#007653] hover:underline">
            ← View all office chairs
          </Link>
        </section>
      </article>
    </PageShell>
  );
}
