import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  ChevronDown,
  ChevronRight,
  Hammer,
  KeyRound,
  Menu,
  Receipt,
  Route,
  Shield,
  Volume2,
  X
} from 'lucide-react';
import acePodsLogo from '../../Logos/ace pods logo.png';
import officeOneImage from '../../assets/Office-1.webp';
import officeTwoImage from '../../assets/office-2.webp';
import officeThreeImage from '../../assets/office-3.webp';
import officeOneImageAvif from '../../assets/Office-1.avif';
import officeTwoImageAvif from '../../assets/office-2.avif';
import officeThreeImageAvif from '../../assets/office-3.avif';
import podsInstallationImage from '../../assets/pods-installation.webp';
import deliveryPodsImage from '../../assets/delivery-pods.webp';
import podsInstallationImageAvif from '../../assets/pods-installation.avif';
import deliveryPodsImageAvif from '../../assets/delivery-pods.avif';
import aceSoloCutout from '../../assets/ace-solo-cutout.png';
import aceMeetGreyAshCutout from '../../assets/homepage-cutouts/ace-meet-grey-ash-cutout.png';
import aceHubGreyAshCutout from '../../assets/homepage-cutouts/ace-hub-grey-ash-cutout.png';
import parkerLogo from '../../assets/parker-logo.svg';
import cmacgmLogo from '../../assets/cmacgm-logo.svg';
import alphabetLogo from '../../assets/alphabet-logo.png';
import jyEliteLogo from '../../assets/jy-elite.svg';
import rightwillLogo from '../../assets/rightwill-logo.png';
import matradeLogo from '../../assets/matrade-logo.png';
import everllenceLogo from '../../assets/everllence-logo.png';
import taylorsUniversityLogo from '../../assets/taylorsuniversity.svg';
import amorePacificLogo from '../../assets/amorepacific-logo.svg';
import brenntagLogo from '../../assets/brenntag-logo.webp';
import SeoMeta from '../components/SeoMeta';
import SiteFooter from '../components/SiteFooter';
import SmartPodsBanner from '../components/SmartPodsBanner';
import { smartPodsMenuItems } from '../components/smartPodsMenuData';
import PodPrice from '../components/PodPrice';
import { useCurrency } from '../hooks/useCurrency';
import { buildCanonical, createFaqSchema, homepageWebPageSchema, localBusinessSchema, websiteSchema } from '../seo/schema';
import { HOME_FAQ_ITEMS } from '../seo/constants';

const WHATSAPP_LINK = 'https://wa.link/9umr4q';

const navItems = [
  { label: 'Office Pods', type: 'smart-pods' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Office Chairs', to: '/office-chairs' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Installation & Support', to: '/installation-support' },
  { label: 'FAQ', to: '/faq' }
];

const trustedLogos = [
  { name: 'CMA CGM Shipping', image: cmacgmLogo, fitClass: 'scale-[0.98]', stageClass: 'h-[52px] max-w-[176px]' },
  { name: 'Alphabet Capital Sdn Bhd', image: alphabetLogo, fitClass: 'scale-[0.94]', stageClass: 'h-[50px] max-w-[176px]' },
  { name: 'Rightwill Sdn Bhd', image: rightwillLogo, fitClass: 'scale-[0.88] -translate-y-[1px]', stageClass: 'h-[52px] max-w-[170px]' },
  { name: 'MATRADE', image: matradeLogo, fitClass: 'scale-[0.96]', stageClass: 'h-[48px] max-w-[176px]' },
  { name: "Taylor's University Lakeside", image: taylorsUniversityLogo, fitClass: 'scale-[1.10]', stageClass: 'h-[52px] max-w-[172px]' },
  { name: 'Everllence', image: everllenceLogo, fitClass: 'scale-[0.98]', stageClass: 'h-[48px] max-w-[176px]' },
  { name: 'Amore Pacific', image: amorePacificLogo, fitClass: 'scale-[0.95]', stageClass: 'h-[44px] max-w-[176px]' },
  { name: 'Brenntag', image: brenntagLogo, fitClass: 'scale-[0.95]', stageClass: 'h-[96px] max-w-[280px]' }
];

const featuredModels = [
  {
    slug: 'ace-solo',
    name: 'Ace Solo',
    tagline: 'Phone booth for 1 person',
    desc: 'Compact pod for private calls and focused work. Steps in, door closes, open floor disappears.',
    image: aceSoloCutout,
    fromMyr: 12500
  },
  {
    slug: 'ace-meet',
    name: 'Ace Meet',
    tagline: 'Meeting pod for 2–4 people',
    desc: 'Seats 2–4 comfortably. Private, quiet, and ready to use — no need to book a conference room.',
    image: aceMeetGreyAshCutout,
    fromMyr: 22200
  },
  {
    slug: 'ace-hub',
    name: 'Ace Hub',
    tagline: 'Meeting pod for up to 6 people',
    desc: 'Seats up to 6. The same quality as our smaller pods, scaled up for your whole team.',
    image: aceHubGreyAshCutout,
    fromMyr: 27800
  }
];

const whyAceItems = [
  {
    icon: Hammer,
    title: 'No Import Nightmare.',
    desc: 'Ships from Selangor. No freight, no customs, no delays. Every cost is upfront.'
  },
  {
    icon: Route,
    title: 'One Number to Call. Forever.',
    desc: 'Site visit, installation, after-sales — one person handles all of it. No handoffs.'
  },
  {
    icon: Award,
    title: "180 Pods In. Yours Won't Be Experiment #1.",
    desc: '180 installs in Malaysian offices — Parker, CMA CGM, Alphabet. Everything learned, applied to yours.'
  },
  {
    icon: Receipt,
    title: 'Every Cost Is on the Website Before You Ask.',
    desc: 'Pod price and installation — both listed on our pricing page. No surprises on your invoice.'
  },
  {
    icon: Volume2,
    title: 'Certified -27dB(A). Test It Before You Sign.',
    desc: 'Independently certified by TÜV to -27dB(A). Not self-reported. Visit our showroom in Klang and test it yourself before signing.'
  },
  {
    icon: KeyRound,
    title: 'No Landlord Approval. No Lease Clause Triggered.',
    desc: "Furniture, not a fixture. No alteration clause, no landlord sign-off needed. Moves with you."
  }
];

const processSteps = [
  {
    num: '01',
    title: 'Tell us about your space',
    desc: "WhatsApp us or fill our quick form. No commitment, no pressure — just tell us what your office needs."
  },
  {
    num: '02',
    title: 'We come to you',
    desc: 'Our team visits your site, measures the space, and recommends the right pod for your layout and budget. Free, no obligation.'
  },
  {
    num: '03',
    title: 'Done in one day. We handle everything after.',
    desc: "Delivered and installed by our own crew — not a subcontractor. We're one call away for anything after."
  }
];

const galleryImages = [
  { src: officeOneImage, srcAvif: officeOneImageAvif, alt: 'Ace Office Pod installed in a Malaysian office', caption: 'Malaysian office, 2024' },
  { src: officeTwoImage, srcAvif: officeTwoImageAvif, alt: 'Meeting pod in an open-plan office', caption: 'MNC office, Kuala Lumpur' },
  { src: officeThreeImage, srcAvif: officeThreeImageAvif, alt: 'Office pod installation in Selangor', caption: 'Office installation, Selangor' },
  { src: podsInstallationImage, srcAvif: podsInstallationImageAvif, alt: 'Ace Pods installation team at work', caption: 'Our installation team at work' },
  { src: deliveryPodsImage, srcAvif: deliveryPodsImageAvif, alt: 'Ace Pods delivery and setup', caption: 'Delivery from our Selangor factory' },
  { src: officeTwoImage, srcAvif: officeTwoImageAvif, alt: 'Acoustic office pod in a corporate office, Kuala Lumpur', caption: 'Corporate office, Kuala Lumpur' }
];

const priceRows = [
  { label: 'Pod price', imported: 'RM 8,000 – 10,000', ace: 'From RM 12,500', aceMyr: 12500 },
  { label: 'Delivery & freight', imported: 'RM 1,500 – 3,000 extra', ace: 'Included' },
  { label: 'Customs & duties', imported: 'Variable — your problem', ace: 'N/A — made in Malaysia' },
  { label: 'Installation', imported: 'Self-arrange a contractor (RM 2,000 – 4,000+)', ace: 'Our team — price listed on our website' },
  { label: 'Local warranty', imported: '✕  None', ace: '✓  Included' },
  { label: 'After-sales support', imported: '✕  No local contact', ace: '✓  Same team, Selangor' },
  { label: 'Risk if something fails', imported: 'You figure it out', ace: 'We come to you' },
  { label: 'True total cost', imported: 'RM 11,500 – 17,000+ with hidden risk', ace: 'Pod + installation — every cost listed on our website', highlight: true }
];

const glassRoomRows = [
  { label: 'Estimated cost', renovation: 'RM 25,000 – 50,000', ace: 'From RM 18,800', aceMyr: 18800 },
  { label: 'Time to complete', renovation: '6 – 8 weeks', ace: '1 working day' },
  { label: 'Office disruption', renovation: 'Weeks of noise and dust', ace: 'None' },
  { label: 'Landlord approval required', renovation: 'Usually yes', ace: 'No' },
  { label: 'Can you relocate it?', renovation: '✕  No — permanent fixture', ace: '✓  Yes — move when you move' },
  { label: 'Acoustic certification', renovation: '✕  None — depends on contractor', ace: '✓  Certified -27dB(A)' },
  { label: 'Accountable contact', renovation: 'General contractor', ace: '✓  Same team, forever' },
];

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function HomePageV2() {
  const { isLocal } = useCurrency();
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmartPodsDesktopOpen, setIsSmartPodsDesktopOpen] = useState(false);
  const [isSmartPodsMobileOpen, setIsSmartPodsMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) setIsSmartPodsMobileOpen(false);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isSmartPodsDesktopOpen) return;
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setIsSmartPodsDesktopOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isSmartPodsDesktopOpen]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-50 font-sans antialiased text-stone-900">
      <SeoMeta
        title="Acoustic Office Pods Malaysia — Installed in a Day | Ace Pods"
        description="Malaysian-made acoustic office pods. Independently certified −27 dB(A). 180+ installs. From RM 12,500. No renovation needed — installed in one day. Get a free site visit."
        canonical={buildCanonical('/')}
        schemas={[localBusinessSchema, websiteSchema, homepageWebPageSchema, createFaqSchema('/', HOME_FAQ_ITEMS)]}
      />

      {/* ── NAV ── */}
      <nav
        ref={navRef}
        className={`fixed top-0 z-50 h-[64px] w-full bg-white transition-all duration-300 md:h-[80px] ${
          scrolled ? 'shadow-sm' : 'border-b border-stone-100'
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 md:px-12">
          <div className="flex items-center gap-8 lg:gap-16">
            <Link to="/">
              <img src={acePodsLogo} alt="Ace Pods" width="56" height="56" className="h-8 w-auto md:h-14" />
            </Link>
            <div className="hidden items-center gap-9 lg:flex">
              {navItems.map((item) => {
                if (item.type === 'smart-pods') {
                  return (
                    <div key={item.label} className="group flex cursor-pointer items-center gap-1.5">
                      <Link
                        to="/office-pods"
                        onClick={() => setIsSmartPodsDesktopOpen(false)}
                        className="text-[16px] font-medium text-stone-700 transition-colors group-hover:text-[#00855a]"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={`${isSmartPodsDesktopOpen ? 'Close' : 'Open'} Office Pods menu`}
                        onClick={() => setIsSmartPodsDesktopOpen((prev) => !prev)}
                        className="inline-flex items-center text-[#00855a]"
                      >
                        <ChevronDown
                          size={16}
                          strokeWidth={2}
                          className={`mt-0.5 transition-transform ${isSmartPodsDesktopOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setIsSmartPodsDesktopOpen(false)}
                    className="text-[16px] font-medium text-stone-700 transition-colors hover:text-[#00855a]"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-[#00855a] px-6 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#006e4a] sm:inline-flex"
            >
              Get a Free Site Visit
            </a>
            <div className="flex items-center lg:hidden">
              <button className="p-1 text-stone-700" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
                <Menu size={27} />
              </button>
            </div>
          </div>
        </div>
        {isSmartPodsDesktopOpen && (
          <SmartPodsBanner items={smartPodsMenuItems} onItemClick={() => setIsSmartPodsDesktopOpen(false)} />
        )}
      </nav>

      {/* ── MOBILE MENU ── */}
      <div
        className={`fixed inset-0 z-[100] flex h-[100dvh] flex-col transform overflow-hidden bg-white transition-transform duration-500 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-100 p-6">
          <img src={acePodsLogo} alt="Ace Pods" width="32" height="32" className="h-8 w-auto" />
          <button onClick={() => setIsMenuOpen(false)} className="p-2" aria-label="Close menu">
            <X size={32} />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-8 pb-14 [-webkit-overflow-scrolling:touch]">
          <div className="space-y-8">
            {navItems.map((item) => {
              if (item.type === 'smart-pods') {
                return (
                  <div key={item.label} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Link
                        to="/office-pods"
                        onClick={() => { setIsMenuOpen(false); setIsSmartPodsMobileOpen(false); }}
                        className="text-2xl font-bold tracking-tight"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsSmartPodsMobileOpen((prev) => !prev)}
                        className="inline-flex items-center"
                        aria-label="Toggle Office Pods submenu"
                      >
                        <ChevronDown className={`text-[#00855a] transition-transform ${isSmartPodsMobileOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    {isSmartPodsMobileOpen && (
                      <div className="space-y-10 border-t border-stone-200 pt-6">
                        {smartPodsMenuItems.map((menuItem) => (
                          <Link
                            key={menuItem.title}
                            to={menuItem.to}
                            onClick={() => { setIsMenuOpen(false); setIsSmartPodsMobileOpen(false); }}
                            className="block text-center"
                          >
                            <div className="mx-auto h-[260px] w-full max-w-[230px]">
                              <img
                                src={menuItem.image}
                                alt={menuItem.title}
                                className={`h-full w-full object-contain ${menuItem.imageClassName || ''}`}
                              />
                            </div>
                            <h3 className="mt-4 text-[20px] font-semibold tracking-tight text-[#007653]">{menuItem.title}</h3>
                            <p className="mx-auto mt-2 max-w-[280px] text-[14px] leading-[1.5] text-stone-500">{menuItem.description}</p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-between"
                >
                  <span className="text-2xl font-bold tracking-tight">{item.label}</span>
                  <ChevronRight className="text-[#00855a]" />
                </Link>
              );
            })}
          </div>
          <div className="mt-10">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full rounded-full bg-[#00855a] py-4 text-center text-[16px] font-semibold text-white"
            >
              Get a Free Site Visit
            </a>
          </div>
        </div>
      </div>

      <div className="pt-[64px] md:pt-[80px]">

        {/* ── HERO ── */}
        <section className="bg-stone-50 px-5 py-12 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1280px]">

            {/* Mobile: stacked */}
            <div className="md:hidden">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00855a]">
                Private Office Space — Malaysian Made
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-stone-900">
                Private office pods in Malaysia. Installed in a day. No construction required.
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-stone-600">
                Give your team quiet, private space — without renovation, permits, or weeks of disruption. Designed, built, installed, and supported by one Malaysian team.
              </p>
              <p className="mt-3 text-sm text-stone-500"><PodPrice myrAmount={18800} className="font-semibold text-stone-900" /> · <Link to="/pricing" className="underline underline-offset-2 hover:text-stone-700">all prices on our website</Link> · <a href="#guarantee" className="underline underline-offset-2 hover:text-stone-700">TÜV certified</a></p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-full bg-[#00855a] py-3.5 text-center text-[16px] font-semibold text-white"
                >
                  Get a Free Site Visit
                </a>
                <Link
                  to="/portfolio"
                  className="w-full rounded-full border border-stone-300 py-3.5 text-center text-[16px] font-semibold text-stone-700"
                >
                  See Installed Pods
                </Link>
              </div>
              <div className="mt-8 aspect-[16/10] overflow-hidden rounded-2xl">
                <picture>
                  <source srcSet={officeOneImageAvif} type="image/avif" />
                  <img
                    src={officeOneImage}
                    alt="Ace Office Pod installed in a Malaysian office"
                    width="1600"
                    height="1000"
                    className="h-full w-full object-cover"
                    fetchPriority="high"
                  />
                </picture>
              </div>
            </div>

            {/* Desktop: split layout */}
            <div className="hidden md:grid md:grid-cols-2 md:items-center md:gap-12 lg:gap-20">
              <div>
                <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-[#00855a]">
                  Private Office Space — Malaysian Made
                </p>
                <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-stone-900 lg:text-6xl">
                  Private office pods in Malaysia. Installed in a day. No construction required.
                </h1>
                <p className="mt-5 text-xl leading-relaxed text-stone-600">
                  Give your team quiet, private space — without renovation, permits, or weeks of disruption. Designed, built, installed, and supported by one Malaysian team — from site visit to sign-off.
                </p>
                <p className="mt-4 text-sm text-stone-500"><PodPrice myrAmount={18800} className="font-semibold text-stone-900" /> · <Link to="/pricing" className="underline underline-offset-2 hover:text-stone-700">all prices on our website</Link> · <a href="#guarantee" className="underline underline-offset-2 hover:text-stone-700">TÜV certified</a></p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#00855a] px-8 py-3.5 text-[16px] font-semibold text-white shadow-sm transition-colors hover:bg-[#006e4a]"
                  >
                    Get a Free Site Visit
                  </a>
                  <Link
                    to="/portfolio"
                    className="rounded-full border border-stone-300 px-8 py-3.5 text-[16px] font-semibold text-stone-700 transition-colors hover:border-stone-400"
                  >
                    See Installed Pods
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl">
                <picture>
                  <source srcSet={officeOneImageAvif} type="image/avif" />
                  <img
                    src={officeOneImage}
                    alt="Ace Office Pod installed in a Malaysian office"
                    width="1600"
                    height="1000"
                    className="h-[440px] w-full object-cover lg:h-[520px]"
                    fetchPriority="high"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="bg-stone-900 px-5 py-10 md:px-12 md:py-14">
          <div className="mx-auto max-w-[1280px]">
            <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-widest text-stone-400">
              Trusted by teams who can't afford downtime
            </p>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-12">
              {[
                { num: '180+', label: 'pods installed' },
                { num: '2023', label: 'first install' },
                { num: '100%', label: 'Malaysian-made' },
                { num: '1', label: 'team, start to finish' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-[#007653]">{stat.num}</span>
                  <span className="text-[13px] text-stone-400">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-5 md:gap-x-10">
              {trustedLogos.map((logo) => (
                <div key={logo.name} className={`flex items-center justify-center ${logo.stageClass}`}>
                  <img
                    src={logo.image}
                    alt={logo.name}
                    width="210"
                    height="64"
                    className={`h-full w-full object-contain opacity-50 brightness-0 invert ${logo.fitClass}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
              <Link to="/portfolio" className="text-[13px] font-medium text-stone-400 underline-offset-4 hover:text-stone-300 hover:underline">
                See installed pods →
              </Link>
              <span className="hidden text-stone-700 md:inline">·</span>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-stone-400 underline-offset-4 hover:text-stone-300 hover:underline">
                Ask us for a reference on WhatsApp
              </a>
            </div>
            <p className="mt-3 text-center text-[13px] text-stone-400">
              We issue purchase orders and provide full warranty documentation for corporate procurement teams.
            </p>
          </div>
        </section>

        {/* ── FEATURED MODELS ── */}
        <section className="bg-white px-5 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-stone-900 md:text-4xl">
                Find the right acoustic office pod for your team
              </h2>
              <p className="mt-4 text-base text-stone-500 md:text-lg">
                Six models from RM 12,500. All designed, built, and installed by our team in Selangor.
              </p>
              {!isLocal && (
                <div className="mx-auto mt-5 max-w-[70ch] rounded-[8px] border border-amber-200 bg-amber-50 px-4 py-3 text-left text-[14px] leading-[1.55] text-amber-900">
                  <strong>International buyers:</strong> Prices below are in USD, ex-works from our factory in Klang, Selangor, Malaysia. Shipping and installation to your country are arranged and paid by you.{' '}
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">WhatsApp us</a> for an export quote.
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featuredModels.map((model) => (
                <Link
                  key={model.slug}
                  to={`/pods/${model.slug}`}
                  className="group overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 transition-shadow hover:shadow-md"
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-stone-100 p-6">
                    <img
                      src={model.image}
                      alt={`${model.name} acoustic office pod`}
                      width="400"
                      height="400"
                      className="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-6">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#00855a]">
                      {model.tagline}
                    </p>
                    <h3 className="text-xl font-semibold text-stone-900">{model.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{model.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-stone-500">
                        <PodPrice myrAmount={model.fromMyr} className="text-base font-semibold text-stone-900" />
                      </span>
                      <span className="text-sm font-semibold text-[#00855a] group-hover:underline underline-offset-4">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
              <Link to="/office-pods" className="text-[15px] font-medium text-[#00855a] underline-offset-4 hover:underline">
                View all 6 models →
              </Link>
              <Link to="/compare-office-pods" className="text-[15px] font-medium text-stone-500 underline-offset-4 hover:underline">
                Compare models side by side →
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY ACE PODS ── */}
        <section className="bg-stone-50 px-5 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-12 text-center">
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
                Beyond the product
              </span>
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-stone-900 md:text-4xl">
                Why choose Ace Pods
              </h2>
              <p className="mx-auto mt-4 max-w-[600px] text-base leading-relaxed text-stone-500">
                Solving the open-plan problem without a renovation is harder than it looks. Here's why 180 Malaysian offices chose us to handle it.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {whyAceItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e9e7e1]">
                    <item.icon size={24} strokeWidth={2} className="text-[#00855a]" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-stone-900">{item.title}</h3>
                  <p className="text-base leading-relaxed text-stone-600">{item.desc}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-[#00855a] px-8 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-[#006e4a]"
              >
                Get a Free Site Visit
              </a>
              <p className="mt-4 text-sm text-stone-400">
                Not ready yet? <Link to="/pricing" className="text-[#00855a] underline-offset-2 hover:underline">View all prices →</Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="bg-stone-100 px-5 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-12 text-center">
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
                Simple process
              </span>
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-stone-900 md:text-4xl">
                How it works
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
              {processSteps.map((step) => (
                <div key={step.num}>
                  <span className="mb-2 block text-[56px] font-bold leading-none text-stone-200 select-none">
                    {step.num}
                  </span>
                  <h3 className="mb-3 text-xl font-semibold text-stone-900">{step.title}</h3>
                  <p className="text-base leading-relaxed text-stone-600">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Agreement Plan strip */}
            <div className="mx-auto mt-14 max-w-xl rounded-2xl bg-white p-6 text-center shadow-sm md:p-8">
              <p className="text-base text-stone-600">
                Free site visit. No commitment until you're ready. We'll tell you if it's not the right fit.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#00855a] px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#006e4a]"
              >
                <WhatsAppIcon />
                WhatsApp Us Now
              </a>
              <p className="mt-4 text-xs text-stone-400">
                Installation slots book 4–6 weeks out. If you have a target date, now is the right time to start.
              </p>
              <p className="mt-3 text-xs text-stone-400">
                Questions about the process? <Link to="/installation-support" className="underline-offset-2 hover:underline">See our installation & support guide →</Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="bg-white px-5 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-stone-900 md:text-4xl">
                180+ Pods in Malaysian Offices
              </h2>
              <p className="mt-3 text-base text-stone-500">
                From MNCs to universities in Malaysia — every pod delivered and installed by our own Selangor team.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {galleryImages.map((img, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-xl">
                  <picture>
                    <source srcSet={img.srcAvif} type="image/avif" />
                    <img
                      src={img.src}
                      alt={img.alt}
                      width="600"
                      height="600"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-xs font-medium text-white/90">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/portfolio" className="text-[15px] font-medium text-[#00855a] underline-offset-4 hover:underline">
                See all installed pods →
              </Link>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                <Link to="/locations/kuala-lumpur" className="text-[13px] text-stone-400 underline-offset-4 hover:text-stone-600 hover:underline">
                  Office pods in KL
                </Link>
                <span className="text-stone-200" aria-hidden="true">·</span>
                <Link to="/locations/petaling-jaya" className="text-[13px] text-stone-400 underline-offset-4 hover:text-stone-600 hover:underline">
                  Office pods in Petaling Jaya
                </Link>
                <span className="text-stone-200" aria-hidden="true">·</span>
                <Link to="/locations/damansara" className="text-[13px] text-stone-400 underline-offset-4 hover:text-stone-600 hover:underline">
                  Office pods in Damansara
                </Link>
                <span className="text-stone-200" aria-hidden="true">·</span>
                <Link to="/locations" className="text-[13px] text-stone-400 underline-offset-4 hover:text-stone-600 hover:underline">
                  All delivery locations →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── placeholder quotes — replace with real client words before launch */}
        <section className="bg-white px-5 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-[1280px]">
            <p className="mb-8 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
              What our clients say
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <blockquote className="rounded-2xl border border-stone-200 bg-stone-50 p-7">
                <p className="text-[17px] leading-relaxed text-stone-700">
                  "We needed private space for calls without weeks of disruption to the rest of the team. The pod was delivered and installed in one day — our staff were using it the same afternoon."
                </p>
                <footer className="mt-5 border-t border-stone-200 pt-4">
                  <p className="text-[14px] font-semibold text-stone-900">HR Manager</p>
                  <p className="text-[13px] text-stone-400">Parker Hannifin Malaysia</p>
                </footer>
              </blockquote>
              <blockquote className="rounded-2xl border border-stone-200 bg-stone-50 p-7">
                <p className="text-[17px] leading-relaxed text-stone-700">
                  "Acoustic quality was the priority for us. The TÜV certification gave us the confidence to proceed — and the showroom visit confirmed it before we signed anything."
                </p>
                <footer className="mt-5 border-t border-stone-200 pt-4">
                  <p className="text-[14px] font-semibold text-stone-900">Operations Lead</p>
                  <p className="text-[13px] text-stone-400">Taylor's University</p>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── GUARANTEE ── */}
        <section id="guarantee" className="bg-stone-50 px-5 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-[800px]">
            <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm md:p-12">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e9e7e1]">
                <Shield size={24} strokeWidth={2} className="text-[#00855a]" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 md:text-2xl">TÜV Certified Acoustic Performance</h3>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-[#00855a]">Independently Certified -27dB(A)</p>
              <p className="mt-4 text-base leading-relaxed text-stone-600">
                The -27dB(A) figure on every Ace pod is independently verified by TÜV — not a self-reported number. Most office pod brands publish their own acoustic figures. Ours were tested and certified by a third party so you don't have to take our word for it.
              </p>
              <p className="mt-3 text-sm font-medium text-stone-400">
                Visit our showroom in Klang and test acoustic performance yourself before committing to anything.
              </p>
            </div>
          </div>
        </section>

        {/* ── PRICE COMPARISON ── */}
        <section className="bg-stone-900 px-5 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1000px]">

            {/* Primary: vs glass room / renovation */}
            <h2 className="mb-3 text-center text-2xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
              The fastest way to add private space to your office isn't a renovation.
            </h2>
            <p className="mb-10 text-center text-base leading-relaxed text-stone-400">
              A glass room or partition costs RM 25,000–50,000, takes 6–8 weeks, and needs landlord approval. An Ace pod is installed in one day.
            </p>

            <div className="overflow-hidden rounded-2xl border border-stone-700">
              <div className="grid grid-cols-3 border-b border-stone-700 bg-stone-800">
                <div className="px-4 py-4 text-[12px] font-bold uppercase tracking-widest text-stone-500" />
                <div className="border-l border-stone-700 px-4 py-4 text-center text-[12px] font-bold uppercase tracking-widest text-stone-400">
                  Glass room / partition
                </div>
                <div className="border-l border-stone-700 px-4 py-4 text-center text-[12px] font-bold uppercase tracking-widest text-[#007653]">
                  Ace Office Pod
                </div>
              </div>
              {glassRoomRows.map((row, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-stone-700 last:border-b-0 bg-stone-800">
                  <div className="px-4 py-4 text-sm text-stone-400 md:text-base">{row.label}</div>
                  <div className="border-l border-stone-700 px-4 py-4 text-center text-sm text-stone-400 md:text-base">{row.renovation}</div>
                  <div className="border-l border-stone-700 px-4 py-4 text-center text-sm font-medium text-white md:text-base">
                    {row.aceMyr ? <PodPrice myrAmount={row.aceMyr} /> : row.ace}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-base font-semibold text-stone-300">
              Against a renovation, a pod isn't the expensive option. It's the obvious one.
            </p>
            <p className="mt-2 text-center text-base text-stone-400">
              <Link to="/pod-relocation" className="font-semibold text-[#007653] underline-offset-4 hover:underline">
                See how pod relocation works →
              </Link>
            </p>

            {/* Secondary: vs overseas import */}
            <div className="mt-12 border-t border-stone-700 pt-10">
              <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-widest text-stone-500">
                Also comparing with an overseas pod?
              </p>
              <p className="mb-8 text-center text-sm text-stone-400">
                The import price looks lower until you add freight, customs, installation, and no local support.
              </p>
              <div className="overflow-hidden rounded-2xl border border-stone-700">
                <div className="grid grid-cols-3 border-b border-stone-700 bg-stone-800">
                  <div className="px-4 py-4 text-[12px] font-bold uppercase tracking-widest text-stone-500" />
                  <div className="border-l border-stone-700 px-4 py-4 text-center text-[12px] font-bold uppercase tracking-widest text-stone-400">
                    Imported pod
                  </div>
                  <div className="border-l border-stone-700 px-4 py-4 text-center text-[12px] font-bold uppercase tracking-widest text-[#007653]">
                    Ace Office Pod
                  </div>
                </div>
                {priceRows.map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-3 border-b border-stone-700 last:border-b-0 ${
                      row.highlight ? 'bg-stone-700' : 'bg-stone-800'
                    }`}
                  >
                    <div className="px-4 py-4 text-sm text-stone-400 md:text-base">{row.label}</div>
                    <div className="border-l border-stone-700 px-4 py-4 text-center text-sm text-stone-400 md:text-base">{row.imported}</div>
                    <div className={`border-l border-stone-700 px-4 py-4 text-center text-sm md:text-base ${row.highlight ? 'font-bold text-[#007653]' : 'font-medium text-white'}`}>
                      {row.aceMyr ? <PodPrice myrAmount={row.aceMyr} /> : row.ace}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-stone-500">
              Every price is on our website — build your budget proposal before you contact us.
            </p>
            <div className="mt-5 text-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#00855a] px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#006e4a]"
              >
                <WhatsAppIcon />
                Get a Free Site Visit
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-stone-50 px-5 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[780px]">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-stone-900 md:text-4xl">
                Common questions about office pods
              </h2>
              <p className="mt-4 text-base text-stone-500">
                A few things buyers usually want to clarify before choosing a pod.
              </p>
            </div>
            <div className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
              {HOME_FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <article key={item.question}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className="text-[17px] font-semibold leading-[1.35] text-stone-900">{item.question}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </h3>
                    <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-5 text-[15px] leading-relaxed text-stone-600">
                        {item.answer}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] font-medium text-[#00855a]">
              <Link to="/office-pods" className="underline-offset-4 hover:underline">View all pods</Link>
              <Link to="/compare-office-pods" className="underline-offset-4 hover:underline">Compare models</Link>
              <Link to="/pricing" className="underline-offset-4 hover:underline">View pricing</Link>
              <Link to="/faq" className="underline-offset-4 hover:underline">Full FAQ →</Link>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="bg-stone-900 px-5 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Ready to give your team somewhere quiet?
            </h2>
            <p className="mt-4 text-base text-white/60">
              Every week the open plan stays unchanged, your team absorbs the cost in broken focus and missed calls.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-white/80">
              Start with a free site visit. No commitment. Our team comes to you, measures the space, and tells you exactly what will work.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full bg-white px-8 py-4 text-[16px] font-semibold text-[#00855a] shadow-md transition-colors hover:bg-stone-50 sm:w-auto"
              >
                Get a Free Site Visit
              </a>
              <Link
                to="/office-pods"
                className="w-full rounded-full border border-white/50 px-8 py-4 text-[16px] font-semibold text-white transition-colors hover:border-white sm:w-auto"
              >
                Browse All Models
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/60">
              Free site visit · No obligation · Installation slots book 4–6 weeks out
            </p>
          </div>
        </section>

        <SiteFooter />
      </div>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get a free noise assessment on WhatsApp"
        className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 md:bottom-8 md:right-8 md:h-auto md:w-auto md:gap-2.5 md:rounded-full md:px-5 md:py-3.5"
      >
        <WhatsAppIcon />
        <span className="hidden text-[14px] font-semibold md:inline">Get a free noise assessment</span>
      </a>
    </div>
  );
}
