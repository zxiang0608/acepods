import React from 'react';
import { Link } from 'react-router-dom';
import SeoMeta from '../components/SeoMeta';
import PageShell from '../components/PageShell';
import { products } from '../data/products';
import { pushDataLayerEvent } from '../lib/tracking';
import { OFFICE_PODS_FAQ_ITEMS, SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, createFaqSchema, createPricingItemListSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Office Pods', path: '/office-pods' }
];

const officePodsCollectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Office Pods and Office Booths Malaysia',
  url: buildCanonical('/office-pods'),
  description:
    'Explore acoustic office pods and office booths in Malaysia for private calls, focused work, and meetings. Ace Office Pods by Ace Workplace Solutions helps teams choose the right pod by use case, capacity, and project needs.'
};

const getProductSpec = (product, label) => product.specs.find((spec) => spec.label === label)?.value || 'See product page';
const officePodsItemListSchema = createPricingItemListSchema(
  '/office-pods',
  products.map((product) => ({
    name: product.name,
    path: `/pods/${product.slug}`,
    price: product.pdpPricing.baseConfigurations[0].price,
    image: product.heroImage
  }))
);

export default function OfficePodsPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Office Pods and Office Booths Malaysia | Ace Office Pods"
        description="Explore acoustic office pods and office booths in Malaysia for private calls, focused work, and meetings. Compare models by use case, capacity, and price."
        canonical={buildCanonical('/office-pods')}
        keywords={`${SEO_KEYWORDS_COMMON}, office booth Malaysia`}
        schemas={[organizationSchema, websiteSchema, officePodsCollectionSchema, officePodsItemListSchema, createBreadcrumbSchema(breadcrumbs), createFaqSchema('/office-pods', OFFICE_PODS_FAQ_ITEMS)]}
      />

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#68726f]">
          <Link to="/" className="hover:text-[#007653]">
            Home
          </Link>{' '}
          / <span>Office Pods</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#172126] md:text-[48px]">
          Office pods and office booths for calls, focus, and meetings
        </h1>
        <p className="mt-4 max-w-[70ch] text-[18px] leading-[1.6] text-[#59635f]">
          Ace Office Pods by Ace Workplace Solutions offers acoustic office pods and office booths in Malaysia for private calls, focused work, hybrid meetings, and small team discussions. In workplace planning, “office pods” and “office booths” are often used interchangeably for enclosed acoustic spaces designed for calls, focused work, and small meetings.
        </p>
        <p className="mt-3 max-w-[70ch] text-[16px] leading-[1.65] text-[#58616b]">
          Our office booth range includes compact phone-booth style pods, one-person focus pods, two-person discussion pods, and larger meeting pods for team collaboration. These are privacy-focused, sound-reducing solutions for open-plan offices, and acoustic results vary by model and placement.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-[1200px] gap-5 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        {products.map((product) => (
          <article key={product.slug} className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
            <img
              src={product.catalogImage || product.thumbImage}
              alt={`${product.name} office pod`}
              width="990"
              height="990"
              className={`mx-auto h-[180px] w-full object-contain object-bottom ${product.catalogImageClassName || ''}`}
              loading="lazy"
              decoding="async"
            />
            <h2 className="mt-4 text-[22px] font-semibold tracking-tight text-[#172126]">{product.name}</h2>
            <p className="mt-2 text-[15px] leading-[1.6] text-[#59635f]">{product.shortDesc}</p>
            <p className="mt-3 text-[14px] font-medium text-[#68726f]">{product.cardSupport}</p>
            <p className="mt-4 text-[16px] font-semibold text-[#007653]">
              {product.pricing.amount}{product.slug === 'ace-uno' ? ' (pod only)' : ''}
            </p>
            <Link
              to={`/pods/${product.slug}`}
              onClick={() =>
                pushDataLayerEvent('product_cta_click', {
                  cta_location: 'office_pods_page_card',
                  cta_text: `View ${product.name}`,
                  destination_url: `/pods/${product.slug}`,
                  product_name: product.name,
                  product_slug: product.slug
                })
              }
              className="mt-4 inline-flex text-[14px] font-semibold text-[#007653] underline-offset-4 hover:underline"
            >
              View {product.name}
            </Link>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-10 w-full max-w-[1200px] px-5 md:px-8">
        <div className="overflow-x-auto rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[25px] font-semibold tracking-tight text-[#172126]">Compare office pod models</h2>
          <p className="mt-2 max-w-[75ch] text-[16px] leading-[1.65] text-[#59635f]">
            Compare office pods, office booths, privacy pods, and work pods by capacity, intended use, acoustic performance, and starting price. A soundproof office pod should always be assessed against its stated test result and the surrounding office conditions.
          </p>
          <table className="mt-5 min-w-[760px] border-collapse text-left text-[14px] text-[#59635f]">
            <thead>
              <tr className="border-b border-[#e4dfd6] text-[13px] uppercase tracking-[0.04em] text-[#68726f]">
                <th className="px-2 py-3">Model</th>
                <th className="px-2 py-3">Capacity</th>
                <th className="px-2 py-3">Best for</th>
                <th className="px-2 py-3">Noise reduction</th>
                <th className="px-2 py-3">From price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.slug} className="border-b border-[#efebe3]">
                  <td className="px-2 py-3 font-semibold text-[#172126]"><Link to={`/pods/${product.slug}`} className="underline-offset-4 hover:underline">{product.name}</Link></td>
                  <td className="px-2 py-3">{getProductSpec(product, 'Capacity')}</td>
                  <td className="px-2 py-3">{getProductSpec(product, 'Best for')}</td>
                  <td className="px-2 py-3">{getProductSpec(product, 'Noise reduction')}</td>
                  <td className="px-2 py-3">{product.pricing.amount}{product.slug === 'ace-uno' ? ' (pod only)' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1200px] gap-5 px-5 md:grid-cols-2 md:px-8">
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[23px] font-semibold tracking-tight text-[#172126]">Office pod, office booth, phone pod, or phone booth?</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#59635f]">
            These terms overlap. An office pod is the broader category; an office booth or privacy pod usually describes a compact enclosed space; and a phone pod or phone booth is typically a one-person model for calls and focused work. Use the intended daily activity and team size to choose the right format.
          </p>
          <Link to="/office-phone-booth-malaysia" className="mt-4 inline-flex text-[15px] font-semibold text-[#007653] underline-offset-4 hover:underline">Compare office phone booth and phone pod options</Link>
        </article>
        <article className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
          <h2 className="text-[23px] font-semibold tracking-tight text-[#172126]">Proof for commercial comparison</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#59635f]">
            Ace Office Pods supports delivery, installation, and after-sales service in Malaysia. Review completed installations, published pricing, and model-specific acoustic information before finalising a shortlist.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-[15px] font-semibold text-[#007653]">
            <Link to="/portfolio" className="underline-offset-4 hover:underline">View completed installations</Link>
            <Link to="/articles/office-pod-brands-malaysia-comparison" className="underline-offset-4 hover:underline">Review supplier comparison criteria</Link>
          </div>
        </article>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-2 pt-8 md:px-8 md:pt-10">
        <h2 className="text-[26px] font-semibold tracking-tight text-[#172126]">Common questions about office pods and office booths</h2>
      </section>
      <section className="mx-auto grid w-full max-w-[1200px] gap-4 px-5 md:px-8">
        {OFFICE_PODS_FAQ_ITEMS.map((item) => (
          <article key={item.question} className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
            <h3 className="text-[22px] font-semibold tracking-tight text-[#172126]">{item.question}</h3>
            <p className="mt-3 text-[16px] leading-[1.65] text-[#59635f]">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1200px] rounded-[10px] border border-[#ddd8cf] bg-white px-5 py-8 md:px-8">
        <h2 className="text-[26px] font-semibold tracking-tight text-[#172126]">Need help choosing?</h2>
        <p className="mt-3 text-[16px] leading-[1.6] text-[#59635f]">
          Compare office pods and office booths by use case first: calls, focused work, or meetings. Then review installation, support, and final project pricing before you decide.
        </p>
        <div className="mt-5 flex flex-wrap gap-5 text-[15px] font-semibold text-[#007653]">
          <Link to="/meeting-pods-malaysia" className="underline-offset-4 hover:underline">
            Meeting pods in Malaysia
          </Link>
          <Link to="/office-phone-booth-malaysia" className="underline-offset-4 hover:underline">
            Office phone booth solutions
          </Link>
          <Link to="/compare-office-pods" className="underline-offset-4 hover:underline">
            Compare office pods
          </Link>
          <Link
            to="/pricing"
            onClick={() =>
              pushDataLayerEvent('pricing_cta_click', {
                cta_location: 'office_pods_page_help_section',
                cta_text: 'View office pod pricing',
                destination_url: '/pricing'
              })
            }
            className="underline-offset-4 hover:underline"
          >
            View office pod pricing
          </Link>
          <Link to="/installation-support" className="underline-offset-4 hover:underline">
            Learn about installation and support
          </Link>
          <Link to="/faq" className="underline-offset-4 hover:underline">
            Read office pod FAQs
          </Link>
          <Link to="/contact" className="underline-offset-4 hover:underline">
            Ask for a recommendation
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
