import React from 'react';
import { Link } from 'react-router-dom';
import SeoMeta from '../components/SeoMeta';
import PageShell from '../components/PageShell';
import { products } from '../data/products';
import { pushDataLayerEvent } from '../lib/tracking';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Meeting Pods Malaysia', path: '/meeting-pods-malaysia' }
];

const meetingPodSlugs = ['ace-meet', 'ace-hub', 'ace-flex-duo'];
const meetingPods = meetingPodSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter(Boolean);

const quickAnswers = [
  { title: 'Best for 2–4 people', productSlug: 'ace-meet' },
  { title: 'Best for up to 6 people', productSlug: 'ace-hub' }
];

export default function MeetingPodsMalaysiaPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Meeting Pods Malaysia for 2–6 Pax Teams | Ace Office Pods"
        description="Compare meeting pods in Malaysia for small-team discussions and hybrid calls. Review Ace Meet and Ace Hub with pricing, installation, and support details."
        canonical={buildCanonical('/meeting-pods-malaysia')}
        keywords={`${SEO_KEYWORDS_COMMON}, meeting pods malaysia, office meeting pod malaysia, 4 person meeting pod, 6 person meeting pod`}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Meeting Pods Malaysia</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#14181c] md:text-[48px]">
          Meeting pods in Malaysia for small-team collaboration
        </h1>
        <p className="mt-4 max-w-[72ch] text-[18px] leading-[1.6] text-[#454d56]">
          Compare meeting pods for 2–6 pax team discussions and hybrid calls. Use this page to shortlist the right model by team size, layout fit, and project requirements.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-[15px] font-semibold">
          <Link to="/office-pods" className="rounded-[8px] bg-[#145b5f] px-4 py-2 text-white hover:bg-[#10494d]">
            View meeting pod models
          </Link>
          <Link
            to="/pricing"
            onClick={() =>
              pushDataLayerEvent('pricing_cta_click', {
                cta_location: 'meeting_pods_malaysia_hero',
                cta_text: 'View pricing',
                destination_url: '/pricing'
              })
            }
            className="rounded-[8px] border border-[#145b5f] px-4 py-2 text-[#145b5f] hover:bg-[#f4fbfb]"
          >
            View pricing
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1200px] gap-5 px-5 md:grid-cols-2 md:px-8">
        {quickAnswers.map((item) => {
          const product = products.find((candidate) => candidate.slug === item.productSlug);
          if (!product) return null;

          return (
            <article key={item.productSlug} className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
              <h2 className="text-[23px] font-semibold tracking-tight text-[#1d232a]">{item.title}</h2>
              <p className="mt-2 text-[16px] leading-[1.6] text-[#4d555e]">
                <span className="font-semibold text-[#1d232a]">{product.name}:</span> {product.shortDesc}
              </p>
              <p className="mt-2 text-[15px] font-medium text-[#5b636c]">{product.pricing.amount}</p>
              <Link
                to={`/pods/${product.slug}`}
                onClick={() =>
                  pushDataLayerEvent('product_cta_click', {
                    cta_location: 'meeting_pods_malaysia_quick_answers',
                    cta_text: `View ${product.name}`,
                    destination_url: `/pods/${product.slug}`,
                    product_name: product.name,
                    product_slug: product.slug
                  })
                }
                className="mt-3 inline-flex text-[14px] font-semibold text-[#145b5f] underline-offset-4 hover:underline"
              >
                View {product.name}
              </Link>
            </article>
          );
        })}
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1200px] px-5 md:px-8">
        <div className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[25px] font-semibold tracking-tight text-[#14181c]">Ace Meet vs Ace Hub</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-[15px] text-[#4d555e]">
              <thead>
                <tr className="border-b border-[#e4dfd6] text-[14px] uppercase tracking-[0.04em] text-[#6b7279]">
                  <th className="px-2 py-3">Model</th>
                  <th className="px-2 py-3">Capacity</th>
                  <th className="px-2 py-3">Best for</th>
                  <th className="px-2 py-3">From price</th>
                </tr>
              </thead>
              <tbody>
                {meetingPods.map((product) => {
                  const bestForRow = product.specs.find((row) => row.label === 'Best for');
                  const capacityRow = product.specs.find((row) => row.label === 'Capacity');
                  return (
                    <tr key={product.slug} className="border-b border-[#efebe3]">
                      <td className="px-2 py-3 font-semibold text-[#1d232a]">
                        <Link
                          to={`/pods/${product.slug}`}
                          onClick={() =>
                            pushDataLayerEvent('product_cta_click', {
                              cta_location: 'meeting_pods_malaysia_comparison_table',
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
          <h2 className="text-[23px] font-semibold tracking-tight text-[#1d232a]">Pricing and configuration factors</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">
            Final pricing depends on model, quantity, configuration options, and site access conditions. Review full scope before final confirmation.
          </p>
          <Link
            to="/pricing"
            onClick={() =>
              pushDataLayerEvent('pricing_cta_click', {
                cta_location: 'meeting_pods_malaysia_pricing_factors',
                cta_text: 'View office pod pricing',
                destination_url: '/pricing'
              })
            }
            className="mt-4 inline-flex text-[15px] font-semibold text-[#145b5f] underline-offset-4 hover:underline"
          >
            View office pod pricing
          </Link>
        </article>
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[23px] font-semibold tracking-tight text-[#1d232a]">Delivery, installation, and site access notes</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">
            Delivery and installation planning should include access route checks and placement constraints. Areas outside Klang Valley and restricted-access handling are quoted separately based on site conditions.
          </p>
          <Link to="/installation-support" className="mt-4 inline-flex text-[15px] font-semibold text-[#145b5f] underline-offset-4 hover:underline">
            Learn about installation and support
          </Link>
        </article>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1200px] gap-5 px-5 md:grid-cols-3 md:px-8">
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
          <h2 className="text-[21px] font-semibold tracking-tight text-[#1d232a]">What is a meeting pod?</h2>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#4d555e]">
            A meeting pod is a dedicated enclosed workspace for small-team discussions, hybrid calls, and quieter collaboration in open offices.
          </p>
        </article>
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
          <h2 className="text-[21px] font-semibold tracking-tight text-[#1d232a]">Which model should I choose for team size?</h2>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#4d555e]">
            Ace Meet fits most 2–4 pax collaboration use cases. Ace Hub is suitable when you need more room for up to 6 pax sessions.
          </p>
        </article>
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
          <h2 className="text-[21px] font-semibold tracking-tight text-[#1d232a]">How much does a meeting pod cost in Malaysia?</h2>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#4d555e]">
            Entry pricing starts from RM22,200 for Ace Meet and RM27,800 for Ace Hub. Final quote depends on selected options and site conditions.
          </p>
        </article>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1200px] gap-4 px-5 md:px-8">
        {[
          {
            q: 'Which meeting pod is suitable for 2–4 people?',
            a: 'Ace Meet is designed for 2–4 pax discussions and hybrid calls in open-plan office environments.'
          },
          {
            q: 'Which meeting pod is suitable for up to 6 people?',
            a: 'Ace Hub provides larger internal room for up to 6 pax team sessions and collaboration use cases.'
          },
          {
            q: 'What affects final meeting pod pricing?',
            a: 'Final pricing depends on model, quantity, selected configuration, and delivery or installation conditions.'
          },
          {
            q: 'What installation and delivery factors should we prepare for?',
            a: 'Prepare access route details and placement constraints in advance. Outside Klang Valley and restricted-access handling are quoted separately.'
          }
        ].map((item) => (
          <article key={item.q} className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
            <h2 className="text-[22px] font-semibold tracking-tight text-[#1d232a]">{item.q}</h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">{item.a}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-10 w-full max-w-[1200px] px-5 pb-16 md:px-8 md:pb-20">
        <div className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[24px] font-semibold tracking-tight text-[#14181c]">Talk to our team</h2>
          <div className="mt-4 flex flex-wrap gap-5 text-[15px] font-semibold text-[#145b5f]">
            <Link to="/compare-office-pods" className="underline-offset-4 hover:underline">
              Compare office pods
            </Link>
            <Link
              to="/pricing"
              onClick={() =>
                pushDataLayerEvent('pricing_cta_click', {
                  cta_location: 'meeting_pods_malaysia_final_cta',
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
