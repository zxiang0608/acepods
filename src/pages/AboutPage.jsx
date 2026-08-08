import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import {
  SEO_BRAND_EMAIL,
  SEO_BRAND_IDENTIFIER,
  SEO_BRAND_LEGAL,
  SEO_BRAND_PHONE
} from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' }
];

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Ace Office Pods',
  url: buildCanonical('/about'),
  description: 'Company, service-area, showroom, and product-information details for Ace Office Pods by Ace Workplace Solutions.',
  dateModified: '2026-08-08',
  isPartOf: { '@id': 'https://aceofficepods.com/#website' },
  about: { '@id': 'https://aceofficepods.com/#organization' }
};

export default function AboutPage() {
  return (
    <PageShell>
      <SeoMeta
        title="About Ace Office Pods | Ace Workplace Solutions"
        description="Learn about Ace Office Pods by Ace Workplace Solutions, our Klang showroom, West Malaysia service area, and approach to clear product information."
        canonical={buildCanonical('/about')}
        schemas={[organizationSchema, websiteSchema, aboutPageSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[900px] px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-14">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#68726f]">
          <Link to="/" className="hover:text-[#007653]">Home</Link>{' '}
          / <span>About</span>
        </nav>

        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#007653]">Company information</p>
        <h1 className="mt-3 max-w-[760px] text-[36px] font-bold leading-[1.08] tracking-tight text-[#172126] md:text-[50px]">
          About Ace Office Pods
        </h1>
        <p className="mt-5 max-w-[760px] text-[18px] leading-[1.65] text-[#4f5c59]">
          Ace Office Pods is operated by {SEO_BRAND_LEGAL}, a Malaysian supplier of enclosed office pods for calls, focused work, interviews, and small meetings.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ['Registered business', `${SEO_BRAND_LEGAL}\nRegistration no. ${SEO_BRAND_IDENTIFIER}`],
            ['Showroom', 'Klang, Selangor\nVisits by appointment'],
            ['Service area', 'Klang Valley and West Malaysia\nProject scope confirmed by quotation']
          ].map(([label, value]) => (
            <div key={label} className="border-t border-[#cfd5d2] pt-4">
              <h2 className="text-[14px] font-semibold text-[#172126]">{label}</h2>
              <p className="mt-2 whitespace-pre-line text-[15px] leading-[1.6] text-[#68726f]">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 space-y-10 text-[16px] leading-[1.75] text-[#172126]">
          <section>
            <h2 className="text-[25px] font-semibold tracking-tight">What we supply</h2>
            <p className="mt-3">
              The Ace range covers one-person call and focus pods, two-person pods, and meeting pods for small teams. Product pages state the intended use, starting price, and available model-specific specifications so buyers can compare the range before requesting a quotation.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold text-[#007653]">
              <Link to="/office-pods" className="underline-offset-4 hover:underline">View the pod range</Link>
              <Link to="/pricing" className="underline-offset-4 hover:underline">See starting prices</Link>
              <Link to="/compare-office-pods" className="underline-offset-4 hover:underline">Compare models</Link>
            </div>
          </section>

          <section>
            <h2 className="text-[25px] font-semibold tracking-tight">How we handle product claims</h2>
            <p className="mt-3">
              Acoustic performance and other technical claims are treated as model-specific. A claim shown for one pod is not automatically applied to another. Where supporting test documentation has not been recorded, the website labels the claim as unverified instead of presenting it as independently certified.
            </p>
            <p className="mt-3">
              Prices shown online are starting or stated-scope prices. Delivery, installation, access constraints, optional items, and outstation work are confirmed in the written quotation.
            </p>
            <Link to="/editorial-policy" className="mt-4 inline-block text-[14px] font-semibold text-[#007653] underline-offset-4 hover:underline">
              Read our information and corrections policy
            </Link>
          </section>

          <section>
            <h2 className="text-[25px] font-semibold tracking-tight">Speak with Ace</h2>
            <p className="mt-3">
              For current specifications, showroom appointments, site-access questions, or a project quotation, contact the Ace team directly.
            </p>
            <address className="mt-4 not-italic text-[15px] leading-[1.8] text-[#4f5c59]">
              <div><a href={`mailto:${SEO_BRAND_EMAIL}`} className="text-[#007653] underline-offset-4 hover:underline">{SEO_BRAND_EMAIL}</a></div>
              <div><a href={`tel:${SEO_BRAND_PHONE}`} className="text-[#007653] underline-offset-4 hover:underline">{SEO_BRAND_PHONE}</a></div>
              <div>Jalan Gopeng, Kawasan 18, 41400 Klang, Selangor</div>
            </address>
            <Link to="/contact" className="mt-5 inline-flex min-h-[46px] items-center bg-[#007653] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#005f43]">
              Contact Ace Office Pods
            </Link>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
