import React from 'react';
import { Link } from 'react-router-dom';
import SeoMeta from '../components/SeoMeta';
import PageShell from '../components/PageShell';
import { products } from '../data/products';
import { pushDataLayerEvent } from '../lib/tracking';
import { PRICING_FAQ_ITEMS, SEO_KEYWORDS_COMMON } from '../seo/constants';
import QuoteForm from '../components/QuoteForm';
import { buildCanonical, createBreadcrumbSchema, createFaqSchema, createPricingItemListSchema, localBusinessSchema, websiteSchema } from '../seo/schema';
import PodPrice from '../components/PodPrice';
import { useCurrency } from '../hooks/useCurrency';
import { ACE_UNO_PRICING } from '../data/podSeoCatalog';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' }
];

const pricingWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Office Pod Pricing in Malaysia',
  url: buildCanonical('/pricing'),
  description: 'Understand office pod pricing and what affects final project cost, including pod type, delivery, installation, and selected options.',
  isPartOf: {
    '@id': `${buildCanonical('/')}#website`
  },
  publisher: {
    '@id': `${buildCanonical('/')}#organization`
  },
  about: {
    '@type': 'Thing',
    name: 'office pod pricing in Malaysia'
  }
};

const pricingAnswerSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${buildCanonical('/pricing')}#office-pod-price-answer`,
  name: 'Office pods price in Malaysia',
  url: buildCanonical('/pricing'),
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['#office-pod-price-answer']
  },
  mainEntity: {
    '@type': 'Question',
    name: 'How much does an office pod cost in Malaysia?',
    acceptedAnswer: {
      '@type': 'Answer',
      text:
        'Ace Uno is the entry model at RM8,850 for the pod only. Standard Klang Valley delivery is RM350 and installation is RM350, making the standard installed total RM9,550 before the optional stool. Meeting pods start from RM22,200.'
    }
  }
};

export default function PricingPage() {
  const { isLocal } = useCurrency();
  const pricingListItems = products.map((product) => {
    const basePrice = product.pdpPricing?.baseConfigurations?.[0]?.price;
    return {
      name: product.name,
      path: `/pods/${product.slug}`,
      price: basePrice
    };
  });

  return (
    <PageShell>
      <SeoMeta
        title="Office Pod Pricing in Malaysia | Ace Office Pods"
        description="Understand office pod pricing and what affects final project cost, including pod type, delivery, installation, and selected options."
        canonical={buildCanonical('/pricing')}
        keywords={`${SEO_KEYWORDS_COMMON}, office pod price Malaysia, office booth price`}
        schemas={[
          localBusinessSchema,
          websiteSchema,
          pricingWebPageSchema,
          pricingAnswerSchema,
          createBreadcrumbSchema(breadcrumbs),
          createFaqSchema('/pricing', PRICING_FAQ_ITEMS),
          createPricingItemListSchema('/pricing', pricingListItems)
        ]}
      />

      <section className="mx-auto w-full max-w-[1100px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#68726f]">
          <Link to="/" className="hover:text-[#007653]">
            Home
          </Link>{' '}
          / <span>Pricing</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#172126] md:text-[48px]">How much does an office pod cost?</h1>
        <p id="office-pod-price-answer" className="mt-4 max-w-[70ch] text-[18px] leading-[1.6] text-[#59635f]">
          Ace Uno is the entry model at <PodPrice myrAmount={ACE_UNO_PRICING.podOnly} prefix="" /> for the pod only. Standard Klang Valley delivery is <PodPrice myrAmount={ACE_UNO_PRICING.standardKlangValleyDelivery} prefix="" /> and installation is <PodPrice myrAmount={ACE_UNO_PRICING.standardKlangValleyInstallation} prefix="" />, making the standard installed total <PodPrice myrAmount={ACE_UNO_PRICING.standardInstalledTotal} prefix="" /> before the optional stool. Meeting pods start from <PodPrice myrAmount={22200} prefix="" />.
        </p>
        {!isLocal && (
          <div className="mt-5 max-w-[70ch] rounded-[8px] border border-amber-200 bg-amber-50 px-4 py-3 text-[14px] leading-[1.55] text-amber-900">
            <strong>International buyers:</strong> Prices shown below are in USD, ex-works from our factory in Klang, Selangor, Malaysia. Shipping and installation to your country are arranged and paid by you. <a href="https://wa.link/9umr4q" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">WhatsApp us</a> for an export quote.
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-5 md:px-8">
        <div className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[26px] font-semibold tracking-tight text-[#172126]">Ace Uno standard Klang Valley price</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#59635f]">
            Pod: <PodPrice myrAmount={ACE_UNO_PRICING.podOnly} prefix="" />. Delivery: <PodPrice myrAmount={ACE_UNO_PRICING.standardKlangValleyDelivery} prefix="" />. Installation: <PodPrice myrAmount={ACE_UNO_PRICING.standardKlangValleyInstallation} prefix="" />. Standard installed total: <PodPrice myrAmount={ACE_UNO_PRICING.standardInstalledTotal} prefix="" /> before the optional stool. Outstation, restricted-access, and non-standard scopes are quoted separately.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1100px] px-5 md:px-8">
        <div className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[26px] font-semibold tracking-tight text-[#172126]">Office pod starting prices in Malaysia</h2>
          <ul className="mt-4 space-y-2 text-[16px] leading-[1.6] text-[#172126]">
            {products.map((product) => (
              <li key={`price-list-${product.slug}`}>
                <span className="font-semibold text-[#172126]">{product.name}</span> -{' '}
                <PodPrice myrAmount={product.pdpPricing.baseConfigurations[0].price} />
                {product.slug === 'ace-uno' ? ' pod only' : ''}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="all-pod-prices" className="mx-auto mt-8 grid w-full max-w-[1100px] gap-4 px-5 md:grid-cols-2 md:px-8">
        {products.map((product) => (
          <article key={product.slug} className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
            <h3 className="text-[24px] font-semibold tracking-tight text-[#172126]">{product.name}</h3>
            <p className="mt-2 text-[17px] font-semibold text-[#007653]">
              <PodPrice myrAmount={product.pdpPricing.baseConfigurations[0].price} />
            </p>
            <p className="mt-2 text-[14px] leading-[1.55] text-[#59635f]">{product.pricing.note}</p>
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
              className="mt-4 inline-flex text-[14px] font-semibold text-[#007653] underline-offset-4 hover:underline"
            >
              View pod details
            </Link>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1100px] px-5 md:px-8">
        <QuoteForm />
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1100px] px-5 md:px-8">
        <div className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[26px] font-semibold tracking-tight text-[#172126]">What affects the final price?</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#59635f]">
            Final pricing may vary depending on pod model, quantity, delivery location, floor/access conditions, installation scope, optional
            furniture, finishes, power requirements, and project timeline.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1100px] px-5 md:px-8">
        <div className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[26px] font-semibold tracking-tight text-[#172126]">Bulk and project pricing</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#59635f]">
            Corporate buyers, procurement teams, contractors, interior designers, dealers, resellers, and project buyers can request project pricing
            or bulk pricing depending on quantity, model mix, location, and installation scope.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1100px] px-5 md:px-8">
        <h2 className="text-[26px] font-semibold tracking-tight text-[#172126]">Common pricing questions</h2>
        <div className="mt-4 space-y-3">
          {PRICING_FAQ_ITEMS.map((item) => (
            <article key={item.question} className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
              <h3 className="text-[18px] font-semibold leading-[1.35] text-[#172126]">{item.question}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-[#59635f]">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 mb-16 flex w-full max-w-[1100px] flex-wrap gap-x-6 gap-y-4 px-5 text-[15px] font-semibold text-[#007653] md:mb-24 md:px-8">
        <Link to="/meeting-pods-malaysia" className="underline-offset-4 hover:underline">
          Compare meeting pods
        </Link>
        <Link to="/office-phone-booth-malaysia" className="underline-offset-4 hover:underline">
          Compare office phone booth models
        </Link>
        <Link to="/compare-office-pods" className="underline-offset-4 hover:underline">
          Compare office pods
        </Link>
        <Link to="/installation-support" className="underline-offset-4 hover:underline">
          Learn about installation and support
        </Link>
        <Link to="/faq" className="underline-offset-4 hover:underline">
          Read common questions about office pods
        </Link>
        <Link to="/contact" className="underline-offset-4 hover:underline">
          Request a project quote
        </Link>
      </section>
    </PageShell>
  );
}
