import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Star } from 'lucide-react';
import SeoMeta from '../components/SeoMeta';
import PageShell from '../components/PageShell';
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
    desc: 'From enquiry to viewing and assessment, we align pod fit with your workspace needs.',
    tp1: {
      title: 'Needs & Viewing',
      desc: 'Model options are matched to space, team size, and budget.'
    },
    tp2: {
      title: 'Site Assessment',
      desc: 'Access routes and placement zones are reviewed upfront.'
    }
  },
  {
    num: '2',
    phase: 'Quotation & Confirmation',
    summary: 'Confirm order',
    desc: 'Once specifications are finalized, we issue a clear quote and confirm the order.',
    tp1: {
      title: 'Transparent Quotation',
      desc: 'A detailed cost and scope breakdown is provided.'
    },
    tp2: {
      title: 'Deposit & Kickoff',
      desc: 'A 50% deposit starts production and project scheduling.'
    }
  },
  {
    num: '3',
    phase: 'Production & Scheduling',
    summary: 'Build and plan',
    desc: 'Pods enter production while delivery timing is coordinated with your team.',
    tp1: {
      title: 'Quality Manufacturing',
      desc: 'Units are built to the approved project specification.'
    },
    tp2: {
      title: 'Flexible Coordination',
      desc: 'Delivery windows are arranged to reduce office disruption.'
    }
  },
  {
    num: '4',
    phase: 'Delivery & Installation',
    summary: 'Install safely',
    desc: 'On the confirmed date, our team delivers and assembles the pod on site.',
    tp1: {
      title: 'Professional Assembly',
      desc: 'Setup is handled by trained installation personnel.'
    },
    tp2: {
      title: 'Efficient Execution',
      desc: 'Installation is completed according to the planned timeline.'
    }
  },
  {
    num: '5',
    phase: 'Handover & Enjoyment',
    summary: 'Install and hand over',
    desc: 'We walk through pod use so your team can start confidently from day one.',
    tp1: {
      title: 'Feature Walkthrough',
      desc: 'Ventilation, lighting, and usage guidance are explained clearly.'
    },
    tp2: {
      title: 'Ongoing Support',
      desc: 'After-sales support remains available after handover.'
    }
  }
];

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
    answer: 'We run a clear flow: consultation, site checks, scheduling, delivery, setup, and handover. Each stage is confirmed before moving to the next.'
  },
  {
    question: 'What happens during the site visit?',
    answer: 'We verify access routes, lift or doorway clearance, placement, and office constraints. This prevents delivery-day surprises.'
  },
  {
    question: 'How long does delivery take after deposit?',
    answer: 'Lead time starts after the 50% deposit is received. Most projects run in about 3–6 working weeks based on model, quantity, and site scope.'
  },
  {
    question: 'Will installation disrupt office operations?',
    answer: 'We plan timing and access before install day to reduce disruption. Scheduling is coordinated around normal office operations where possible.'
  },
  {
    question: 'What support is available after handover?',
    answer: 'After handover, you have warranty-related support, usage guidance, and follow-up assistance. A clear contact path is provided for post-install help.'
  }
];

export default function InstallationSupportPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const whatsappHref = 'https://wa.me/600000000000?text=Hi%20AcePods%2C%20I%20want%20to%20discuss%20an%20office%20pod%20installation%20project.';
  const emailHref = 'mailto:hello@acepods.my?subject=AcePods%20installation%20project%20consultation';

  return (
    <PageShell>
      <SeoMeta
        title="Office Pod Delivery, Installation and Support | AcePods"
        description="See what to expect from site review to handover with clear lead times, installation planning, and after-sales support for office pod projects."
        canonical={buildCanonical('/installation-support')}
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs), createFaqSchema('/installation-support', INSTALLATION_FAQ_ITEMS)]}
      />

      <section className="mx-auto w-full max-w-[1180px] px-5 pb-8 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#65707a]">
          <Link to="/" className="hover:text-[#145b5f]">
            Home
          </Link>{' '}
          / <span>Installation and Support</span>
        </nav>

        <h1 className="max-w-[21ch] text-[34px] font-bold leading-[1.08] tracking-tight text-[#14181c] md:text-[54px]">
          Clear delivery, installation, and after-sales support
        </h1>
      </section>

      <section id="process" className="mx-auto w-full max-w-[1180px] px-5 py-8 md:px-8 md:py-12">
        <div className="rounded-[16px] border border-[#cec8bc] bg-[#f5f3ee] p-6 md:p-8">
          <h2 className="text-[30px] font-bold tracking-tight text-[#14181c] md:text-[42px]">How it works</h2>
          <p className="mt-2 text-[15px] text-[#4c5560] md:text-[16px]">A step-by-step timeline from consultation to handover.</p>

          <div className="relative mt-8 overflow-hidden">
            <div className="pointer-events-none absolute bottom-6 left-[42px] top-6 hidden opacity-45 md:block" style={{ borderLeft: '7px dotted #145b5f' }} />

            <span className="pointer-events-none absolute left-[42px] top-4 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#145b5f] bg-[#f6f4ef] md:inline-flex">
              <Building2 className="h-6 w-6 text-[#145b5f]" aria-hidden="true" />
            </span>
            <span className="pointer-events-none absolute bottom-0 left-[42px] hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#145b5f] bg-[#f6f4ef] md:inline-flex">
              <Star className="h-6 w-6 text-[#145b5f]" aria-hidden="true" />
            </span>

            <ol className="space-y-8 pt-10 md:space-y-10 md:pb-10 md:pt-14">
              {processJourneySteps.map((step, idx) => (
                <li key={step.phase} className="group flex flex-col items-start md:flex-row md:items-center">
                  <div className="relative mb-6 flex w-full items-center md:mb-0 md:w-[320px] md:justify-end md:pr-10">
                    <span className="mr-4 text-[72px] font-black leading-none text-[#145b5f] md:mr-6 md:text-[92px]">{step.num}</span>
                    <p className="max-w-[170px] text-[22px] font-bold leading-[1.12] tracking-tight text-[#145b5f] md:text-[30px]">{step.summary}</p>
                  </div>

                  <div className="w-full pl-0 md:flex-1 md:pl-14">
                    <article className="rounded-[16px] border border-black/5 bg-white p-5 shadow-sm transition-all duration-300 group-hover:shadow-md md:p-7">
                      <h3 className="text-[26px] font-bold leading-[1.1] tracking-tight text-[#145b5f] md:text-[34px]">Phase: {step.phase}</h3>
                      <p className="mt-3 text-[15px] leading-[1.5] text-[#4A5D58] md:text-[16px]">{step.desc}</p>

                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                        <div className="relative border-l-2 pl-4" style={{ borderColor: '#145b5f66' }}>
                          <p className="flex items-center gap-2 text-[18px] font-bold leading-[1.1] text-[#145b5f] md:text-[20px]">
                            <span className="h-2 w-2 rounded-full bg-[#145b5f]" />
                            {step.tp1.title}
                          </p>
                          <p className="mt-2 text-[13px] leading-[1.45] text-[#4A5D58] md:text-[14px]">{step.tp1.desc}</p>
                        </div>

                        <div className="relative border-l-2 pl-4" style={{ borderColor: '#145b5f66' }}>
                          <p className="flex items-center gap-2 text-[18px] font-bold leading-[1.1] text-[#145b5f] md:text-[20px]">
                            <span className="h-2 w-2 rounded-full bg-[#145b5f]" />
                            {step.tp2.title}
                          </p>
                          <p className="mt-2 text-[13px] leading-[1.45] text-[#4A5D58] md:text-[14px]">{step.tp2.desc}</p>
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
          <h2 className="text-[30px] font-bold tracking-tight text-[#14181c] md:text-[36px]">What we check before delivery</h2>
          <div className="mt-5 grid items-start gap-5 md:grid-cols-[1.12fr_0.88fr] md:gap-10">
            <div>
              <h3 className="text-[17px] font-semibold text-[#1d232a]">Before we deliver</h3>
              <ul className="mt-3 grid gap-2.5 md:grid-cols-2">
                {preInstallationChecks.map((check) => (
                  <li key={check} className="flex items-center gap-2 rounded-[8px] border border-[#ece8e0] bg-[#f8f7f4] px-3 py-2.5 text-[13px] font-semibold text-[#2f3740]">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#145b5f] text-[11px] text-white">✓</span>
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="lead-time" className="md:pl-4">
              <h3 className="text-[17px] font-semibold text-[#1d232a]">Timing you can expect</h3>
              <ul className="mt-3 space-y-3 text-[14px] leading-[1.5] text-[#39424c]">
                {timingExpectations.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#145b5f]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 text-[14px] text-[#4d555e]">Warranty and support details are written clearly in your quote.</div>
          <div className="mt-2 border-b border-[#e6e1d9]" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-5 py-8 md:px-8">
        <h2 className="text-[28px] font-bold tracking-tight text-[#14181c] md:text-[34px]">Installation and support FAQ</h2>
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
                    <span className="text-[18px] font-semibold tracking-tight text-[#1d232a] md:text-[21px]">{item.question}</span>
                    <span className="text-[20px] text-[#5f6670]">{isOpen ? '−' : '+'}</span>
                  </button>
                </h3>
                {isOpen && (
                  <p id={`installation-faq-${index}`} className="max-w-[78ch] pb-4 text-[15px] leading-[1.6] text-[#4d555e] md:text-[16px]">
                    {item.answer}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section id="book-viewing" className="mx-auto w-full max-w-[1180px] px-5 pb-14 pt-2 md:px-8 md:pb-20">
        <div className="rounded-[14px] border border-[#bfd1cb] bg-[#e6f0ed] px-6 py-9 text-left md:px-8">
          <h2 className="text-[32px] font-bold leading-[1.15] tracking-tight text-[#14181c] md:text-[40px]">Discuss your office pod project with our team</h2>
          <p className="mt-3 max-w-[72ch] text-[16px] leading-[1.5] text-[#47505a] md:text-[17px]">
            Book a consultation to confirm model fit, site readiness, and installation timing before order confirmation.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-[8px] bg-[#145b5f] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#104c4f]"
            >
              WhatsApp Us
            </a>
            <a href={emailHref} className="text-[15px] font-semibold text-[#145b5f] underline-offset-4 hover:underline">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
