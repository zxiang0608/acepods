import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { locations } from '../data/locations';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, localBusinessSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Locations', path: '/locations' }
];

const locationsPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Office Pod Delivery Locations',
  url: buildCanonical('/locations'),
  description: 'Office pod delivery and installation locations supported by completed Ace Office Pods projects in Klang Valley.',
  isPartOf: {
    '@id': `${buildCanonical('/')}#website`
  },
  about: locations.map((location) => ({
    '@type': 'Place',
    name: location.city,
    url: buildCanonical(`/locations/${location.slug}`)
  }))
};

export default function LocationsPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Office Pod Delivery Locations | KL, Shah Alam, Subang Jaya, Penang & JB"
        description="Explore Ace Office Pods delivery and installation locations with completed projects in Kuala Lumpur, Shah Alam, and Subang Jaya, plus delivery to Penang and Johor Bahru."
        canonical={buildCanonical('/locations')}
        keywords={`${SEO_KEYWORDS_COMMON}, office pods Kuala Lumpur, office pods Shah Alam, office pods Subang Jaya, office pods Penang, office pods Johor Bahru`}
        schemas={[localBusinessSchema, websiteSchema, locationsPageSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1120px] px-5 pb-10 pt-10 md:px-8 md:pb-14 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Locations</span>
        </nav>
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#145b5f]">Project-backed service areas</p>
        <h1 className="mt-3 max-w-[18ch] text-[34px] font-bold leading-[1.08] tracking-tight text-[#14181c] md:text-[50px]">
          Office pod delivery locations
        </h1>
        <p className="mt-4 max-w-[72ch] text-[17px] leading-[1.65] text-[#454d56] md:text-[18px]">
          Explore areas where Ace Office Pods has completed customer installations. Each location page uses real project examples to show the pod
          models delivered and the local installation context.
        </p>
      </section>

      <section className="border-y border-[#d8d3c8] bg-white">
        <div className="mx-auto grid w-full max-w-[1120px] gap-0 px-5 md:grid-cols-3 md:px-8">
          {locations.map((location, index) => (
            <article
              key={location.slug}
              className={`py-7 md:px-6 md:py-9 ${index > 0 ? 'border-t border-[#d8d3c8] md:border-l md:border-t-0' : ''}`}
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#65707a]">
                {location.projects.length} completed {location.projects.length === 1 ? 'project' : 'projects'}
              </p>
              <h2 className="mt-2 text-[25px] font-semibold tracking-tight text-[#14181c]">{location.shortName}</h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#505860]">
                {location.projects.map((project) => project.company).join(', ')}
              </p>
              <Link
                to={`/locations/${location.slug}`}
                className="mt-5 inline-flex text-[14px] font-semibold text-[#145b5f] underline-offset-4 hover:underline"
              >
                View office pod projects in {location.city}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 py-12 md:grid-cols-2 md:px-8 md:py-16">
        <div>
          <h2 className="text-[27px] font-semibold tracking-tight text-[#14181c]">Delivery beyond these project locations</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">
            Ace Office Pods also supports enquiries across Klang Valley and West Malaysia. Locations listed here are the first dedicated pages
            because they are supported by completed customer installations and usable project photography.
          </p>
          <Link to="/office-pods-near-me" className="mt-5 inline-flex text-[14px] font-semibold text-[#145b5f] underline-offset-4 hover:underline">
            See broader service coverage
          </Link>
        </div>
        <div className="border-l-0 border-[#d8d3c8] md:border-l md:pl-8">
          <h2 className="text-[27px] font-semibold tracking-tight text-[#14181c]">Showroom in Klang</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">
            These are delivery and installation areas, not separate Ace branches. The physical showroom remains in Klang, Selangor, with viewing
            available by appointment.
          </p>
          <Link to="/contact" className="mt-5 inline-flex text-[14px] font-semibold text-[#145b5f] underline-offset-4 hover:underline">
            Book a showroom appointment
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
