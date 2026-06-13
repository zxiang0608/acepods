import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { locations, locationsBySlug } from '../data/locations';
import { pushDataLayerEvent } from '../lib/tracking';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import {
  buildAbsoluteUrl,
  buildCanonical,
  createBreadcrumbSchema,
  createFaqSchema,
  localBusinessSchema,
  websiteSchema
} from '../seo/schema';

const whatsappHref = 'https://wa.link/9umr4q';

const buildLocationSchema = (location) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: `Office pod delivery and installation in ${location.city}`,
  url: buildCanonical(`/locations/${location.slug}`),
  description: location.metaDescription,
  provider: {
    '@id': `${buildCanonical('/')}#organization`
  },
  areaServed: {
    '@type': 'City',
    name: location.city
  },
  serviceType: ['Office pod supply', 'Office pod delivery', 'Office pod installation'],
  image: location.projects.map((project) => buildAbsoluteUrl(project.image))
});

export default function LocationPage() {
  const { slug } = useParams();
  const location = locationsBySlug[slug];

  if (!location) {
    return <NotFoundPage />;
  }

  const path = `/locations/${location.slug}`;
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' },
    { name: location.city, path }
  ];
  const relatedLocations = locations.filter((item) => item.slug !== location.slug);

  return (
    <PageShell>
      <SeoMeta
        title={location.metaTitle}
        description={location.metaDescription}
        canonical={buildCanonical(path)}
        keywords={`${SEO_KEYWORDS_COMMON}, office pods ${location.city}, office phone booth ${location.city}, acoustic office pod ${location.city}`}
        ogImage={location.projects.length > 0 ? buildAbsoluteUrl(location.projects[0].image) : `${buildCanonical('/')}og-image.jpg`}
        schemas={[
          localBusinessSchema,
          websiteSchema,
          buildLocationSchema(location),
          createBreadcrumbSchema(breadcrumbs),
          createFaqSchema(path, location.faqs)
        ]}
      />

      <section className="mx-auto w-full max-w-[1120px] px-5 pb-10 pt-10 md:px-8 md:pb-14 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          /{' '}
          <Link to="/locations" className="hover:text-[#145b5f]">
            Locations
          </Link>{' '}
          / <span>{location.city}</span>
        </nav>
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#145b5f]">{location.eyebrow}</p>
        <h1 className="mt-3 max-w-[20ch] text-[34px] font-bold leading-[1.08] tracking-tight text-[#14181c] md:text-[52px]">
          {location.title}
        </h1>
        <p id={`location-${location.slug}-answer`} className="mt-4 max-w-[74ch] text-[17px] leading-[1.65] text-[#454d56] md:text-[18px]">{location.intro}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/pricing#all-pod-prices"
            onClick={() =>
              pushDataLayerEvent('pricing_cta_click', {
                cta_location: `location_${location.slug}_hero`,
                cta_text: 'View office pod prices',
                destination_url: '/pricing#all-pod-prices'
              })
            }
            className="inline-flex min-h-[48px] items-center justify-center rounded-[4px] bg-[#0b2038] px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#122f4e]"
          >
            View office pod prices
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              pushDataLayerEvent('whatsapp_click', {
                cta_location: `location_${location.slug}_hero`,
                cta_text: `Request a ${location.city} quote`,
                destination_url: whatsappHref,
                contact_method: 'whatsapp'
              })
            }
            className="inline-flex min-h-[48px] items-center justify-center rounded-[4px] border border-[#1f2937] px-5 py-3 text-[15px] font-semibold text-[#111827] transition-colors hover:border-[#145b5f] hover:text-[#145b5f]"
          >
            Request a {location.city} quote
          </a>
        </div>
      </section>

      <section className="border-y border-[#d8d3c8] bg-white">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-10 md:px-8 md:py-14">
          <h2 className="text-[28px] font-semibold tracking-tight text-[#14181c]">
            {location.projects.length > 0 ? `Completed office pod projects in ${location.city}` : `Office pod delivery and installation in ${location.city}`}
          </h2>
          <p className="mt-3 max-w-[72ch] text-[16px] leading-[1.65] text-[#4d555e]">{location.projectIntro}</p>

          {location.projects.length > 0 ? (
            <div className="mt-7 space-y-10">
              {location.projects.map((project, index) => (
                <article key={project.company} className="grid gap-5 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-8">
                  <div className={`overflow-hidden rounded-[4px] bg-[#e9e7e0] ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      className="aspect-[4/3] h-full w-full object-cover"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#65707a]">{project.area}</p>
                    <h3 className="mt-2 text-[25px] font-semibold tracking-tight text-[#14181c]">{project.company}</h3>
                    <p className="mt-2 text-[15px] font-semibold text-[#145b5f]">{project.model} installation</p>
                    <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">{project.summary}</p>
                    <Link
                      to={`/pods/${project.productSlug}`}
                      className="mt-5 inline-flex text-[14px] font-semibold text-[#145b5f] underline-offset-4 hover:underline"
                    >
                      View {project.model}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
          <Link to="/portfolio" className="mt-9 inline-flex text-[14px] font-semibold text-[#145b5f] underline-offset-4 hover:underline">
            View the full installation portfolio
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 py-12 md:grid-cols-2 md:px-8 md:py-16">
        <div>
          <h2 className="text-[27px] font-semibold tracking-tight text-[#14181c]">Delivery and installation planning</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">{location.serviceSummary}</p>
          <Link
            to="/installation-support"
            className="mt-5 inline-flex text-[14px] font-semibold text-[#145b5f] underline-offset-4 hover:underline"
          >
            See the delivery and installation process
          </Link>
        </div>
        <div className="border-l-0 border-[#d8d3c8] md:border-l md:pl-8">
          <h2 className="text-[27px] font-semibold tracking-tight text-[#14181c]">Choosing a pod for {location.city}</h2>
          <p className="mt-3 text-[16px] leading-[1.65] text-[#4d555e]">{location.localContext}</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-semibold">
            <Link to="/office-pods" className="text-[#145b5f] underline-offset-4 hover:underline">
              Compare pod models
            </Link>
            <Link to="/contact" className="text-[#145b5f] underline-offset-4 hover:underline">
              Book showroom viewing
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8d3c8] bg-[#ece9e1]">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-10 md:px-8 md:py-12">
          <h2 className="text-[26px] font-semibold tracking-tight text-[#14181c]">Common questions about office pods in {location.city}</h2>
          <div className="mt-5 grid gap-x-8 gap-y-6 md:grid-cols-2">
            {location.faqs.map((item) => (
              <article key={item.question} className="border-t border-[#c9c4b8] pt-4">
                <h3 className="text-[18px] font-semibold leading-[1.35] text-[#1d232a]">{item.question}</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-[#4d555e]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-5 py-12 md:px-8 md:py-14">
        <h2 className="text-[24px] font-semibold tracking-tight text-[#14181c]">Other project locations</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedLocations.map((item) => (
            <Link
              key={item.slug}
              to={`/locations/${item.slug}`}
              className="inline-flex min-h-[44px] items-center border border-[#cfcac0] bg-white px-4 py-2 text-[14px] font-semibold text-[#30363d] hover:border-[#145b5f] hover:text-[#145b5f]"
            >
              Office pods in {item.city}
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
