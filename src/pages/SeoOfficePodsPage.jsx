import React from 'react';
import { Link } from 'react-router-dom';
import SeoMeta from '../components/SeoMeta';
import SeoPageShell from '../components/SeoPageShell';
import { products } from '../data/products';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/seo' },
  { name: 'Office Pods', path: '/seo/office-pods' }
];

export default function SeoOfficePodsPage() {
  return (
    <SeoPageShell>
      <SeoMeta
        title="Office Pods Malaysia for Calls, Focus and Meetings | AcePods"
        description="Explore acoustic office pods for calls, focused work, and team meetings. Compare pod types by use case and choose the right fit for your office."
        canonical={buildCanonical('/seo/office-pods')}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-10 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/seo" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Office Pods</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#14181c] md:text-[48px]">
          Office pods for calls, focus, and meetings
        </h1>
        <p className="mt-4 max-w-[70ch] text-[18px] leading-[1.6] text-[#454d56]">
          AcePods offers acoustic office pods for private calls, focused work, and small team meetings. Choose your pod by capacity, use case, and project requirements.
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
            <Link to={`/pods/${product.slug}`} className="mt-4 inline-flex text-[14px] font-semibold text-[#145b5f] underline-offset-4 hover:underline">
              View {product.name}
            </Link>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1200px] rounded-[10px] border border-[#ddd8cf] bg-white px-5 py-8 md:px-8">
        <h2 className="text-[26px] font-semibold tracking-tight text-[#14181c]">Need help choosing?</h2>
        <p className="mt-3 text-[16px] leading-[1.6] text-[#4d555e]">
          Compare office pods by use case first: calls, focused work, or meetings. Then review installation, support, and final project pricing before you decide.
        </p>
        <div className="mt-5 flex flex-wrap gap-5 text-[15px] font-semibold text-[#145b5f]">
          <Link to="/seo/compare-office-pods" className="underline-offset-4 hover:underline">
            Compare office pods
          </Link>
          <Link to="/seo/pricing" className="underline-offset-4 hover:underline">
            View office pod pricing
          </Link>
          <Link to="/seo/installation-support" className="underline-offset-4 hover:underline">
            Learn about installation and support
          </Link>
        </div>
      </section>
    </SeoPageShell>
  );
}
