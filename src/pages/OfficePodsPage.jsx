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

export default function OfficePodsPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Office Pods and Office Booths Malaysia | Ace Office Pods"
        description="Explore acoustic office pods and office booths in Malaysia for private calls, focused work, and meetings. Ace Office Pods by Ace Workplace Solutions helps teams choose the right pod by use case, capacity, and project needs."
        canonical={buildCanonical('/office-pods')}
        keywords={`${SEO_KEYWORDS_COMMON}, office booth Malaysia`}
        schemas={[organizationSchema, websiteSchema, officePodsCollectionSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Office Pods</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#14181c] md:text-[48px]">
          Office pods and office booths for calls, focus, and meetings
        </h1>
        <p className="mt-4 max-w-[70ch] text-[18px] leading-[1.6] text-[#454d56]">
          Ace Office Pods by Ace Workplace Solutions offers acoustic office pods and office booths in Malaysia for private calls, focused work, hybrid meetings, and small team discussions. Choose your office pod by capacity, use case, and project requirements.
        </p>
        <p className="mt-3 max-w-[70ch] text-[16px] leading-[1.65] text-[#58616b]">
          Our office booth range includes compact call pods, one-person focus booths, two-person discussion pods, and larger meeting pods for offices that need quiet space without building new rooms.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-[1200px] gap-5 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        {products.map((product) => (
          <article key={product.slug} className="rounded-[10px] border border-[#ddd8cf] bg-white p-5">
            <img src={product.thumbImage} alt={`${product.name} office pod`} className="mx-auto h-[180px] w-auto object-contain" />
            <h2 className="mt-4 text-[22px] font-semibold tracking-tight text-[#1d232a]">{product.name}</h2>
            <p className="mt-2 text-[15px] leading-[1.6] text-[#4d555e]">{product.shortDesc}</p>
            <p className="mt-3 text-[14px] font-medium text-[#626a72]">{product.cardSupport}</p>
            <p className="mt-4 text-[16px] font-semibold text-[#145b5f]">{product.pricing.amount}</p>
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
              className="mt-4 inline-flex text-[14px] font-semibold text-[#145b5f] underline-offset-4 hover:underline"
            >
              View {product.name}
            </Link>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1200px] rounded-[10px] border border-[#ddd8cf] bg-white px-5 py-8 md:px-8">
        <h2 className="text-[26px] font-semibold tracking-tight text-[#14181c]">Need help choosing?</h2>
        <p className="mt-3 text-[16px] leading-[1.6] text-[#4d555e]">
          Compare office pods and office booths by use case first: calls, focused work, or meetings. Then review installation, support, and final project pricing before you decide.
        </p>
        <div className="mt-5 flex flex-wrap gap-5 text-[15px] font-semibold text-[#145b5f]">
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
        </div>
      </section>
    </PageShell>
  );
}
