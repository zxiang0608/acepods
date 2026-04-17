import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' }
];

const portfolioImageModules = import.meta.glob('../../assets/Portfolio/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
});

const portfolioImages = Object.entries(portfolioImageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

export default function PortfolioPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Office Pod Portfolio Malaysia | Past Installations and Project Work | AcePods"
        description="Explore AcePods portfolio projects across Malaysia. See past office pod installations for calls, focused work, and meetings with practical commercial outcomes."
        canonical={buildCanonical('/portfolio')}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-6 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Portfolio</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.08] tracking-tight text-[#14181c] md:text-[48px]">Past office pod projects across Malaysia</h1>
      </section>

      <section className="mx-auto grid w-full max-w-[1200px] gap-5 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-3">
        {portfolioImages.map((image, index) => (
          <article key={image} className="overflow-hidden rounded-[10px] border border-[#ddd8cf] bg-white">
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#eceae3]">
              <img src={image} alt={`AcePods portfolio project ${index + 1}`} className="h-full w-full object-cover" loading="lazy" />
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
