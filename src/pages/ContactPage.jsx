import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { pushDataLayerEvent } from '../lib/tracking';
import {
  SEO_BRAND_EMAIL,
  SEO_BRAND_PHONE,
  SEO_BRAND_POSTAL_CODE,
  SEO_BRAND_SHOWROOM_LOCALITY,
  SEO_BRAND_SHOWROOM_REGION,
  SEO_BRAND_STREET_ADDRESS,
  SEO_KEYWORDS_COMMON
} from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, localBusinessSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' }
];

const whatsappHref = 'https://wa.link/9umr4q';
const phoneHref = `tel:${SEO_BRAND_PHONE}`;
const emailHref = `mailto:${SEO_BRAND_EMAIL}`;

const contactWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Ace Office Pods',
  url: buildCanonical('/contact'),
  description: 'Contact Ace Office Pods by Ace Workplace Solutions for office pod sales enquiries by WhatsApp, phone, or email.',
  isPartOf: {
    '@id': `${buildCanonical('/')}#website`
  },
  about: {
    '@id': `${buildCanonical('/')}#organization`
  },
  mainEntity: {
    '@id': `${buildCanonical('/')}#organization`
  }
};

export default function ContactPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Contact Ace Office Pods | WhatsApp, Email, and Sales Support"
        description="Contact Ace Office Pods by Ace Workplace Solutions for office pod sales enquiries by WhatsApp, phone, or email."
        canonical={buildCanonical('/contact')}
        keywords={`${SEO_KEYWORDS_COMMON}, contact Ace Office Pods, office pod enquiry`}
        schemas={[localBusinessSchema, websiteSchema, contactWebPageSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[1100px] px-5 pb-14 pt-10 md:px-8 md:pb-20 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Contact</span>
        </nav>

        <h1 className="max-w-[20ch] text-[34px] font-bold leading-[1.08] tracking-tight text-[#14181c] md:text-[52px]">Contact Ace Office Pods</h1>
        <p className="mt-4 max-w-[72ch] text-[16px] leading-[1.6] text-[#4d555e] md:text-[18px]">
          Speak with our team about office pod models, project scope, and commercial enquiries.
        </p>

        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              pushDataLayerEvent('whatsapp_click', {
                cta_location: 'contact_page',
                cta_text: 'Chat with sales',
                destination_url: whatsappHref,
                contact_method: 'whatsapp'
              })
            }
            className="rounded-[12px] border border-[#d6ddd9] bg-white px-5 py-5 transition-colors hover:border-[#145b5f]"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6a7683]">WhatsApp</p>
            <p className="mt-2 text-[17px] font-semibold text-[#14181c]">Chat with sales</p>
          </a>

          <a
            href={phoneHref}
            onClick={() =>
              pushDataLayerEvent('phone_click', {
                cta_location: 'contact_page',
                cta_text: 'Phone',
                destination_url: phoneHref,
                contact_method: 'phone'
              })
            }
            className="rounded-[12px] border border-[#d6ddd9] bg-white px-5 py-5 transition-colors hover:border-[#145b5f]"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6a7683]">Phone</p>
            <p className="mt-2 text-[17px] font-semibold text-[#14181c]">{SEO_BRAND_PHONE}</p>
          </a>

          <a
            href={emailHref}
            onClick={() =>
              pushDataLayerEvent('email_click', {
                cta_location: 'contact_page',
                cta_text: 'Email',
                destination_url: emailHref,
                contact_method: 'email'
              })
            }
            className="rounded-[12px] border border-[#d6ddd9] bg-white px-5 py-5 transition-colors hover:border-[#145b5f]"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6a7683]">Email</p>
            <p className="mt-2 text-[17px] font-semibold text-[#14181c] break-all">{SEO_BRAND_EMAIL}</p>
          </a>
        </div>

        <section className="mt-8 grid gap-5 border-y border-[#d8d3c8] py-7 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#145b5f]">Showroom</p>
            <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-[#14181c]">
              {SEO_BRAND_SHOWROOM_LOCALITY}, {SEO_BRAND_SHOWROOM_REGION}
            </h2>
            <p className="mt-2 text-[15px] font-semibold leading-[1.55] text-[#1d232a]">
              {SEO_BRAND_STREET_ADDRESS}, {SEO_BRAND_POSTAL_CODE} {SEO_BRAND_SHOWROOM_LOCALITY}, {SEO_BRAND_SHOWROOM_REGION}
            </p>
            <p className="mt-2 text-[14px] text-[#4d555e]">
              <span className="font-semibold text-[#14181c]">Hours:</span> Mon–Fri, 9am–6pm (showroom by appointment)
            </p>
            <p className="mt-3 text-[15px] leading-[1.65] text-[#4d555e]">
              Showroom viewing is available by appointment for buyers who want to compare office pod size, finish, comfort, and acoustic performance
              before confirming a quote.
            </p>
            <div className="mt-4 overflow-hidden rounded-[8px] border border-[#d8d3c8]">
              <iframe
                title="Ace Office Pods showroom location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.8!2d101.44187!3d3.07523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMDQnMzAuOCJOIDEwMcKwMjYnMzAuNyJF!5e0!3m2!1sen!2smy!4v1"
                width="100%"
                height="280"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#145b5f]">Service areas</p>
            <p className="mt-2 text-[15px] leading-[1.65] text-[#4d555e]">
              Ace Office Pods supports office pod enquiries, delivery planning, and installation coordination across Klang Valley and West Malaysia.
              Common project areas include Klang, Shah Alam, Petaling Jaya, Subang Jaya, Kuala Lumpur, Puchong, Cyberjaya, and Putrajaya.
            </p>
          </div>
        </section>
      </section>
    </PageShell>
  );
}
