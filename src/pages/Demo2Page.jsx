import React from 'react';
import { Link } from 'react-router-dom';
import acePodsLogo from '../../Logos/ace pods logo.png';
import acePodsHero from '../../assets/hero-pods.webp';
import acePodsHeroAvif from '../../assets/hero-pods.avif';
import officeOneImage from '../../assets/Office-1.webp';
import officeTwoImage from '../../assets/office-2.webp';
import officeThreeImage from '../../assets/office-3.webp';
import comparePriceImage from '../../assets/quotation.jpg';
import podsInstallationImage from '../../assets/pods-installation.webp';
import deliveryPodsImage from '../../assets/delivery-pods.webp';
import parkerLogo from '../../assets/parker-logo.png';
import cmacgmLogo from '../../assets/cmacgm-logo.svg';
import alphabetLogo from '../../assets/alphabet-logo.png';
import rightwillLogo from '../../assets/rightwill-logo.png';
import everllenceLogo from '../../assets/everllence-logo.png';
import taylorsUniversityLogo from '../../assets/taylorsuniversity.svg';
import amorePacificLogo from '../../assets/amorepacific-logo.svg';
import brenntagLogo from '../../assets/brenntag-logo.webp';
import { smartPodsMenuItems } from '../components/smartPodsMenuData';
import { products } from '../data/products';
import { HOME_FAQ_ITEMS } from '../seo/constants';
import InstagramFeed from '../components/InstagramFeed';
import SiteFooter from '../components/SiteFooter';
import CurrencySwitcher from '../components/CurrencySwitcher';

const demoProducts = smartPodsMenuItems.map((item) => {
  const product = products.find((entry) => entry.slug === item.to.replace('/pods/', ''));
  return {
    ...item,
    price: product?.pricing?.amount || '',
    support: product?.cardSupport || ''
  };
});

const proofPoints = [
  'Premium acoustic performance',
  '−27 dB(A) ±5 dB certified',
  'Same team. Start to finish.'
];

const trustedLogos = [
  { name: 'Parker Hannifin', image: parkerLogo, className: 'scale-[0.88]' },
  { name: 'CMA CGM', image: cmacgmLogo, className: 'scale-[0.95]' },
  { name: 'Alphabet Capital', image: alphabetLogo, className: 'scale-[0.9]' },
  { name: 'Rightwill', image: rightwillLogo, className: 'scale-[0.86]' },
  { name: "Taylor's University", image: taylorsUniversityLogo, className: 'scale-105' },
  { name: 'Everllence', image: everllenceLogo, className: 'scale-[0.95]' },
  { name: 'Amore Pacific', image: amorePacificLogo, className: 'scale-[0.9]' },
  { name: 'Brenntag', image: brenntagLogo, className: 'scale-[0.9]' }
];

const renovationPoints = [
  {
    number: '01',
    title: 'Less disruption across the office.',
    description: 'Make space for private work without turning the wider workplace into an active building site.',
    image: officeOneImage,
    alt: 'Single office pod in an open workspace'
  },
  {
    number: '02',
    title: 'No need to build new rooms.',
    description: 'Pods create usable enclosed space without taking the same route as fixed-room construction.',
    image: officeTwoImage,
    alt: 'Meeting pod added to an office floor without renovation'
  },
  {
    number: '03',
    title: 'More flexibility as needs change.',
    description: 'They offer a lower-friction path for teams that want private space while keeping future layout choices open.',
    image: officeThreeImage,
    alt: 'Larger office pod setup for changing team requirements'
  }
];

const workplaceConsequences = [
  ['01', 'Focus gets broken', 'Every interruption resets the work people were trying to finish. A quiet place protects the time they need to think.'],
  ['02', 'Private conversations spill out', 'HR, client, and management conversations should not depend on who happens to be nearby.'],
  ['03', 'Meeting rooms become bottlenecks', 'A quick call should not mean blocking a room intended for a team meeting.']
];

const workTypes = [
  {
    label: 'Calls',
    title: 'Private calls, without taking a meeting room.',
    description: 'For phone calls, video calls, interviews, and confidential one-to-one conversations.',
    products: demoProducts.slice(0, 2),
    to: '/office-phone-booth-malaysia'
  },
  {
    label: 'Focus',
    title: 'A quieter place to get work done.',
    description: 'For longer individual work sessions and hybrid work that needs more room to settle in.',
    products: demoProducts.slice(2, 4),
    to: '/office-pods'
  },
  {
    label: 'Meetings',
    title: 'Small meetings, without the room hunt.',
    description: 'For two-to-six people who need a private place to discuss, decide, or present.',
    products: demoProducts.slice(4, 6),
    to: '/meeting-pods-malaysia'
  }
];

const buyingConfidence = [
  {
    title: 'See the full project price upfront',
    description: 'You can compare properly when you see more than just the headline number.',
    image: comparePriceImage,
    alt: 'Office pod pricing and commercial detail'
  },
  {
    title: 'Installation matters more than most buyers expect',
    description: 'Access, placement, and coordination all affect how straightforward the project feels.',
    image: podsInstallationImage,
    alt: 'Office pod installation and site setup'
  },
  {
    title: 'Local support that is actually local',
    description: 'When something needs attention after installation, you reach the team in Selangor that built the pod — no distributor chain, no overseas wait.',
    image: deliveryPodsImage,
    alt: 'Office pod support and post-delivery use'
  }
];

const reassurancePoints = [
  ['Made in Malaysia', 'Built in Selangor, with a showroom you can visit before you decide.'],
  ['−27 dB(A) ±5 dB certified', 'Measured acoustic performance — not a vague soundproofing claim.'],
  ['180+ pods installed', 'Delivered across Malaysia for MNCs, SMEs, and corporate teams.'],
  ['Same team, start to finish', 'One local team for production, installation, and after-sales support.']
];

export default function Demo2Page() {
  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#172126]" style={{ fontFamily: '"Instrument Sans", ui-sans-serif, system-ui, sans-serif' }}>
      <header className="border-b border-[#d9d6ce] bg-[#fbfaf7] px-5 md:px-12">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between">
          <Link to="/" aria-label="Ace Office Pods home">
            <img src={acePodsLogo} alt="Ace Pods" width="150" height="70" className="h-[48px] w-auto" />
          </Link>
          <div className="hidden items-center gap-5 text-[13px] font-medium text-[#273238] lg:flex xl:gap-7">
            <Link to="/office-pods">Office Pods</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/office-chairs">Office Chairs</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/installation-support">Installation &amp; Support</Link>
            <Link to="/pod-relocation">Pod Relocation</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div className="flex items-center gap-3">
            <CurrencySwitcher className="hidden xl:flex" />
            <Link to="/contact" className="bg-[#00855a] px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#006e4a] md:px-5">
              Contact us
            </Link>
          </div>
        </div>
      </header>

      <section className="px-5 pt-5 md:px-12 md:pt-7">
        <div className="mx-auto max-w-[1440px] overflow-hidden bg-[#172126]">
          <div className="relative min-h-[580px] overflow-hidden md:min-h-[620px]">
            <picture>
              <source srcSet={acePodsHeroAvif} type="image/avif" />
              <img
                src={acePodsHero}
                alt="Acoustic office pods in a modern workplace"
                width="1672"
                height="941"
                className="absolute inset-0 h-full w-full object-cover object-[50%_42%] brightness-[1.05] contrast-[0.94] saturate-[0.82]"
                fetchpriority="high"
              />
            </picture>

            <div className="relative flex min-h-[580px] items-center px-7 md:min-h-[620px] md:px-12 lg:px-16">
              <div className="relative isolate max-w-[535px] py-10 text-white md:py-12">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-8 -left-9 -top-8 -z-10 w-[calc(100%+5.5rem)] bg-[linear-gradient(90deg,rgba(12,22,21,0.68)_0%,rgba(12,22,21,0.60)_70%,rgba(12,22,21,0)_100%)]"
                />
                <h1 className="max-w-[15ch] text-[51px] font-semibold leading-[0.98] tracking-[-0.055em] md:text-[64px]">
                  Less noise.<br />More work done.
                </h1>
                <p className="mt-8 max-w-[33ch] text-[18px] font-normal leading-[1.5] text-white/92 md:text-[20px]">
                  Give your people the quiet to think clearly, speak privately, and do their best work.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link to="/contact" className="bg-[#00855a] px-7 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#006e4a]">
                    Visit the Showroom
                  </Link>
                  <Link to="/pricing#all-pod-prices" className="border border-white/70 px-7 py-3.5 text-[16px] font-medium text-white transition-colors hover:bg-white/10">
                    Get Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/12 bg-[#132126] px-6 py-5 text-white md:px-12">
            <p className="mx-auto max-w-[1120px] text-center text-[14px] font-medium leading-relaxed tracking-[0.01em] text-white/92 md:text-[15px]">
              {proofPoints.map((point, index) => (
                <React.Fragment key={point}>
                  {index > 0 && <span className="hidden px-2.5 text-white/45 md:inline" aria-hidden="true">·</span>}
                  <span className="block py-0.5 md:inline md:py-0">{point}</span>
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 md:px-12 md:pb-20">
        <div className="mx-auto max-w-[1440px] border-x border-b border-[#ddd8cf] bg-[#eeece7] px-5 py-7 md:px-7 md:py-9">
          <div className="mb-7 flex items-end justify-between md:mb-9">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#67736f]">The Ace range</p>
              <h2 className="mt-1 text-[24px] font-semibold tracking-[-0.025em] text-[#1c2529] md:text-[30px]">Six pods. One considered system.</h2>
            </div>
            <Link to="/office-pods" className="hidden text-[14px] font-semibold text-[#006e4a] md:block">Compare all models →</Link>
          </div>

          <div className="grid grid-cols-2 border-l border-t border-[#d7d2ca] md:grid-cols-3">
            {demoProducts.map((product) => (
              <Link
                key={product.to}
                to={product.to}
                className="group flex min-w-0 flex-col border-b border-r border-[#d7d2ca] px-4 py-6 transition-colors hover:bg-white/45 md:px-9 md:py-9"
              >
                <div className="flex h-[142px] items-center justify-center md:h-[205px]">
                  <img
                    src={product.image}
                    alt={product.title}
                    width="220"
                    height="220"
                    className={`h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.04] ${product.imageClassName || ''}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-5 border-t border-[#d9d5ce] pt-3.5 md:mt-7">
                  <p className="text-[15px] font-semibold tracking-[-0.01em] text-[#172126] md:text-[17px]">{product.title}</p>
                  <p className="mt-1 min-h-[34px] text-[12px] leading-[1.4] text-[#65706f] md:text-[13px]">{product.support}</p>
                  <p className="mt-4 text-[12px] font-semibold text-[#007653] md:text-[13px]">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#dfdbd3] bg-[#f7f6f2] px-5 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[#68726f]">Trusted by local and international companies</p>
          <div className="mt-9 grid grid-cols-2 border-l border-t border-[#e4e0d9] sm:grid-cols-4">
            {trustedLogos.map((logo) => (
              <div key={logo.name} className="flex h-[92px] items-center justify-center border-b border-r border-[#e4e0d9] px-5 md:h-[112px] md:px-8">
                <img src={logo.image} alt={logo.name} className={`h-[46px] w-full object-contain ${logo.className}`} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="max-w-[660px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#68726f]">Pods instead of renovation</p>
            <h2 className="mt-3 text-[32px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#172126] md:text-[48px]">Add private space without building new rooms.</h2>
            <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.6] text-[#53605d] md:text-[18px]">A more practical way to create quiet, usable office space for calls, focus, and meetings.</p>
          </div>
          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-7">
            {renovationPoints.map((point) => (
              <article key={point.number}>
                <div className="aspect-[4/3] overflow-hidden bg-[#ebe9e3]">
                  <img src={point.image} alt={point.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="mt-5 border-t border-[#a8aaa4] pt-5">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[#007653]">{point.number}</span>
                  <h3 className="mt-3 text-[21px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#172126]">{point.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-[#59635f]">{point.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e9e7e1] px-5 py-16 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="max-w-[720px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#66736d]">When quiet space is missing</p>
            <h2 className="mt-3 text-[32px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#172126] md:text-[46px]">The cost is more than noise.</h2>
            <p className="mt-5 text-[16px] leading-[1.6] text-[#53605d]">The everyday friction is small enough to be ignored—until it starts to affect how well people work.</p>
          </div>
          <div className="mt-12 grid border-l border-t border-[#c9c6bf] md:mt-16 md:grid-cols-3">
            {workplaceConsequences.map(([number, title, description]) => (
              <article key={title} className="border-b border-r border-[#c9c6bf] px-5 py-7 md:px-8 md:py-9">
                <span className="text-[11px] font-semibold tracking-[0.12em] text-[#007653]">{number}</span>
                <h3 className="mt-10 text-[22px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#172126]">{title}</h3>
                <p className="mt-4 text-[15px] leading-[1.6] text-[#59635f]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#172126] px-5 py-16 text-white md:px-12 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-[650px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a9c8ba]">Choose by work type</p>
              <h2 className="mt-3 text-[32px] font-semibold leading-[1.04] tracking-[-0.04em] md:text-[48px]">Start with what your people need to do.</h2>
            </div>
            <Link to="/compare-office-pods" className="text-[14px] font-semibold text-[#a9d8c2]">Compare all models →</Link>
          </div>
          <div className="mt-12 grid border-l border-t border-white/15 md:grid-cols-3">
            {workTypes.map((type) => (
              <article key={type.label} className="border-b border-r border-white/15 p-5 md:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a9d8c2]">{type.label}</p>
                <h3 className="mt-4 max-w-[16ch] text-[24px] font-semibold leading-[1.12] tracking-[-0.025em] md:text-[28px]">{type.title}</h3>
                <p className="mt-4 min-h-[66px] text-[15px] leading-[1.6] text-white/65">{type.description}</p>
                <div className="mt-8 grid grid-cols-2 border-l border-t border-white/15">
                  {type.products.map((product) => (
                    <Link key={product.to} to={product.to} className="group/item border-b border-r border-white/15 p-3 transition-colors hover:bg-white/[0.05]">
                      <div className="flex h-[130px] items-center justify-center bg-[#eeece7] md:h-[150px]">
                        <img src={product.image} alt={product.title} className={`h-full w-full object-contain mix-blend-multiply p-3 transition-transform duration-300 group-hover/item:scale-[1.04] ${product.imageClassName || ''}`} loading="lazy" decoding="async" />
                      </div>
                      <p className="mt-3 text-[14px] font-semibold text-white">{product.title}</p>
                    </Link>
                  ))}
                </div>
                <Link to={type.to} className="mt-7 inline-flex text-[14px] font-semibold text-[#9bd7b9]">See options for {type.label.toLowerCase()} →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f6f2] px-5 py-16 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="border-t border-[#aeb3ac] pt-6 md:pt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#68726f]">Beyond the product</p>
            <h2 className="mt-3 text-[32px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#172126] md:text-[48px]">Why choose Ace Pods</h2>
            <p className="mt-5 max-w-[68ch] text-[16px] leading-[1.6] text-[#53605d] md:text-[18px]">What matters can be checked before you decide: measured acoustic performance, a showroom visit, and one local team that stays accountable after delivery.</p>
          </div>
          <div className="mt-12 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-7">
            {buyingConfidence.map((item) => (
              <article key={item.title} className="border-t border-[#9fa6a0] pt-5">
                <div className="aspect-[5/3] overflow-hidden bg-[#e9e7e1]">
                  <img src={item.image} alt={item.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <h3 className="mt-5 text-[21px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#172126]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-[#59635f]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#112129] px-5 py-12 text-white md:px-12 md:py-16">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 border-y border-white/15 py-8 md:flex-row md:items-end md:justify-between md:py-10">
          <div className="flex max-w-[760px] gap-5 md:gap-7">
            <span className="mt-1 h-12 w-[3px] shrink-0 bg-[#f57a21]" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a9c8ba]">Pod relocation service</p>
              <h2 className="mt-3 text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] md:text-[38px]">Moving office? Your Ace Pod can move with you.</h2>
              <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.6] text-white/68 md:text-[16px]">We assess, dismantle, transport, reinstall, and inspect your booth so it is ready for its next workplace.</p>
            </div>
          </div>
          <Link to="/pod-relocation" className="shrink-0 border border-[#79af96] px-5 py-3 text-center text-[14px] font-semibold text-white transition-colors hover:bg-white/10">Explore pod relocation →</Link>
        </div>
      </section>

      <section className="bg-[#e9e7e1] px-5 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="border-y border-[#c8c5be] py-8 text-center md:py-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#66736d]">Confidence before you decide</p>
            <h2 className="mx-auto mt-3 max-w-[15ch] text-[32px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#172126] md:max-w-none md:text-[46px]">Choose Ace Pods</h2>
            <div className="mt-10 grid border-l border-t border-[#c8c5be] text-left md:grid-cols-4">
              {reassurancePoints.map(([title, description]) => (
                <article key={title} className="border-b border-r border-[#c8c5be] px-5 py-6 md:px-6 md:py-7">
                  <h3 className="text-[14px] font-semibold leading-[1.3] text-[#172126]">{title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.55] text-[#59635f]">{description}</p>
                </article>
              ))}
            </div>
            <Link to="/contact" className="mt-10 inline-flex bg-[#00855a] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#006e4a]">Talk to our team</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f6f2] px-5 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <div className="max-w-[670px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#68726f]">Common questions</p>
            <h2 className="mt-3 text-[32px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#172126] md:text-[46px]">What buyers usually want to clarify.</h2>
          </div>
          <div className="mt-10 border-t border-[#d8d4cc]">
            {HOME_FAQ_ITEMS.map((item, index) => (
              <details key={item.question} open={index === 0} className="group border-b border-[#d8d4cc]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-semibold tracking-[-0.015em] text-[#172126] marker:hidden md:py-6 md:text-[20px]">
                  {item.question}
                  <span className="text-[23px] font-normal text-[#007653] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-[72ch] pb-6 text-[15px] leading-[1.65] text-[#59635f]">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-[14px] font-semibold text-[#007653]">
            <Link to="/office-pods">View office pods</Link>
            <Link to="/compare-office-pods">Compare models</Link>
            <Link to="/pricing">View pricing</Link>
            <Link to="/installation-support">Installation and support</Link>
          </div>
        </div>
      </section>

      <InstagramFeed />
      <SiteFooter />
    </div>
  );
}
