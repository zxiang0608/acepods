import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Star } from 'lucide-react';
import SeoMeta from '../components/SeoMeta';
import PageShell from '../components/PageShell';
import { pushDataLayerEvent } from '../lib/tracking';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { SEO_BASE_URL } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, createFaqSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Installation and Support', path: '/installation-support' }
];

const processJourneySteps = [
  {
    num: '1',
    phase: 'Consultation & Assessment',
    summary: 'Choose your pod',
    desc: 'We start by understanding your team\'s needs — call frequency, meeting patterns, headcount, and available floor space. Model options are reviewed against your layout, and a site visit confirms lift access, doorway clearance, and placement zones before anything is ordered.',
    tp1: {
      title: 'Needs & Viewing',
      desc: 'Pod model, size, and quantity are matched to your space, team workflow, and budget.'
    },
    tp2: {
      title: 'Site Assessment',
      desc: 'Lift dimensions, delivery routes, and preferred pod placement are confirmed to avoid surprises on installation day.'
    }
  },
  {
    num: '2',
    phase: 'Quotation & Confirmation',
    summary: 'Confirm order',
    desc: 'Once the model selection and site requirements are agreed, we issue a written quotation with a clear scope — pod model, quantity, delivery, installation, and any add-ons. A 50% deposit confirms the order and triggers production.',
    tp1: {
      title: 'Transparent Quotation',
      desc: 'Every line item is listed clearly. No hidden fees. Warranty and support terms are included in writing.'
    },
    tp2: {
      title: 'Deposit & Kickoff',
      desc: 'A 50% deposit starts production and locks in your delivery window. The balance is collected before or at handover.'
    }
  },
  {
    num: '3',
    phase: 'Order Preparation & Scheduling',
    summary: 'Confirm and plan',
    desc: 'The approved specification, commercial terms, delivery requirements, and installation window are confirmed against the current project schedule.',
    tp1: {
      title: 'Specification Check',
      desc: 'The confirmed project specification records finish colour, interior configuration, and approved add-on selections.'
    },
    tp2: {
      title: 'Flexible Scheduling',
      desc: 'Available delivery and installation windows depend on the project schedule, access rules, and agreed scope.'
    }
  },
  {
    num: '4',
    phase: 'Delivery & Installation',
    summary: 'Install safely',
    desc: 'On the confirmed date, the installation scope follows the agreed access route, placement plan, building requirements, and power-point requirements.',
    tp1: {
      title: 'Professional Assembly',
      desc: 'The quotation identifies the installation provider, scope, expected duration, and handover requirements.'
    },
    tp2: {
      title: 'Minimal Disruption',
      desc: 'Any effect on adjacent work areas and the required protection or access controls are confirmed before delivery.'
    }
  },
  {
    num: '5',
    phase: 'Handover & Enjoyment',
    summary: 'Install and hand over',
    desc: 'Once assembly is complete, the team walks through pod operation with whoever will manage or use it — ventilation, lighting, power, door mechanism, and any optional features. A clear contact path to the Ace team is established for post-handover questions.',
    tp1: {
      title: 'Feature Walkthrough',
      desc: 'Ventilation controls, lighting, power access, door seals, and any add-on features are demonstrated and explained.'
    },
    tp2: {
      title: 'Ongoing Support',
      desc: 'After-sales support for warranty and operational questions is available through the same team that managed your project.'
    }
  }
];

const installationHowToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How office pod installation works',
  description: 'The step-by-step process for purchasing and installing an Ace Office Pod, from initial consultation to post-delivery support.',
  url: `${SEO_BASE_URL}/installation-support`,
  totalTime: 'P6W',
  step: processJourneySteps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.phase,
    text: s.desc,
    itemListElement: [
      { '@type': 'HowToDirection', text: s.tp1.desc },
      { '@type': 'HowToDirection', text: s.tp2.desc }
    ]
  }))
};

const preInstallationChecks = [
  'Access path into your office',
  'Lift and doorway size',
  'Final pod location',
  'Fit with your office layout',
  'Pod size and quantity',
  'Best install timing for your team'
];

const timingExpectations = [
  'Lead time starts after your 50% deposit.',
  'Most orders take 3 to 6 weeks.',
  'Timing changes based on model, size, and quantity.',
  'We confirm your install date once your pod is ready.'
];

const INSTALLATION_FAQ_ITEMS = [
  {
    question: 'How does office pod installation work?',
    answer: 'Office pod installation follows a five-stage process: consultation and site assessment, quotation and order confirmation, production and scheduling, delivery and on-site assembly, and handover with usage walkthrough. Each stage is confirmed before moving to the next to avoid surprises on installation day.'
  },
  {
    question: 'What happens during the site visit?',
    answer: 'During the site visit, the team verifies access routes into the building, lift and doorway clearance for the largest pod dimension, the intended placement location on the office floor, and any constraints that may affect installation timing or method. This step prevents delivery-day complications and confirms the project can proceed as planned.'
  },
  {
    question: 'How long does delivery take after deposit?',
    answer: 'Delivery timing depends on the model, quantity, current schedule, site access, and agreed installation scope. The applicable commercial terms and confirmed delivery window are stated in the quotation.'
  },
  {
    question: 'Will installation disrupt office operations?',
    answer: 'Installation timing and sequencing depend on the model, quantity, access route, building rules, and approved scope. The expected duration and any operational restrictions are confirmed before delivery.'
  },
  {
    question: 'What support is available after handover?',
    answer: 'The quotation and handover documents should state the applicable warranty, usage guidance, post-installation support scope, and contact path. Confirm these terms in writing before ordering.'
  }
];

export default function InstallationSupportPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const whatsappHref = 'https://wa.link/9umr4q';
  const emailHref = 'mailto:sales@aceofficepods.com?subject=Ace%20Office%20Pods%20installation%20project%20consultation';

  return (
    <PageShell>
      <SeoMeta
        title="Office Pod Delivery, Installation and Support | Ace Office Pods"
        description="See what to expect from site review to handover with clear lead times, installation planning, and after-sales support for office pod projects."
        canonical={buildCanonical('/installation-support')}
        keywords={`${SEO_KEYWORDS_COMMON}, office pod installation, office booth delivery`}
        schemas={[organizationSchema, websiteSchema, installationHowToSchema, createBreadcrumbSchema(breadcrumbs), createFaqSchema('/installation-support', INSTALLATION_FAQ_ITEMS)]}
      />

      <section className="mx-auto w-full max-w-[1180px] px-5 pb-8 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#68726f]">
          <Link to="/" className="hover:text-[#007653]">
            Home
          </Link>{' '}
          / <span>Installation and Support</span>
        </nav>

        <h1 className="max-w-[21ch] text-[34px] font-bold leading-[1.08] tracking-tight text-[#172126] md:text-[54px]">
          Clear delivery, installation, and after-sales support
        </h1>
        <p className="mt-5 max-w-[72ch] text-[17px] leading-[1.65] text-[#59635f] md:text-[19px]">
          Every project is scoped from first contact to handover. Delivery timing, site access, installation duration, commercial terms, and after-sales support depend on the approved quotation and should be confirmed in writing before ordering.
        </p>
        <div className="mt-6 flex flex-wrap gap-5 text-[14px] font-semibold text-[#007653]">
          <a href="#process" className="underline-offset-4 hover:underline">How it works</a>
          <a href="#pre-installation" className="underline-offset-4 hover:underline">What we check before delivery</a>
          <a href="#lead-time" className="underline-offset-4 hover:underline">Lead times</a>
          <a href="#book-viewing" className="underline-offset-4 hover:underline">Book a consultation</a>
        </div>
      </section>

      <section id="process" className="mx-auto w-full max-w-[1180px] px-5 py-8 md:px-8 md:py-12">
        <div className="rounded-[16px] border border-[#cec8bc] bg-[#eeece7] p-6 md:p-8">
          <h2 className="text-[30px] font-bold tracking-tight text-[#172126] md:text-[42px]">How it works</h2>
          <p className="mt-2 text-[15px] text-[#59635f] md:text-[16px]">A step-by-step timeline from consultation to handover.</p>

          <div className="relative mt-8 overflow-hidden">
            <div className="pointer-events-none absolute bottom-6 left-[42px] top-6 hidden opacity-45 md:block" style={{ borderLeft: '7px dotted #145b5f' }} />

            <span className="pointer-events-none absolute left-[42px] top-4 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#00855a] bg-[#eeece7] md:inline-flex">
              <Building2 className="h-6 w-6 text-[#007653]" aria-hidden="true" />
            </span>
            <span className="pointer-events-none absolute bottom-0 left-[42px] hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#00855a] bg-[#eeece7] md:inline-flex">
              <Star className="h-6 w-6 text-[#007653]" aria-hidden="true" />
            </span>

            <ol className="space-y-8 pt-10 md:space-y-10 md:pb-10 md:pt-14">
              {processJourneySteps.map((step, idx) => (
                <li key={step.phase} className="group flex flex-col items-start md:flex-row md:items-center">
                  <div className="relative mb-6 flex w-full items-center md:mb-0 md:w-[320px] md:justify-end md:pr-10">
                    <span className="mr-4 text-[72px] font-black leading-none text-[#007653] md:mr-6 md:text-[92px]">{step.num}</span>
                    <p className="max-w-[170px] text-[22px] font-bold leading-[1.12] tracking-tight text-[#007653] md:text-[30px]">{step.summary}</p>
                  </div>

                  <div className="w-full pl-0 md:flex-1 md:pl-14">
                    <article className="rounded-[16px] border border-black/5 bg-white p-5 shadow-sm transition-all duration-300 group-hover:shadow-md md:p-7">
                      <h3 className="text-[26px] font-bold leading-[1.1] tracking-tight text-[#007653] md:text-[34px]">Phase: {step.phase}</h3>
                      <p className="mt-3 text-[15px] leading-[1.5] text-[#59635f] md:text-[16px]">{step.desc}</p>

                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                        <div className="relative border-l-2 pl-4" style={{ borderColor: '#145b5f66' }}>
                          <p className="flex items-center gap-2 text-[18px] font-bold leading-[1.1] text-[#007653] md:text-[20px]">
                            <span className="h-2 w-2 rounded-full bg-[#00855a]" />
                            {step.tp1.title}
                          </p>
                          <p className="mt-2 text-[13px] leading-[1.45] text-[#59635f] md:text-[14px]">{step.tp1.desc}</p>
                        </div>

                        <div className="relative border-l-2 pl-4" style={{ borderColor: '#145b5f66' }}>
                          <p className="flex items-center gap-2 text-[18px] font-bold leading-[1.1] text-[#007653] md:text-[20px]">
                            <span className="h-2 w-2 rounded-full bg-[#00855a]" />
                            {step.tp2.title}
                          </p>
                          <p className="mt-2 text-[13px] leading-[1.45] text-[#59635f] md:text-[14px]">{step.tp2.desc}</p>
                        </div>
                      </div>
                    </article>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="pre-installation" className="mx-auto w-full max-w-[1180px] px-5 pb-4 md:px-8">
        <div className="rounded-[12px] border border-[#d7d1c7] bg-white p-6 md:p-7">
          <h2 className="text-[30px] font-bold tracking-tight text-[#172126] md:text-[36px]">What we check before delivery</h2>
          <div className="mt-5 grid items-start gap-5 md:grid-cols-[1.12fr_0.88fr] md:gap-10">
            <div>
              <h3 className="text-[17px] font-semibold text-[#172126]">Before we deliver</h3>
              <ul className="mt-3 grid gap-2.5 md:grid-cols-2">
                {preInstallationChecks.map((check) => (
                  <li key={check} className="flex items-center gap-2 rounded-[8px] border border-[#ece8e0] bg-[#f7f6f2] px-3 py-2.5 text-[13px] font-semibold text-[#172126]">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#00855a] text-[11px] text-white">✓</span>
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="lead-time" className="md:pl-4">
              <h3 className="text-[17px] font-semibold text-[#172126]">Timing you can expect</h3>
              <ul className="mt-3 space-y-3 text-[14px] leading-[1.5] text-[#172126]">
                {timingExpectations.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00855a]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 text-[14px] text-[#59635f]">Warranty and support details are written clearly in your quote.</div>
          <div className="mt-2 border-b border-[#e6e1d9]" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-5 py-8 md:px-8">
        <h2 className="text-[28px] font-bold tracking-tight text-[#172126] md:text-[34px]">Installation and support FAQ</h2>
        <div className="mt-4 border-t border-[#ddd8cf]">
          {INSTALLATION_FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <article key={item.question} className="border-b border-[#e4dfd5]">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`installation-faq-${index}`}
                  >
                    <span className="text-[18px] font-semibold tracking-tight text-[#172126] md:text-[21px]">{item.question}</span>
                    <span className="text-[20px] text-[#68726f]">{isOpen ? '−' : '+'}</span>
                  </button>
                </h3>
                {isOpen && (
                  <p id={`installation-faq-${index}`} className="max-w-[78ch] pb-4 text-[15px] leading-[1.6] text-[#59635f] md:text-[16px]">
                    {item.answer}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section id="book-viewing" className="mx-auto w-full max-w-[1180px] px-5 pb-14 pt-2 md:px-8 md:pb-20">
        <div className="rounded-[14px] border border-[#bfd1cb] bg-[#e9e7e1] px-6 py-9 text-left md:px-8">
          <div id="after-sales-support" className="mb-4 inline-flex rounded-full border border-[#9db6b0] bg-white/70 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#007653]">
            After-sales support
          </div>
          <h2 className="text-[32px] font-bold leading-[1.15] tracking-tight text-[#172126] md:text-[40px]">Discuss your office pod project with our team</h2>
          <p className="mt-3 max-w-[72ch] text-[16px] leading-[1.5] text-[#59635f] md:text-[17px]">
            Book a consultation to confirm model fit, site readiness, and installation timing before order confirmation.
          </p>
          <p className="mt-2 text-[14px] text-[#007653]">
            Moving offices? See how <Link to="/pod-relocation" className="font-semibold underline-offset-4 hover:underline">pod relocation</Link> works.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                pushDataLayerEvent('whatsapp_click', {
                  cta_location: 'installation_support_page',
                  cta_text: 'WhatsApp Us',
                  destination_url: whatsappHref,
                  contact_method: 'whatsapp'
                })
              }
              className="inline-flex rounded-[8px] bg-[#00855a] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#172126]"
            >
              WhatsApp Us
            </a>
            <a
              href={emailHref}
              onClick={() =>
                pushDataLayerEvent('email_click', {
                  cta_location: 'installation_support_page',
                  cta_text: 'Email Us',
                  destination_url: emailHref,
                  contact_method: 'email'
                })
              }
              className="text-[#007653] underline-offset-4 hover:underline"
            >
              <span className="block text-[15px] font-semibold">Email Us</span>
              <span className="block text-[13px] font-medium text-[#007653]">sales@aceofficepods.com</span>
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
