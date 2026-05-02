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
  { name: 'Pricing', path: '/pricing' }
];

export default function PricingPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Office Pod Pricing in Malaysia | Ace Office Pods"
        description="Understand office pod pricing and what affects final project cost, including pod type, delivery, installation, and selected options."
        canonical={buildCanonical('/pricing')}
        keywords={`${SEO_KEYWORDS_COMMON}, office pod price Malaysia, office booth price`}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1100px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Pricing</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#14181c] md:text-[48px]">How much does an office pod cost?</h1>
        <p className="mt-4 max-w-[70ch] text-[18px] leading-[1.6] text-[#454d56]">
          Office pod pricing depends on model, size, selected features, delivery, installation conditions, and any add-ons.
        </p>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-5 md:px-8">
        <div className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[26px] font-semibold tracking-tight text-[#14181c]">What is included in the price?</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">
            The full project price can include the pod, delivery, installation, and selected add-ons. Scope is confirmed clearly before final quote acceptance.
          </p>
        </div>
      </section>

      <section id="all-pod-prices" className="mx-auto mt-8 grid w-full max-w-[1100px] gap-4 px-5 md:grid-cols-2 md:px-8">
        {products.map((product) => (
          <article key={product.slug} className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
            <h3 className="text-[24px] font-semibold tracking-tight text-[#1d232a]">{product.name}</h3>
            <p className="mt-2 text-[17px] font-semibold text-[#145b5f]">{product.pricing.amount}</p>
            <p className="mt-2 text-[14px] leading-[1.55] text-[#5a616a]">{product.pricing.note}</p>
            <Link
              to={`/pods/${product.slug}`}
              onClick={() =>
                pushDataLayerEvent('product_cta_click', {
                  cta_location: 'pricing_page_product_card',
                  cta_text: 'View pod details',
                  destination_url: `/pods/${product.slug}`,
                  product_name: product.name,
                  product_slug: product.slug
                })
              }
              className="mt-4 inline-flex text-[14px] font-semibold text-[#145b5f] underline-offset-4 hover:underline"
            >
              View pod details
            </Link>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-10 flex w-full max-w-[1100px] flex-wrap gap-5 px-5 text-[15px] font-semibold text-[#145b5f] md:px-8">
        <Link to="/compare-office-pods" className="underline-offset-4 hover:underline">
          Compare office pods
        </Link>
        <Link to="/installation-support" className="underline-offset-4 hover:underline">
          Learn about installation and support
        </Link>
        <Link to="/faq" className="underline-offset-4 hover:underline">
          Read common questions about office pods
        </Link>
      </section>
    </PageShell>
  );
}
