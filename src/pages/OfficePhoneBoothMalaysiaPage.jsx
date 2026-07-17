import React from 'react';
import { Link } from 'react-router-dom';
import SeoMeta from '../components/SeoMeta';
import PageShell from '../components/PageShell';
import { products } from '../data/products';
import { pushDataLayerEvent } from '../lib/tracking';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, createFaqSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Office Phone Booth Malaysia', path: '/office-phone-booth-malaysia' }
];

const phoneBoothSlugs = ['ace-solo', 'ace-plus', 'ace-flex', 'ace-flex-duo'];
const phoneBoothPods = phoneBoothSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter(Boolean);

const PHONE_BOOTH_FAQS = [
  { question: 'What is the difference between a phone pod and an office phone booth?', answer: 'The terms are often used interchangeably. Both usually describe a compact enclosed workspace for private calls and focused work; the right choice depends on the model size, ventilation, acoustic performance, and daily usage.' },
  { question: 'Are phone booth pods soundproof?', answer: 'Phone booth pods reduce surrounding noise and improve speech privacy, but they are not automatically completely soundproof. Review the stated acoustic result for the specific model and consider the surrounding office conditions.' },
  { question: 'Which phone pod is best for private calls?', answer: 'Ace Solo suits compact call use, while Ace Plus is designed for longer one-person focus and repeated daily calls. The best option depends on space, expected session length, and budget.' },
  { question: 'What affects office phone booth pricing in Malaysia?', answer: 'Final pricing depends on the model, selected options, quantity, delivery location, and site-access conditions for installation.' }
];

export default function OfficePhoneBoothMalaysiaPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Office Phone Booth Malaysia for Calls and Focus | Ace Office Pods"
        description="Find office phone booth solutions in Malaysia for private calls and focused work. Compare Ace Solo, Ace Plus, and Ace Flex by space, use case, and pricing."
        canonical={buildCanonical('/office-phone-booth-malaysia')}
        keywords={`${SEO_KEYWORDS_COMMON}, office phone booth malaysia, phone booth office malaysia, phone pod malaysia, privacy booth malaysia, soundproof phone booth malaysia, call pod malaysia, single person office pod`}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs), createFaqSchema('/office-phone-booth-malaysia', PHONE_BOOTH_FAQS)]}
      />

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#68726f]">
          <Link to="/" className="hover:text-[#007653]">
            Home
          </Link>{' '}
          / <span>Office Phone Booth Malaysia</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#172126] md:text-[48px]">Office phone booth solutions in Malaysia</h1>
        <p className="mt-4 max-w-[72ch] text-[18px] leading-[1.6] text-[#59635f]">
          Compare phone booth style office pods, phone pods, and privacy booths for private calls, focused work, and small one-to-one collaboration. Choose by use case, size, acoustic performance, and practical project fit.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-[15px] font-semibold">
          <Link to="/office-pods" className="rounded-[8px] bg-[#00855a] px-4 py-2 text-white hover:bg-[#172126]">
            View office phone booth models
          </Link>
          <Link
            to="/pricing"
            onClick={() =>
              pushDataLayerEvent('pricing_cta_click', {
                cta_location: 'office_phone_booth_malaysia_hero',
                cta_text: 'View pricing',
                destination_url: '/pricing'
              })
            }
            className="rounded-[8px] border border-[#00855a] px-4 py-2 text-[#007653] hover:bg-[#f7f6f2]"
          >
            View pricing
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1200px] gap-5 px-5 md:grid-cols-3 md:px-8">
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
          <h2 className="text-[22px] font-semibold tracking-tight text-[#172126]">Best for calls</h2>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#59635f]">Ace Solo is a compact option for private calls and quick daily tasks.</p>
        </article>
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
          <h2 className="text-[22px] font-semibold tracking-tight text-[#172126]">Best for longer focus</h2>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#59635f]">Ace Plus is built for one-person privacy, focused work, and sound control.</p>
        </article>
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
          <h2 className="text-[22px] font-semibold tracking-tight text-[#172126]">Best for extra comfort</h2>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#59635f]">Ace Flex and Ace Flex Duo offer more internal room for longer sessions.</p>
        </article>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1200px] px-5 md:px-8">
        <div className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[25px] font-semibold tracking-tight text-[#172126]">Ace Solo vs Ace Plus vs Ace Flex</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-[15px] text-[#59635f]">
              <thead>
                <tr className="border-b border-[#e4dfd6] text-[14px] uppercase tracking-[0.04em] text-[#68726f]">
                  <th className="px-2 py-3">Model</th>
                  <th className="px-2 py-3">Capacity</th>
                  <th className="px-2 py-3">Best for</th>
                  <th className="px-2 py-3">From price</th>
                </tr>
              </thead>
              <tbody>
                {phoneBoothPods.map((product) => {
                  const bestForRow = product.specs.find((row) => row.label === 'Best for');
                  const capacityRow = product.specs.find((row) => row.label === 'Capacity');

                  return (
                    <tr key={product.slug} className="border-b border-[#efebe3]">
                      <td className="px-2 py-3 font-semibold text-[#172126]">
                        <Link
                          to={`/pods/${product.slug}`}
                          onClick={() =>
                            pushDataLayerEvent('product_cta_click', {
                              cta_location: 'office_phone_booth_malaysia_comparison_table',
                              cta_text: `View ${product.name}`,
                              destination_url: `/pods/${product.slug}`,
                              product_name: product.name,
                              product_slug: product.slug
                            })
                          }
                          className="underline-offset-4 hover:underline"
                        >
                          {product.name}
                        </Link>
                      </td>
                      <td className="px-2 py-3">{capacityRow?.value || '-'}</td>
                      <td className="px-2 py-3">{bestForRow?.value || '-'}</td>
                      <td className="px-2 py-3">{product.pricing.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1200px] gap-5 px-5 md:grid-cols-2 md:px-8">
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[23px] font-semibold tracking-tight text-[#172126]">Space, pricing, and setup considerations</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#59635f]">
            Compare pod footprint, use case, and starting price first. Final project pricing depends on selected options, quantity, and site conditions.
          </p>
          <Link
            to="/pricing"
            onClick={() =>
              pushDataLayerEvent('pricing_cta_click', {
                cta_location: 'office_phone_booth_malaysia_pricing_factors',
                cta_text: 'View office pod pricing',
                destination_url: '/pricing'
              })
            }
            className="mt-4 inline-flex text-[15px] font-semibold text-[#007653] underline-offset-4 hover:underline"
          >
            View office pod pricing
          </Link>
        </article>
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[23px] font-semibold tracking-tight text-[#172126]">Delivery and installation notes</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#59635f]">
            Site access and placement planning affect delivery and installation scope. Outside Klang Valley and restricted-access handling are quoted separately based on actual conditions.
          </p>
          <Link to="/installation-support" className="mt-4 inline-flex text-[15px] font-semibold text-[#007653] underline-offset-4 hover:underline">
            Learn about installation and support
          </Link>
        </article>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1200px] gap-5 px-5 md:grid-cols-3 md:px-8">
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
          <h2 className="text-[21px] font-semibold tracking-tight text-[#172126]">What is an office phone booth?</h2>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#59635f]">
            An office phone booth is a compact enclosed pod that supports private calls, focused work, and better day-to-day privacy in open offices.
          </p>
        </article>
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
          <h2 className="text-[21px] font-semibold tracking-tight text-[#172126]">Who is it best for?</h2>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#59635f]">
            It is suitable for teams that need frequent call privacy and focused work space without building permanent new rooms.
          </p>
        </article>
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
          <h2 className="text-[21px] font-semibold tracking-tight text-[#172126]">Which model should I choose first?</h2>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#59635f]">
            Start with Ace Solo for compact call use, Ace Plus for longer one-person focus, and Ace Flex when you need extra internal room.
          </p>
        </article>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1200px] px-5 md:px-8">
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[23px] font-semibold tracking-tight text-[#172126]">Phone pod privacy and acoustic performance</h2>
          <p className="mt-3 max-w-[80ch] text-[16px] leading-[1.65] text-[#59635f]">
            A phone pod, privacy booth, or soundproof phone booth should be compared using its stated acoustic result, ventilation, and intended session length—not name alone. Ace Plus and the larger Ace models carry a stated 27 dB noise-reduction rating; review the relevant model specification and acoustic-test information before final selection.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-[15px] font-semibold text-[#007653]">
            <Link to="/pods/ace-plus" className="underline-offset-4 hover:underline">View Ace Plus specifications</Link>
            <Link to="/articles/office-pod-brands-malaysia-comparison" className="underline-offset-4 hover:underline">How to compare acoustic claims</Link>
          </div>
        </article>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1200px] gap-4 px-5 md:px-8">
        {PHONE_BOOTH_FAQS.map((item) => (
          <article key={item.question} className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
            <h2 className="text-[22px] font-semibold tracking-tight text-[#172126]">{item.question}</h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-[#59635f]">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-10 w-full max-w-[1200px] px-5 pb-16 md:px-8 md:pb-20">
        <div className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[24px] font-semibold tracking-tight text-[#172126]">Get a recommendation</h2>
          <div className="mt-4 flex flex-wrap gap-5 text-[15px] font-semibold text-[#007653]">
            <Link to="/office-pods" className="underline-offset-4 hover:underline">
              View all office pods
            </Link>
            <Link to="/compare-office-pods" className="underline-offset-4 hover:underline">
              Compare office pods
            </Link>
            <Link
              to="/pricing"
              onClick={() =>
                pushDataLayerEvent('pricing_cta_click', {
                  cta_location: 'office_phone_booth_malaysia_final_cta',
                  cta_text: 'View pricing',
                  destination_url: '/pricing'
                })
              }
              className="underline-offset-4 hover:underline"
            >
              View pricing
            </Link>
            <Link to="/contact" className="underline-offset-4 hover:underline">
              Contact our team
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
