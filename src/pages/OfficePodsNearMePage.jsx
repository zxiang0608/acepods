import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { products } from '../data/products';
import { pushDataLayerEvent } from '../lib/tracking';
import {
  SEO_BRAND_EMAIL,
  SEO_BRAND_PHONE,
  SEO_BRAND_POSTAL_CODE,
  SEO_BRAND_SHOWROOM_LOCALITY,
  SEO_BRAND_SHOWROOM_REGION,
  SEO_BRAND_STREET_ADDRESS,
  SEO_KEYWORDS_COMMON
} from '../seo/constants';
import {
  buildCanonical,
  createBreadcrumbSchema,
  createFaqSchema,
  createPricingItemListSchema,
  localBusinessSchema,
  websiteSchema
} from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Office Pods Near Me', path: '/office-pods-near-me' }
];

const whatsappHref = 'https://wa.link/9umr4q';

const localFaqItems = [
  {
    question: 'Where can I find office pods near me in Malaysia?',
    answer:
      'Ace Office Pods supplies acoustic office pods and office booths from Klang, Selangor, with delivery and installation planning across Klang Valley and West Malaysia. Showroom viewing is available by appointment.'
  },
  {
    question: 'Can I view an office pod before buying?',
    answer:
      'Yes. Buyers can arrange a showroom viewing in Klang to compare office pod models, check size, review finishes, and understand acoustic performance before confirming a quote.'
  },
  {
    question: 'Do you install office pods near Kuala Lumpur, Selangor, and Klang Valley?',
    answer:
      'Yes. Ace Office Pods supports office pod delivery and installation planning for Kuala Lumpur, Selangor, Klang Valley, and other West Malaysia locations depending on access, quantity, and project scope.'
  },
  {
    question: 'How much do office pods near me cost?',
    answer:
      'Ace Office Pods start from RM8,800 for the Ace Uno pod only. Final project pricing depends on the model, quantity, delivery location, installation access, add-ons, and selected configuration.'
  }
];

const localWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Office Pods Near Me in Klang Valley and Malaysia',
  url: buildCanonical('/office-pods-near-me'),
  description:
    'Find office pods near you in Malaysia. Ace Office Pods offers showroom viewing by appointment in Klang, with office pod delivery and installation planning across Klang Valley and West Malaysia.',
  isPartOf: {
    '@id': `${buildCanonical('/')}#website`
  },
  publisher: {
    '@id': `${buildCanonical('/')}#organization`
  },
  mainEntity: {
    '@id': `${buildCanonical('/')}#organization`
  },
  about: [
    { '@type': 'Thing', name: 'office pods near me' },
    { '@type': 'Thing', name: 'office pods price' },
    { '@type': 'Place', name: 'Klang Valley' },
    { '@type': 'Place', name: 'Klang, Selangor' }
  ]
};

const serviceAreas = [
  { name: 'Klang' },
  { name: 'Shah Alam', path: '/locations/shah-alam' },
  { name: 'Petaling Jaya' },
  { name: 'Subang Jaya', path: '/locations/subang-jaya' },
  { name: 'Kuala Lumpur', path: '/locations/kuala-lumpur' },
  { name: 'Puchong' },
  { name: 'Cyberjaya' },
  { name: 'Putrajaya' }
];

export default function OfficePodsNearMePage() {
  const pricingListItems = products.map((product) => ({
    name: product.name,
    path: `/pods/${product.slug}`,
    price: product.pdpPricing?.baseConfigurations?.[0]?.price
  }));

  return (
    <PageShell>
      <SeoMeta
        title="Office Pods Near Me | Klang Valley Showroom"
        description="View office pods by appointment in Klang, with pricing, delivery, and installation support across Klang Valley and West Malaysia."
        canonical={buildCanonical('/office-pods-near-me')}
        keywords={`${SEO_KEYWORDS_COMMON}, office pods near me, office pods near me Malaysia, office pods Klang Valley, office pods Selangor, office pods Kuala Lumpur`}
        schemas={[
          localBusinessSchema,
          websiteSchema,
          localWebPageSchema,
          createBreadcrumbSchema(breadcrumbs),
          createFaqSchema('/office-pods-near-me', localFaqItems),
          createPricingItemListSchema('/office-pods-near-me', pricingListItems)
        ]}
      />

      <section className="mx-auto w-full max-w-[1100px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#68726f]">
          <Link to="/" className="hover:text-[#007653]">
            Home
          </Link>{' '}
          / <span>Office Pods Near Me</span>
        </nav>

        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#007653]">Klang Valley and West Malaysia</p>
        <h1 className="mt-3 max-w-[18ch] text-[34px] font-bold leading-[1.08] tracking-tight text-[#172126] md:text-[52px]">
          Office pods near me
        </h1>
        <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65] text-[#59635f] md:text-[18px]">
          Ace Office Pods supplies acoustic office pods and office booths from Klang, Selangor, with showroom viewing by appointment and project
          support across Klang Valley and West Malaysia.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/pricing#all-pod-prices"
            onClick={() =>
              pushDataLayerEvent('pricing_cta_click', {
                cta_location: 'office_pods_near_me_hero',
                cta_text: 'View office pod prices',
                destination_url: '/pricing#all-pod-prices'
              })
            }
            className="inline-flex min-h-[48px] items-center justify-center rounded-[4px] bg-[#172126] px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#172126]"
          >
            View office pod prices
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              pushDataLayerEvent('whatsapp_click', {
                cta_location: 'office_pods_near_me_hero',
                cta_text: 'Book showroom viewing',
                destination_url: whatsappHref,
                contact_method: 'whatsapp'
              })
            }
            className="inline-flex min-h-[48px] items-center justify-center rounded-[4px] border border-[#1f2937] px-5 py-3 text-[15px] font-semibold text-[#172126] transition-colors hover:border-[#00855a] hover:text-[#007653]"
          >
            Book showroom viewing
          </a>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1100px] gap-5 px-5 md:grid-cols-[1.15fr_0.85fr] md:px-8">
        <div className="border-y border-[#d8d3c8] py-7">
          <h2 className="text-[26px] font-semibold tracking-tight text-[#172126]">Local office pod supply and installation</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#59635f]">
            For “near me” buyers, the useful question is not only location. It is whether the supplier can handle viewing, model selection, delivery
            access, installation planning, and support after delivery. Ace Office Pods keeps that path direct for teams comparing office pods in
            Malaysia.
          </p>
        </div>
        <div className="border-y border-[#d8d3c8] py-7">
          <h2 className="text-[20px] font-semibold tracking-tight text-[#172126]">Contact</h2>
          <dl className="mt-4 space-y-3 text-[15px] leading-[1.55] text-[#59635f]">
            <div>
              <dt className="font-semibold text-[#172126]">Showroom</dt>
              <dd>
                {SEO_BRAND_STREET_ADDRESS}, {SEO_BRAND_POSTAL_CODE} {SEO_BRAND_SHOWROOM_LOCALITY}, {SEO_BRAND_SHOWROOM_REGION}. Viewing by
                appointment.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[#172126]">Phone / WhatsApp</dt>
              <dd>{SEO_BRAND_PHONE}</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#172126]">Email</dt>
              <dd className="break-all">{SEO_BRAND_EMAIL}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-[1100px] px-5 md:px-8">
        <h2 className="text-[26px] font-semibold tracking-tight text-[#172126]">Areas commonly served</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          {serviceAreas.map((area) =>
            area.path ? (
              <Link
                key={area.name}
                to={area.path}
                className="border border-[#ddd8cf] bg-white px-4 py-3 text-[15px] font-semibold text-[#172126] transition-colors hover:border-[#00855a] hover:text-[#007653]"
              >
                {area.name}
              </Link>
            ) : (
              <div key={area.name} className="border border-[#ddd8cf] bg-white px-4 py-3 text-[15px] font-semibold text-[#172126]">
                {area.name}
              </div>
            )
          )}
        </div>
        <p className="mt-4 text-[14px] leading-[1.6] text-[#68726f]">
          Other West Malaysia locations can be quoted based on delivery distance, site access, floor level, lift access, and installation scope.
        </p>
      </section>

      <section className="mx-auto mt-10 w-full max-w-[1100px] px-5 md:px-8">
        <h2 className="text-[26px] font-semibold tracking-tight text-[#172126]">Starting prices</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <article key={product.slug} className="border border-[#ddd8cf] bg-white p-5">
              <h3 className="text-[22px] font-semibold tracking-tight text-[#172126]">{product.name}</h3>
              <p className="mt-2 text-[16px] font-semibold text-[#007653]">{product.pricing.amount}</p>
              <p className="mt-2 text-[14px] leading-[1.55] text-[#59635f]">{product.shortDesc}</p>
              <Link to={`/pods/${product.slug}`} className="mt-4 inline-flex text-[14px] font-semibold text-[#007653] underline-offset-4 hover:underline">
                View {product.name}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-[1100px] px-5 pb-16 md:px-8">
        <h2 className="text-[26px] font-semibold tracking-tight text-[#172126]">Common local questions</h2>
        <div className="mt-4 space-y-3">
          {localFaqItems.map((item) => (
            <article key={item.question} className="border border-[#ddd8cf] bg-white p-5">
              <h3 className="text-[18px] font-semibold leading-[1.35] text-[#172126]">{item.question}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-[#59635f]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
