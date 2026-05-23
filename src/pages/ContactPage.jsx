import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { pushDataLayerEvent } from '../lib/tracking';
import { SEO_BRAND_EMAIL, SEO_BRAND_PHONE, SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, serviceOrganizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' }
];

const whatsappHref = 'https://wa.link/9umr4q';
const phoneHref = `tel:${SEO_BRAND_PHONE}`;
const emailHref = `mailto:${SEO_BRAND_EMAIL}`;

export default function ContactPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Contact Ace Office Pods | WhatsApp, Email, and Sales Support"
        description="Contact Ace Office Pods by Ace Workplace Solutions for office pod sales enquiries by WhatsApp, phone, or email."
        canonical={buildCanonical('/contact')}
        keywords={`${SEO_KEYWORDS_COMMON}, contact Ace Office Pods, office pod enquiry`}
        schemas={[serviceOrganizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
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
      </section>
    </PageShell>
  );
}
