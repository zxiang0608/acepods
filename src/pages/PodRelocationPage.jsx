import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Truck } from 'lucide-react';
import SeoMeta from '../components/SeoMeta';
import PageShell from '../components/PageShell';
import { pushDataLayerEvent } from '../lib/tracking';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { SEO_BASE_URL } from '../seo/constants';
import { buildCanonical, createBreadcrumbSchema, createFaqSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Pod Relocation', path: '/pod-relocation' }
];

const relocationJourneySteps = [
  {
    num: '1',
    phase: 'Site Assessment & Quote',
    summary: 'Assess & quote',
    desc: 'We start by reviewing your current pod location, the new site, and the distance between them. Access at both ends — lift size, doorway clearance, and stairs — is checked before a written quote is issued.',
    tp1: {
      title: 'Two-Site Review',
      desc: 'Access, distance, and placement are confirmed at both the pickup and destination locations.'
    },
    tp2: {
      title: 'Fixed Quote',
      desc: 'Relocation cost is confirmed in writing based on distance, access, and pod model before work begins.'
    }
  },
  {
    num: '2',
    phase: 'Dismantling',
    summary: 'Dismantle safely',
    desc: 'The Ace installation team carefully dismantles the pod at its current location, protecting panels, glazing, door hardware, and acoustic seals during removal so nothing is damaged in transit.',
    tp1: {
      title: 'Trained Team',
      desc: 'The same team that installs new pods handles disassembly, so panel fit and fasteners are treated correctly.'
    },
    tp2: {
      title: 'Component Protection',
      desc: 'Glass, door mechanisms, and acoustic seals are protected for transport.'
    }
  },
  {
    num: '3',
    phase: 'Transport & Reinstallation',
    summary: 'Move & rebuild',
    desc: 'Components are transported to the new site and reassembled following the original specification. Reinstallation follows the same process as a new pod installation, so fit and finish stay consistent.',
    tp1: {
      title: 'Careful Transport',
      desc: 'Panels and hardware are transported and handled the same way as new production units.'
    },
    tp2: {
      title: 'Reassembly to Spec',
      desc: 'The pod is rebuilt following its original configuration, finish, and add-on selections.'
    }
  },
  {
    num: '4',
    phase: 'Inspection & Handover',
    summary: 'Inspect & hand over',
    desc: 'Once reassembled, the team inspects panel fit and fasteners, glass and door alignment, acoustic seals, ventilation, lighting, socket and power operation, and stability before handing the pod back to your team.',
    tp1: {
      title: 'Full Post-Move Check',
      desc: 'Panel fit, door alignment, seals, ventilation, and power are checked before handover.'
    },
    tp2: {
      title: 'Warranty Confirmed',
      desc: 'Any warranty implications of the move are confirmed in writing as part of the relocation quote.'
    }
  }
];

const relocationHowToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How office pod relocation works',
  description: 'The step-by-step process for relocating an Ace Office Pod to a new office location, from site assessment to post-move inspection.',
  url: `${SEO_BASE_URL}/pod-relocation`,
  step: relocationJourneySteps.map((s, i) => ({
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

const preRelocationChecks = [
  'Access at the pickup location',
  'Access at the new location',
  'Distance and transport route',
  'Panel, glass, and door protection',
  'Final placement at the new site',
  'Best timing for your team'
];

const costFactors = [
  'Distance between the current and new location.',
  'Access conditions at both sites — lift, stairs, and loading bay.',
  'Pod model and size.',
  'Whether the job is a full relocation or dismantle-only.'
];

const RELOCATION_FAQ_ITEMS = [
  {
    question: 'Can an office pod be relocated after installation?',
    answer: 'Yes. Ace Office Pods are modular and can be dismantled, transported, and reinstalled at a new location by our installation team. Relocation cost depends on distance and access conditions at both the pickup and destination sites.'
  },
  {
    question: 'Does moving my pod affect the warranty?',
    answer: 'Relocation should be carried out by an experienced team, and any warranty implications are confirmed in writing as part of the relocation quote before work begins. Contact us before moving a pod yourself to avoid affecting coverage.'
  },
  {
    question: 'How much does office pod relocation cost?',
    answer: 'Relocation is quoted per project rather than a fixed price, since cost depends on distance between sites, access conditions, pod model and size, and whether the job is a full relocation or dismantle-only. Contact the team for a written quote after a two-site review.'
  },
  {
    question: 'How long does a pod relocation take?',
    answer: 'Timing depends on distance, access, and pod size. Most single-pod relocations are completed within one to a few working days once the move date is confirmed, similar in scope to a new installation.'
  },
  {
    question: 'What is checked after a pod is moved?',
    answer: 'After reinstallation, the team inspects panel fit and fasteners, glass and door alignment, acoustic seals, ventilation, lighting, socket and power operation, and stability before handover.'
  },
  {
    question: 'Can I move a pod myself?',
    answer: 'Some models, such as the Ace Flex Duo, include hidden heavy-duty wheels for convenient short-distance moves within the same floor. For a move between offices or floors, dismantling and reinstallation by the Ace team is recommended to avoid affecting panel fit, seals, or warranty coverage.'
  }
];

export default function PodRelocationPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [openStepIndex, setOpenStepIndex] = useState(0);
  const whatsappHref = 'https://wa.link/9umr4q';
  const emailHref = 'mailto:sales@aceofficepods.com?subject=Ace%20Office%20Pods%20relocation%20enquiry';

  return (
    <PageShell>
      <SeoMeta
        title="Office Pod Relocation Service Malaysia | Ace Office Pods"
        description="Moving offices? See how Ace relocates office pods — site assessment, dismantling, transport, reinstallation, and post-move inspection, with a written quote."
        canonical={buildCanonical('/pod-relocation')}
        keywords={`${SEO_KEYWORDS_COMMON}, office pod relocation, move office pod, relocate meeting pod`}
        schemas={[organizationSchema, websiteSchema, relocationHowToSchema, createBreadcrumbSchema(breadcrumbs), createFaqSchema('/pod-relocation', RELOCATION_FAQ_ITEMS)]}
      />

      <section className="mx-auto w-full max-w-[1180px] px-5 pb-8 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#68726f]">
          <Link to="/" className="hover:text-[#007653]">
            Home
          </Link>{' '}
          / <span>Pod Relocation</span>
        </nav>

        <h1 className="max-w-[34ch] whitespace-normal text-[34px] font-bold leading-[1.08] tracking-tight text-[#172126] md:max-w-none md:whitespace-nowrap md:text-[54px]">
          Office pod relocation, done properly
        </h1>
        <p className="mt-5 max-w-[72ch] text-[17px] leading-[1.65] text-[#59635f] md:text-[19px]">
          Moving offices doesn't mean leaving your pod behind. Every Ace Office Pod is modular by design, and our installation team can dismantle, transport, and reinstall it at your new location — flexibility that permanent built rooms don't offer. Here's what to expect, what's checked before handover, and how relocation is quoted.
        </p>
        <div className="mt-6 flex flex-wrap gap-5 text-[14px] font-semibold text-[#007653]">
          <a href="#process" className="underline-offset-4 hover:underline">How it works</a>
          <a href="#what-we-check" className="underline-offset-4 hover:underline">What we check</a>
          <a href="#pricing" className="underline-offset-4 hover:underline">Pricing</a>
          <a href="#book-viewing" className="underline-offset-4 hover:underline">Get a quote</a>
        </div>
      </section>

      <section id="process" className="mx-auto w-full max-w-[1180px] px-5 py-8 md:px-8 md:py-12">
        <div className="rounded-[16px] border border-[#cec8bc] bg-[#eeece7] p-6 md:p-8">
          <h2 className="text-[30px] font-bold tracking-tight text-[#172126] md:text-[42px]">How it works</h2>
          <p className="mt-2 text-[15px] text-[#59635f] md:text-[16px]">A step-by-step timeline from site assessment to handover at your new location.</p>

          <div className="relative mt-8 overflow-hidden">
            <div className="pointer-events-none absolute bottom-6 left-[42px] top-6 hidden opacity-45 md:block" style={{ borderLeft: '7px dotted #145b5f' }} />

            <span className="pointer-events-none absolute left-[42px] top-4 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#00855a] bg-[#eeece7] md:inline-flex">
              <MapPin className="h-6 w-6 text-[#007653]" aria-hidden="true" />
            </span>
            <span className="pointer-events-none absolute bottom-0 left-[42px] hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#00855a] bg-[#eeece7] md:inline-flex">
              <Truck className="h-6 w-6 text-[#007653]" aria-hidden="true" />
            </span>

            <ol className="space-y-8 pt-10 md:space-y-10 md:pb-10 md:pt-14">
              {relocationJourneySteps.map((step, idx) => (
                <li key={step.phase} className="group flex flex-col items-start md:flex-row md:items-center">
                  <div className="relative mb-6 flex w-full items-center md:mb-0 md:w-[320px] md:justify-end md:pr-10">
                    <span className="mr-4 text-[72px] font-black leading-none text-[#007653] md:mr-6 md:text-[92px]">{step.num}</span>
                    <p className="max-w-[170px] text-[22px] font-bold leading-[1.12] tracking-tight text-[#007653] md:text-[30px]">{step.summary}</p>
                  </div>

                  <div className="w-full pl-0 md:flex-1 md:pl-14">
                    <article className="rounded-[16px] border border-black/5 bg-white p-5 shadow-sm transition-all duration-300 group-hover:shadow-md md:p-7">
                      <button
                        type="button"
                        onClick={() => setOpenStepIndex(openStepIndex === idx ? null : idx)}
                        aria-expanded={openStepIndex === idx}
                        aria-controls={`relocation-step-${idx}`}
                        className="flex w-full items-center justify-between gap-3 text-left md:pointer-events-none md:cursor-default"
                      >
                        <h3 className="text-[26px] font-bold leading-[1.1] tracking-tight text-[#007653] md:text-[34px]">Phase: {step.phase}</h3>
                        <span className="shrink-0 text-[22px] leading-none text-[#68726f] md:hidden">{openStepIndex === idx ? '−' : '+'}</span>
                      </button>

                      <div id={`relocation-step-${idx}`} className={`${openStepIndex === idx ? 'block' : 'hidden'} md:block`}>
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
                      </div>
                    </article>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="what-we-check" className="mx-auto w-full max-w-[1180px] px-5 pb-4 md:px-8">
        <div className="rounded-[12px] border border-[#d7d1c7] bg-white p-6 md:p-7">
          <h2 className="text-[30px] font-bold tracking-tight text-[#172126] md:text-[36px]">What we check before and after a move</h2>
          <div className="mt-5 grid items-start gap-5 md:grid-cols-[1.12fr_0.88fr] md:gap-10">
            <div>
              <h3 className="text-[17px] font-semibold text-[#172126]">Before we relocate</h3>
              <ul className="mt-3 grid gap-2.5 md:grid-cols-2">
                {preRelocationChecks.map((check) => (
                  <li key={check} className="flex items-center gap-2 rounded-[8px] border border-[#ece8e0] bg-[#f7f6f2] px-3 py-2.5 text-[13px] font-semibold text-[#172126]">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#00855a] text-[11px] text-white">✓</span>
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="pricing" className="md:pl-4">
              <h3 className="text-[17px] font-semibold text-[#172126]">What affects the quote</h3>
              <ul className="mt-3 space-y-3 text-[14px] leading-[1.5] text-[#172126]">
                {costFactors.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00855a]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 text-[14px] text-[#59635f]">Relocation is quoted per project after a review of both locations — no fixed price applies. Some models, like the Ace Flex Duo, have hidden wheels for short self-moves within the same floor.</div>
          <div className="mt-2 border-b border-[#e6e1d9]" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-5 py-8 md:px-8">
        <h2 className="text-[28px] font-bold tracking-tight text-[#172126] md:text-[34px]">Pod relocation FAQ</h2>
        <div className="mt-4 border-t border-[#ddd8cf]">
          {RELOCATION_FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <article key={item.question} className="border-b border-[#e4dfd5]">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`relocation-faq-${index}`}
                  >
                    <span className="text-[18px] font-semibold tracking-tight text-[#172126] md:text-[21px]">{item.question}</span>
                    <span className="text-[20px] text-[#68726f]">{isOpen ? '−' : '+'}</span>
                  </button>
                </h3>
                {isOpen && (
                  <p id={`relocation-faq-${index}`} className="max-w-[78ch] pb-4 text-[15px] leading-[1.6] text-[#59635f] md:text-[16px]">
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
          <div className="mb-4 inline-flex rounded-full border border-[#9db6b0] bg-white/70 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#007653]">
            Pod relocation
          </div>
          <h2 className="text-[32px] font-bold leading-[1.15] tracking-tight text-[#172126] md:text-[40px]">Get a relocation quote for your pod</h2>
          <p className="mt-3 max-w-[72ch] text-[16px] leading-[1.5] text-[#59635f] md:text-[17px]">
            Share your current and new office locations and we'll confirm access requirements and a written quote before any work begins.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                pushDataLayerEvent('whatsapp_click', {
                  cta_location: 'pod_relocation_page',
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
                  cta_location: 'pod_relocation_page',
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
