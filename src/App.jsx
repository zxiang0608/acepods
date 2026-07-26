import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Hammer,
  LayoutGrid,
  LockKeyhole,
  MessageSquare,
  Maximize2,
  Menu,
  Route,
  TrendingUp,
  Truck,
  VolumeX,
  X
} from 'lucide-react';
import acePodsLogo from '../Logos/ace pods logo.png';
import acePodsHero from '../assets/hero-pods.webp';
import acePodsHeroAvif from '../assets/hero-pods.avif';
import zxTayPhoto from '../assets/zx-tay.webp';
import aceFlexGreyAshCutout from '../assets/homepage-cutouts/ace-flex-grey-ash-cutout.png';
import aceMeetGreyAshCutout from '../assets/homepage-cutouts/ace-meet-grey-ash-cutout.png';
import aceHubGreyAshCutout from '../assets/homepage-cutouts/ace-hub-grey-ash-cutout.png';
import officeOneImage from '../assets/Office-1.webp';
import officeTwoImage from '../assets/office-2.webp';
import officeThreeImage from '../assets/office-3.webp';
import officeOneImageAvif from '../assets/Office-1.avif';
import officeTwoImageAvif from '../assets/office-2.avif';
import officeThreeImageAvif from '../assets/office-3.avif';
import comparePriceImage from '../assets/quotation.jpg';
import podsInstallationImage from '../assets/pods-installation.webp';
import deliveryPodsImage from '../assets/delivery-pods.webp';
import comparePriceImageAvif from '../assets/quotation.avif';
import podsInstallationImageAvif from '../assets/pods-installation.avif';
import deliveryPodsImageAvif from '../assets/delivery-pods.avif';
import parkerLogo from '../assets/parker-logo.png';
import cmacgmLogo from '../assets/cmacgm-logo.svg';
import alphabetLogo from '../assets/alphabet-logo.png';
import rightwillLogo from '../assets/rightwill-logo.png';
import everllenceLogo from '../assets/everllence-logo.png';
import taylorsUniversityLogo from '../assets/taylorsuniversity.svg';
import amorePacificLogo from '../assets/amorepacific-logo.svg';
import brenntagLogo from '../assets/brenntag-logo.webp';
import SeoMeta from './components/SeoMeta';
import InstagramFeed from './components/InstagramFeed';
import SiteFooter from './components/SiteFooter';
import SmartPodsBanner from './components/SmartPodsBanner';
import PodStrip from './components/PodStrip';
import { smartPodsMenuItems } from './components/smartPodsMenuData';
import { products } from './data/products';
import { pushDataLayerEvent } from './lib/tracking';
import { HOME_FAQ_ITEMS, SEO_KEYWORDS_COMMON } from './seo/constants';
import { HOME_META } from './seo/pageMeta';
import { buildCanonical, createFaqSchema, homepageWebPageSchema, localBusinessSchema, serviceOrganizationSchema, websiteSchema } from './seo/schema';
import CurrencySwitcher from './components/CurrencySwitcher';

const PlaceholderImage = ({ aspect = 'aspect-video', label = 'Image Placeholder', className = '' }) => (
  <div
    className={`w-full ${aspect} flex flex-col items-center justify-center rounded-sm border border-gray-200 bg-gray-100 text-gray-400 ${className}`}
  >
    <span className="mb-2 px-2 text-center text-[10px] font-bold uppercase tracking-widest md:text-xs">{label}</span>
    <div className="h-px w-10 bg-gray-300 md:w-12"></div>
  </div>
);

const navItems = [
  { label: 'Office Pods', type: 'smart-pods' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Office Chairs', to: '/office-chairs' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Installation & Support', to: '/installation-support' },
  { label: 'Pod Relocation', to: '/pod-relocation' },
  { label: 'FAQ', to: '/faq' }
];

const WHATSAPP_LINK = 'https://wa.link/9umr4q';
const renovationPoints = [
  {
    num: '01',
    title: 'Less disruption across the office.',
    desc: 'Make space for private work without turning the wider workplace into an active building site.'
  },
  {
    num: '02',
    title: 'No need to build new rooms.',
    desc: 'Pods create usable enclosed space without taking the same route as fixed-room construction.'
  },
  {
    num: '03',
    title: 'More flexibility as needs change.',
    desc: 'They offer a lower-friction path for teams that want private space while keeping future layout choices open.'
  }
];

const seoRenovationPoints = [
  {
    num: '01',
    title: 'Keep noise and disruption away from the rest of the office',
    desc: 'Add privacy where it is needed without interrupting teams working around the pod area.',
    image: officeOneImage,
    imageAlt: 'Single office pod in an open workspace'
  },
  {
    num: '02',
    title: 'Add private space without construction work',
    desc: 'Office pods create enclosed space for calls, focused work, and meetings without building fixed rooms.',
    image: officeTwoImage,
    imageAlt: 'Meeting pod added to an office floor without renovation'
  },
  {
    num: '03',
    title: 'Move or expand your setup as your office changes',
    desc: 'You can adjust pod placement as team size, floor plans, or workspace needs evolve over time.',
    image: officeThreeImage,
    imageAlt: 'Larger office pod setup for changing team requirements'
  }
];

const checklistItems = [
  "Employees can't take calls without background noise bleeding in",
  "Sensitive conversations — HR, client, management — risk being overheard",
  "Deep-focus work is nearly impossible during busy open-floor hours",
  "Meeting rooms are always occupied when teams need a quick discussion",
  "You need more private space but can't commit to months of renovation",
  "Your floor plan needs to stay flexible as your headcount changes",
];

const officeSenseItems = [
  {
    icon: VolumeX,
    title: 'Noise Reduction',
    desc: 'Reduce open-office noise so calls, meetings, and focused work are easier to manage.'
  },
  {
    icon: LockKeyhole,
    title: 'Privacy & Confidentiality',
    desc: 'Create enclosed spaces for client calls, HR discussions, interviews, and sensitive conversations.'
  },
  {
    icon: TrendingUp,
    title: 'Better Focus',
    desc: 'Give employees a place to step away from movement, interruptions, and background conversations.'
  },
  {
    icon: MessageSquare,
    title: 'Clearer Communication',
    desc: 'Make phone calls and small meetings easier to hear without disturbing nearby teams.'
  },
  {
    icon: LayoutGrid,
    title: 'Flexible Layout',
    desc: 'Add enclosed rooms without fixed construction, then adapt your layout as your team changes.'
  },
  {
    icon: Brain,
    title: 'Employee Reset Space',
    desc: 'Offer a quieter place for short breaks, decompression, or heads-down work during busy days.'
  }
];

const reassuranceItems = [
  {
    icon: Hammer,
    label: 'Local install and support',
    desc: 'Support stays close from planning through post-installation.'
  },
  {
    icon: Route,
    label: 'Easy quote to install',
    desc: 'Buyers follow a clearer path from quote to setup.'
  },
  {
    icon: CheckCircle2,
    label: 'Comfortable for daily use',
    desc: 'Designed for practical everyday use, not showroom-only appeal.'
  },
  {
    icon: Maximize2,
    label: 'Fits workspace instantly',
    desc: 'Fits more easily around circulation, team needs, and layout realities.'
  }
];

const seoReassuranceItems = [
  {
    icon: Hammer,
    label: 'Made in Malaysia',
    desc: 'Built in Selangor, Malaysia. Factory and showroom available for visit before purchase.'
  },
  {
    icon: VolumeX,
    label: '−27 dB(A) ±5 dB Certified',
    desc: 'Five of our six models carry a verified 27 dBA noise reduction rating — a measured figure, not a marketing claim.'
  },
  {
    icon: CheckCircle2,
    label: '180+ pods installed',
    desc: 'Delivered and installed across Malaysia since 2023, for MNCs, SMEs, and corporate teams.'
  },
  {
    icon: Route,
    label: 'Same team. Start to finish.',
    desc: 'The team that builds your pod handles installation and post-installation support. One contact from order to after-sales.'
  }
];

const compareItems = [
  {
    title: 'We show you the complete price upfront.',
    desc: 'You can compare properly when you see more than just the headline number.',
    image: comparePriceImage,
    imageAlt: 'Office pod detail'
  },
  {
    title: 'Installation shapes the real buying experience.',
    desc: 'Access, placement, and coordination all affect how straightforward the project feels.',
    image: podsInstallationImage,
    imageAlt: 'Office pod installation detail'
  },
  {
    title: 'Support still matters after delivery.',
    desc: 'When something needs adjusting or servicing, clear support makes the pod easier to manage.',
    image: deliveryPodsImage,
    imageAlt: 'Office pod in workplace context',
    imageClassName: 'object-[center_70%]'
  }
];

const seoCompareItems = [
  {
    title: 'See the full project price upfront',
    desc: 'You can compare properly when you see more than just the headline number.',
    image: comparePriceImage,
    imageAlt: 'Office pod pricing and commercial detail'
  },
  {
    title: 'Installation matters more than most buyers expect',
    desc: 'Access, placement, and coordination all affect how straightforward the project feels.',
    image: podsInstallationImage,
    imageAlt: 'Office pod installation and site setup'
  },
  {
    title: 'Local support that is actually local',
    desc: 'When something needs attention after installation, you reach the team in Selangor that built the pod — no distributor chain, no overseas wait.',
    image: deliveryPodsImage,
    imageAlt: 'Office pod support and post-delivery use',
    imageClassName: 'object-[center_70%]'
  }
];

const trustedLogos = [
  { name: 'Parker Hannifin', image: parkerLogo, fitClass: 'scale-[0.92]', logoStageClass: 'max-h-[52px] max-w-[168px]' },
  { name: 'CMA CGM Shipping', image: cmacgmLogo, fitClass: 'scale-[0.98]', logoStageClass: 'max-h-[52px] max-w-[176px]' },
  { name: 'Alphabet Capital Sdn Bhd', image: alphabetLogo, fitClass: 'scale-[0.94]', logoStageClass: 'max-h-[50px] max-w-[176px]' },
  { name: 'Rightwill Sdn Bhd', image: rightwillLogo, fitClass: 'scale-[0.88] -translate-y-[1px]', logoStageClass: 'max-h-[52px] max-w-[170px]' },
  { name: "Taylor's University Lakeside", image: taylorsUniversityLogo, fitClass: 'scale-[1.10]', logoStageClass: 'max-h-[52px] max-w-[172px]' },
  { name: 'Everllence', image: everllenceLogo, fitClass: 'scale-[0.98]', logoStageClass: 'max-h-[48px] max-w-[176px]' },
  { name: 'Amore Pacific', image: amorePacificLogo, fitClass: 'scale-[0.95]', logoStageClass: 'max-h-[44px] max-w-[176px]' },
  { name: 'Brenntag', image: brenntagLogo, fitClass: 'scale-[0.98]', logoStageClass: '!h-[104px] max-w-[280px]' }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmartPodsDesktopOpen, setIsSmartPodsDesktopOpen] = useState(false);
  const [isSmartPodsMobileOpen, setIsSmartPodsMobileOpen] = useState(false);
  const [openHomepageFaq, setOpenHomepageFaq] = useState(0);
  const [openSenseIdx, setOpenSenseIdx] = useState(null);
  const [activePodIndex, setActivePodIndex] = useState(0);
  const navRef = useRef(null);
  const podTouchStartXRef = useRef(null);
  const podTouchDeltaXRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      setIsSmartPodsMobileOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isSmartPodsDesktopOpen) return;
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsSmartPodsDesktopOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isSmartPodsDesktopOpen]);

  const goToPrevPod = () => {
    setActivePodIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToNextPod = () => {
    setActivePodIndex((prev) => Math.min(prev + 1, products.length - 1));
  };

  const handlePodTouchStart = (event) => {
    podTouchStartXRef.current = event.touches[0].clientX;
    podTouchDeltaXRef.current = 0;
  };

  const handlePodTouchMove = (event) => {
    if (podTouchStartXRef.current === null) return;
    podTouchDeltaXRef.current = event.touches[0].clientX - podTouchStartXRef.current;
  };

  const handlePodTouchEnd = () => {
    if (podTouchStartXRef.current === null) return;
    const swipeThreshold = 50;
    if (podTouchDeltaXRef.current <= -swipeThreshold) {
      goToNextPod();
    } else if (podTouchDeltaXRef.current >= swipeThreshold) {
      goToPrevPod();
    }
    podTouchStartXRef.current = null;
    podTouchDeltaXRef.current = 0;
  };

  const activeRenovationPoints = seoRenovationPoints;
  const activeOfficeSenseItems = officeSenseItems;
  const activeCompareItems = seoCompareItems;
  const activeReassuranceItems = seoReassuranceItems;
  const desktopTopPodCards = products.slice(0, 3);
  const desktopBottomPodCards = products.slice(3);
  const displayScaleBySlug = {
    'ace-solo': 'scale-[0.90]',
    'ace-plus': 'scale-[0.88]',
    'ace-flex': 'scale-[0.96]',
    'ace-flex-duo': 'scale-[0.96]',
    'ace-meet': 'scale-[1.15]',
    'ace-hub': 'scale-[1.18]'
  };
  const mobileImageOffsetBySlug = {
    'ace-solo': '-translate-x-1',
    'ace-plus': '-translate-x-[5px]',
    'ace-flex': '-translate-x-1',
    'ace-flex-duo': 'translate-x-1',
    'ace-meet': 'translate-x-0',
    'ace-hub': 'translate-x-0'
  };

  const heroHeadline = 'Less noise. More work done.';
  const heroSupportingText = 'Give your people the quiet to think clearly, speak privately, and do their best work.';
  const heroProofItems = seoReassuranceItems
    .filter((item) => item.label !== 'Made in Malaysia')
    .map((item) => (item.label === '180+ pods installed' ? { ...item, label: 'Premium acoustic performance' } : item));
  const productIntroHeading = 'Find the right pod\nfor calls, focus, or meetings';
  const privateSpaceHeading = 'Add private space without building new rooms';
  const compareSupportingLine = "We know what it's like to be the one who has to make this call — there's no do-over if it turns out to be a bad soundproofing box, or a seller who disappears after delivery. That's why everything is verifiable before you decide: certified rating, showroom visit, same team start to finish.";
  const trustSectionHeading = 'Trusted by MNCs and companies across Malaysia';
  const whyHeading = 'Choose Ace Pods';
  const homepageSchemas = [
    localBusinessSchema,
    localBusinessSchema,
    websiteSchema,
    homepageWebPageSchema,
    createFaqSchema('/', HOME_FAQ_ITEMS),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${buildCanonical('/')}#home-answer`,
      url: buildCanonical('/'),
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#home-answer']
      }
    }
  ];
  const trackProductCta = (product, ctaText, ctaLocation, destinationUrl) => {
    pushDataLayerEvent('product_cta_click', {
      cta_location: ctaLocation,
      cta_text: ctaText,
      destination_url: destinationUrl,
      product_name: product?.name,
      product_slug: product?.slug
    });
  };
  const getHomepagePodImageClassName = (pod) => {
    const scaleClass = displayScaleBySlug[pod.slug] || '';
    return `h-full w-full object-contain ${scaleClass}`.trim();
  };
  const getMenuPodItemBySlug = (slug) => smartPodsMenuItems.find((item) => item.to === `/pods/${slug}`) || null;
  const getHomepagePodImageBlendClassName = (pod) => {
    if (['ace-flex', 'ace-meet', 'ace-hub'].includes(pod.slug)) return '';
    const menuItem = getMenuPodItemBySlug(pod.slug);
    if (menuItem?.imageClassName?.includes('mix-blend-multiply')) return 'mix-blend-multiply';
    return '';
  };
  const getHomepagePodCardImage = (pod) => {
    if (pod.slug === 'ace-flex') return aceFlexGreyAshCutout;
    if (pod.slug === 'ace-meet') return aceMeetGreyAshCutout;
    if (pod.slug === 'ace-hub') return aceHubGreyAshCutout;
    const menuItem = getMenuPodItemBySlug(pod.slug);
    return menuItem?.image || pod.thumbImage;
  };
  const getMobileHomepagePodImageClassName = (pod) => {
    const offsetClass = mobileImageOffsetBySlug[pod.slug] || 'translate-x-0';
    return `${getHomepagePodImageClassName(pod)} ${offsetClass} ${getHomepagePodImageBlendClassName(pod)}`.trim();
  };
  const homepageCardHeadlineBySlug = {
    'ace-solo': 'Compact pod for calls\nand quick tasks',
    'ace-plus': 'Built for privacy, focus\nand sound control',
    'ace-flex': 'Spacious pod for comfort\nand focus',
    'ace-flex-duo': 'Two-person pod for\nfocused work',
    'ace-meet': 'Meeting pod for\nsmall teams',
    'ace-hub': 'Meeting pod for\nlarger teams'
  };
  const getHomepageCardHeadline = (pod) => homepageCardHeadlineBySlug[pod.slug] || pod.shortDesc;

  const renderPodCard = (pod, extraClass = '') => (
    <Link
      key={pod.slug}
      to={`/pods/${pod.slug}`}
      onClick={() => trackProductCta(pod, 'Explore', 'homepage_product_card_desktop', `/pods/${pod.slug}`)}
      className={`group relative min-h-[400px] overflow-hidden rounded-[16px] bg-[#eeece7] md:h-[530px] md:rounded-[8px] ${extraClass}`}
    >
      <div className="relative z-10 flex h-full flex-col items-center px-6 pb-8 pt-8 md:pt-10">
        <h3 className="relative -top-1 mb-8 whitespace-pre-line text-center text-[15px] font-semibold tracking-wide text-[#505050] md:text-[15px]">
          {pod.name}
        </h3>
        <div className="mb-10 flex w-full items-center justify-center px-2">
          <div className="flex h-[210px] w-[210px] items-center justify-center md:h-[230px] md:w-[230px]">
            <img
              src={getHomepagePodCardImage(pod)}
              alt={`${pod.name} acoustic office pod`}
              width="990"
              height="990"
              className={getMobileHomepagePodImageClassName(pod)}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <p className="mb-5 max-w-[18ch] whitespace-pre-line text-center text-[19px] font-semibold leading-[1.3] text-[#3c3c3c] md:text-[20px]">
          {getHomepageCardHeadline(pod)}
        </p>
        <p className="mb-2 min-h-[18px] text-center text-[12px] font-medium text-[#7a7a7a] md:text-[12px]">
          {pod.cardSupport}
        </p>
        {pod.cardNote && (
          <p className="mb-6 min-h-[16px] text-center text-[11px] font-medium text-[#68726f]">
            {pod.cardNote}
          </p>
        )}
        <div className="absolute bottom-8 left-0 flex w-full translate-y-0 justify-center opacity-100 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <span className="rounded-[4px] bg-[#00855a] px-7 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#006e4a] md:py-2.5">
            Explore
          </span>
        </div>
      </div>
    </Link>
  );

  const renderMobilePodCard = (pod) => (
    <div key={`mobile-${pod.slug}`} className="relative min-h-[660px] overflow-hidden rounded-[22px] bg-[#eeece7] px-6 pb-8 pt-10">
      <div className="relative z-10 flex h-full flex-col items-center text-center">
        <div className="max-w-[300px]">
          <h3 className="text-[16px] font-semibold tracking-[0.01em] text-[#636a74]">{pod.name}</h3>
          <p className="mt-4 text-[22px] font-semibold leading-[1.22] tracking-tight text-[#3d434b]">
            {getHomepageCardHeadline(pod)}
          </p>
          <p className="mt-3 text-[15px] font-medium leading-[1.4] text-[#6d7580]">{pod.cardSupport}</p>
          {pod.cardNote && <p className="mt-2 text-[13px] font-medium leading-[1.4] text-[#68726f]">{pod.cardNote}</p>}
        </div>

        <div className="mt-auto w-full pt-8">
          <div className="mx-auto flex h-[300px] w-[300px] max-w-full items-center justify-center">
            <img
              src={getHomepagePodCardImage(pod)}
              alt={`${pod.name} acoustic office pod`}
              width="990"
              height="990"
              className={`${getHomepagePodImageClassName(pod)} ${getHomepagePodImageBlendClassName(pod)}`.trim()}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="mt-[84px] flex justify-center">
            <Link
              to={`/pods/${pod.slug}`}
              onClick={() => trackProductCta(pod, 'Explore', 'homepage_product_card_mobile', `/pods/${pod.slug}`)}
              className="rounded-[6px] bg-[#00855a] px-9 py-3.5 text-[16px] font-bold text-white"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans antialiased text-[#172126]">
      <SeoMeta
        title={HOME_META.title}
        description={HOME_META.description}
        canonical={buildCanonical('/')}
        keywords={`${SEO_KEYWORDS_COMMON}, office booth provider`}
        schemas={homepageSchemas}
      />
      <nav
        ref={navRef}
        className={`fixed top-0 z-50 h-[64px] w-full transition-all duration-300 md:h-[80px] ${scrolled ? 'h-[60px] bg-white shadow-sm md:h-[70px]' : 'bg-white'}`}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 md:px-12">
          <div className="flex items-center gap-8 lg:gap-16">
            <img src={acePodsLogo} alt="Ace Pods" width="56" height="56" className="h-8 w-auto cursor-pointer md:h-14" />
            <div className="hidden items-center gap-9 lg:flex">
              {navItems.map((item) => {
                const isSmartPods = item.type === 'smart-pods';
                if (isSmartPods) {
                  return (
                    <div key={item.label} className="group flex cursor-pointer items-center gap-1.5">
                      <Link
                        to="/office-pods"
                        onClick={() => setIsSmartPodsDesktopOpen(false)}
                        className="text-[16px] font-medium text-[#172126] transition-colors group-hover:text-[#00855a]"
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
                    className="text-[16px] font-medium text-[#172126] transition-colors hover:text-[#00855a]"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <CurrencySwitcher className="hidden lg:flex" />
            <Link
              to="/installation-support#book-viewing"
              onClick={() =>
                pushDataLayerEvent('header_contact_click', {
                  cta_location: 'homepage_header',
                  cta_text: 'Contact us',
                  destination_url: '/installation-support#book-viewing'
                })
              }
              className="hidden rounded-[4px] bg-[#00855a] px-6 py-2.5 text-[15px] font-semibold text-white transition-all hover:bg-[#006e4a] sm:inline-flex"
            >
              Contact us
            </Link>

            <div className="flex items-center gap-4 lg:hidden">
              <button className="p-1 text-[#172126]" onClick={() => setIsMenuOpen(true)}>
                <Menu size={27} />
              </button>
            </div>
          </div>
        </div>

        {isSmartPodsDesktopOpen && <SmartPodsBanner items={smartPodsMenuItems} onItemClick={() => setIsSmartPodsDesktopOpen(false)} />}
      </nav>

      <div
        className={`fixed inset-0 z-[100] flex h-[100dvh] flex-col transform overflow-hidden bg-white transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <img src={acePodsLogo} alt="Ace Pods" width="32" height="32" className="h-8 w-auto" />
          <button onClick={() => setIsMenuOpen(false)} className="p-2">
            <X size={32} />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-8 pb-14 [-webkit-overflow-scrolling:touch]">
          <div className="space-y-8">
          {navItems.map((item) => {
            const isSmartPods = item.type === 'smart-pods';
            if (isSmartPods) {
              return (
                <div key={item.label} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Link
                      to="/office-pods"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsSmartPodsMobileOpen(false);
                      }}
                      className="text-2xl font-bold tracking-tight"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsSmartPodsMobileOpen((prev) => !prev)}
                      className="inline-flex items-center"
                      aria-label={`${isSmartPodsMobileOpen ? 'Close' : 'Open'} Office Pods menu`}
                    >
                      <ChevronDown className={`text-[#00855a] transition-transform ${isSmartPodsMobileOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {isSmartPodsMobileOpen && (
                    <div className="space-y-10 border-t border-[#d9d9d9] pt-6">
                      {smartPodsMenuItems.map((item) => (
                        <Link
                          key={item.title}
                          to={item.to}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsSmartPodsMobileOpen(false);
                          }}
                          className="block text-center"
                        >
                          <div className="mx-auto h-[260px] w-full max-w-[230px]">
                            <img src={item.image} alt={item.title} className={`h-full w-full object-contain ${item.imageClassName || ''}`} />
                          </div>
                          <h3 className="mt-4 text-[20px] font-semibold tracking-tight text-[#007653]">{item.title}</h3>
                          <p className="mx-auto mt-2 max-w-[280px] text-[14px] leading-[1.5] text-[#68726f]">{item.description}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link key={item.label} to={item.to} onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between">
                <span className="text-2xl font-bold tracking-tight">{item.label}</span>
                <ChevronRight className="text-[#00855a]" />
              </Link>
            );
          })}
          </div>
        </div>
      </div>

      <div className="pt-[64px] md:pt-[80px]">
        <section className="px-0 pt-0 md:px-12 md:pt-7">
          <div className="mx-auto max-w-[1440px] overflow-hidden bg-[#172126]">
            <div className="relative min-h-[610px] overflow-hidden md:min-h-[620px]">
              <picture>
                <source srcSet={acePodsHeroAvif} type="image/avif" />
                <img
                  src={acePodsHero}
                  alt="Acoustic office pods for calls and focused work in an open office"
                  width="1672"
                  height="941"
                  className="demo2-mobile-hero-pan absolute inset-0 h-full w-full object-cover object-[50%_42%] brightness-[0.91] contrast-[0.94] saturate-[0.82] md:brightness-[1.05]"
                  fetchPriority="high"
                />
              </picture>

              <div className="absolute inset-0 bg-black/40 md:hidden" />
              <div className="relative flex min-h-[610px] items-center px-7 md:min-h-[620px] md:px-12 lg:px-16">
                <div className="max-w-[535px] py-10 text-white md:py-12">
                  <h1 className="max-w-[15ch] text-[54px] font-semibold leading-[0.96] tracking-[-0.055em] [text-shadow:0_2px_16px_rgba(0,0,0,0.55),0_1px_4px_rgba(0,0,0,0.45)] md:text-[64px]">
                    Less noise.<br />More work done.
                  </h1>
                  <p className="mt-8 max-w-[31ch] text-[19px] font-normal leading-[1.48] text-white/92 [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] md:text-[20px]">
                    {heroSupportingText}
                  </p>
                  <div className="mt-9 flex flex-col gap-3 md:flex-row">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        pushDataLayerEvent('whatsapp_click', {
                          cta_location: 'homepage_hero',
                          cta_text: 'Visit the Showroom',
                          destination_url: WHATSAPP_LINK,
                          contact_method: 'whatsapp'
                        })
                      }
                      className="w-full bg-[#00855a] px-7 py-4 text-center text-[16px] font-semibold text-white transition-colors hover:bg-[#006e4a] md:w-auto md:py-3.5"
                    >
                      Visit the Showroom
                    </a>
                    <Link
                      to="/pricing#all-pod-prices"
                      onClick={() =>
                        pushDataLayerEvent('pricing_cta_click', {
                          cta_location: 'homepage_hero',
                          cta_text: 'Get Pricing',
                          destination_url: '/pricing#all-pod-prices'
                        })
                      }
                      className="w-full border border-white/70 px-7 py-4 text-center text-[16px] font-semibold text-white transition-colors hover:bg-white/10 md:w-auto md:py-3.5 md:font-medium"
                    >
                      Get Pricing
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/12 bg-[#132126] px-7 py-6 md:px-12 md:py-5">
              <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-10">
                {heroProofItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <item.icon size={14} strokeWidth={2} className="shrink-0 text-[#007653]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/90">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── POD STRIP ── */}
        <PodStrip />

        {/* ── LOGO MARQUEE ── moved up for early social proof */}
        <section className="overflow-hidden bg-white py-16 md:py-24">
          <h2 className="mb-10 px-5 text-center text-[22px] font-bold leading-[1.3] tracking-tight text-[#172126] md:mb-12 md:text-[32px]">
            {trustSectionHeading}
          </h2>
          <div className="logo-marquee px-5 pb-6">
            <div className="logo-marquee-track">
              {[...trustedLogos, ...trustedLogos].map((logo, idx) => (
                <div
                  key={`${logo.name}-${idx}`}
                  className="logo-marquee-card flex min-h-[88px] min-w-[170px] items-center justify-center rounded-[6px] border border-[#e8e8e8] bg-[#f7f6f2] px-4 md:min-h-[98px] md:min-w-[210px] md:px-5"
                >
                  <div className={`flex h-[60px] w-full items-center justify-center overflow-hidden md:h-[64px] ${logo.logoStageClass || ''}`}>
                    <img
                      src={logo.image}
                      alt={logo.name}
                      width="210"
                      height="64"
                      className={`h-full w-full object-contain ${logo.fitClass || ''}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PODS VS RENOVATION ── problem framing before product grid */}
        <section className="hidden border-b border-[#f0f0f0] bg-white px-5 pt-8 pb-16 md:block md:px-12 md:pt-16 md:pb-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 max-w-none text-center md:mb-24">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#68726f] md:mb-6 md:text-[11px]">
                Pods instead of renovation
              </span>
              <h2 className="mb-6 text-[22px] font-bold leading-[1.1] tracking-tight text-[#172126] md:text-[32px]">
                {privateSpaceHeading}
              </h2>
              <p className="mx-auto max-w-[760px] text-[15px] leading-[1.6] text-[#59635f] md:text-[17px] xl:max-w-none xl:whitespace-nowrap">
                A more practical way to create quiet, usable office space for calls, focus, and meetings.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-10 lg:gap-14">
              {activeRenovationPoints.map((item) => (
                <article key={item.num} className="flex flex-col">
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-[#e9e7e1]">
                    <picture>
                      <source
                        srcSet={
                          item.image === officeOneImage
                            ? officeOneImageAvif
                            : item.image === officeTwoImage
                              ? officeTwoImageAvif
                              : officeThreeImageAvif
                        }
                        type="image/avif"
                      />
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        width="1600"
                        height="1000"
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                  <div className="mt-6 border-t border-[#717171] pt-6 md:mt-7 md:pt-7">
                    <span className="mb-3 block text-[12px] font-extrabold tracking-widest text-[#00855a] md:mb-5 md:text-[13px]">{item.num}</span>
                    <h3 className="mb-3 text-[20px] font-bold leading-[1.25] tracking-tight text-[#172126] md:mb-4 md:text-[26px]">{item.title}</h3>
                    <p className="text-[15px] leading-[1.65] text-[#59635f] md:text-[16px]">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-12 flex max-w-[760px] flex-col items-center gap-2 rounded-[14px] border border-[#e0ddd6] bg-[#eeece7] px-6 py-6 text-center md:mt-16 md:py-8">
              <Truck className="h-5 w-5 text-[#007653]" aria-hidden="true" />
              <p className="text-[15px] font-semibold text-[#172126] md:text-[16px]">Your pod moves when you do.</p>
              <p className="max-w-[56ch] text-[14px] leading-[1.6] text-[#59635f] md:text-[15px]">
                Unlike a built room, a pod can be dismantled, transported, and reinstalled at your next office.
              </p>
              <Link to="/pod-relocation" className="mt-1 text-[14px] font-semibold text-[#007653] underline-offset-4 hover:underline">
                See how pod relocation works →
              </Link>
            </div>
          </div>
        </section>

        {/* ── POD RELOCATION CALLOUT (mobile only — desktop version lives inside the hidden PODS VS RENOVATION section above) ── */}
        <section className="border-b border-[#f0f0f0] bg-white px-5 pb-10 pt-0 md:hidden">
          <div className="mx-auto flex max-w-[520px] flex-col items-center gap-2 rounded-[14px] border border-[#e0ddd6] bg-[#eeece7] px-6 py-6 text-center">
            <Truck className="h-5 w-5 text-[#007653]" aria-hidden="true" />
            <p className="text-[15px] font-semibold text-[#172126]">Your pod moves when you do.</p>
            <p className="max-w-[56ch] text-[14px] leading-[1.6] text-[#59635f]">
              Unlike a built room, a pod can be dismantled, transported, and reinstalled at your next office.
            </p>
            <Link to="/pod-relocation" className="mt-1 text-[14px] font-semibold text-[#007653] underline-offset-4 hover:underline">
              See how pod relocation works →
            </Link>
          </div>
        </section>

        {/* ── WHY PODS MAKE SENSE ── educate before product grid */}
        <section className="bg-[#eeece7] px-5 pt-12 pb-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <div className="mx-auto max-w-[760px] text-center">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#68726f] md:text-[12px]">DOES THIS SOUND FAMILIAR?</span>
              <h2 className="text-[22px] font-bold leading-[1.1] tracking-tight text-[#172126] md:text-[32px]">
                Is your office dealing with this?
              </h2>
              <p className="mx-auto mt-5 hidden text-[15px] leading-[1.6] text-[#68726f] md:block md:text-[16px]">
                Hover each card to see how a pod fixes it.
              </p>
            </div>

            {/* Mobile: accordion */}
            <div className="mt-8 overflow-hidden rounded-[12px] border border-[#e0ddd6] bg-white md:hidden">
              {activeOfficeSenseItems.map((item, idx) => {
                const isOpen = openSenseIdx === idx;
                return (
                  <div key={item.title} className={idx < activeOfficeSenseItems.length - 1 ? 'border-b border-[#f0ede8]' : ''}>
                    <button
                      className="flex w-full items-center gap-3 px-5 py-4 text-left"
                      onClick={() => setOpenSenseIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <item.icon size={20} strokeWidth={2} className="shrink-0 text-[#00855a]" />
                      <span className="flex-1 text-[15px] font-bold text-[#172126]">{item.title}</span>
                      <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        className={`shrink-0 text-[#68726f] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className={`grid transition-all duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <p className="px-5 pb-4 text-[14px] leading-[1.65] text-[#59635f]">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop: hover cards */}
            <div className="mt-12 hidden grid-cols-2 gap-3 md:grid lg:grid-cols-3">
              {activeOfficeSenseItems.map((item) => (
                <article key={item.title} className="group cursor-default rounded-[8px] border border-[#dddddd] bg-[#f7f6f2] p-6 transition-all duration-200 hover:border-[#c0c0c0] hover:bg-white hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <item.icon size={22} strokeWidth={2} className="shrink-0 text-[#00855a]" />
                    <h3 className="text-[17px] font-bold leading-snug tracking-tight text-[#172126] md:text-[18px]">{item.title}</h3>
                  </div>
                  <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-3 text-[14px] leading-[1.65] text-[#59635f]">{item.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCT GRID ── buyer is ready after education */}
        <section className="relative overflow-hidden bg-white px-5 pt-8 pb-16 md:px-12 md:pt-12 md:pb-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-10 flex flex-col items-center justify-center gap-4 text-center md:mb-12">
              <div className="mx-auto max-w-[980px]">
                <h2 className="whitespace-pre-line text-[22px] font-bold leading-[1.1] tracking-tight text-[#172126] md:text-[32px]">
                  {productIntroHeading}
                </h2>

                {/* Mobile: short version */}
                <p id="home-answer" className="mt-4 text-left text-[14px] leading-[1.6] text-[#59635f] md:hidden">
                  100% made in Malaysia — same team from factory to installation. 27 dBA noise reduction, verified. 180+ pods installed across Malaysia since 2023.
                </p>

                {/* Desktop: full paragraph */}
                <p className="mx-auto mt-4 hidden max-w-[760px] text-center text-[15px] leading-[1.6] text-[#59635f] md:block md:text-[17px]">
                  Ace Office Pods — 100% made in Malaysia, factory and showroom in Selangor. Five of our six models achieve 27 dBA noise reduction, tested and verified. The same local team handles production, installation, and post-installation support. 180+ pods installed across Malaysia since 2023.
                </p>
              </div>
            </div>

            <div className="relative md:hidden">
              <div className="overflow-hidden" onTouchStart={handlePodTouchStart} onTouchMove={handlePodTouchMove} onTouchEnd={handlePodTouchEnd}>
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${activePodIndex * 100}%)` }}
                >
                  {products.map((pod) => (
                    <div key={`slide-${pod.slug}`} className="w-full shrink-0">
                      {renderMobilePodCard(pod)}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                aria-label="Previous pod"
                onClick={goToPrevPod}
                disabled={activePodIndex === 0}
                className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#eeece7]/90 p-3 text-[#59635f] transition ${
                  activePodIndex === 0 ? 'pointer-events-none opacity-45' : 'hover:bg-[#eeece7]'
                }`}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                aria-label="Next pod"
                onClick={goToNextPod}
                disabled={activePodIndex === products.length - 1}
                className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#eeece7]/90 p-3 text-[#59635f] transition ${
                  activePodIndex === products.length - 1 ? 'pointer-events-none opacity-45' : 'hover:bg-[#eeece7]'
                }`}
              >
                <ChevronRight size={24} />
              </button>

              <div className="mt-5 flex items-center justify-center gap-2.5">
                {products.map((pod, idx) => (
                  <button
                    key={`dot-${pod.slug}`}
                    type="button"
                    aria-label={`Go to ${pod.name}`}
                    onClick={() => setActivePodIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${idx === activePodIndex ? 'w-7 bg-[#555b64]' : 'w-2.5 bg-[#c3c8cf]'}`}
                  />
                ))}
              </div>
            </div>

            <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:hidden">
              {products.map((pod) => renderPodCard(pod, 'w-full'))}
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-4">
                {desktopTopPodCards.map((pod) => renderPodCard(pod, 'w-full'))}
              </div>
              <div className="mt-4 flex justify-center gap-4">
                {desktopBottomPodCards.map((pod) => renderPodCard(pod, 'w-[calc((100%-2rem)/3)]'))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE ACE PODS ── differentiate after product consideration */}
        <section className="bg-white px-5 py-16 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1240px]">
            <div className="mx-auto max-w-[960px] text-center">
              <span className="mb-4 block text-[12px] font-bold uppercase tracking-[0.24em] text-[#757d86] md:mb-5 md:text-[13px]">BEYOND THE PRODUCT</span>
              <h2 className="text-[22px] font-bold leading-[1.1] tracking-tight text-[#172126] md:text-[32px]">Why Choose Ace Pods</h2>
              <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.6] text-[#4c545d] md:text-[17px]">{compareSupportingLine}</p>
              <div className="mx-auto mt-9 flex max-w-[600px] flex-col items-center gap-5 border-t border-[#e4e2dc] pt-9 sm:flex-row sm:items-center sm:gap-6 sm:text-left">
                <img
                  src={zxTayPhoto}
                  alt="ZX Tay, co-founder of Ace Office Pods"
                  width="84"
                  height="84"
                  loading="lazy"
                  decoding="async"
                  className="h-[84px] w-[84px] shrink-0 rounded-full object-cover ring-1 ring-black/10"
                />
                <div>
                  <p className="text-[15px] leading-[1.6] text-[#3f4750] [text-wrap:pretty] md:text-[16px]">
                    “Too many teams get sold a box and left alone after delivery. I&nbsp;started Ace so one local team handles everything&nbsp;— delivery, installation, and after-sales support. If something&rsquo;s ever not right, you know exactly who to call.”
                  </p>
                  <p className="mt-3 text-[13px] font-semibold tracking-wide text-[#172126]">
                    ZX Tay <span className="font-normal text-[#757d86]">· Co-Founder, Ace Office Pods</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
              {activeCompareItems.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-[22px] border border-[#e5e5e2] bg-[#eeece7] shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
                  <div className="aspect-[5/3] w-full">
                    <picture>
                      <source
                        srcSet={
                          item.image === comparePriceImage
                            ? comparePriceImageAvif
                            : item.image === podsInstallationImage
                              ? podsInstallationImageAvif
                              : deliveryPodsImageAvif
                        }
                        type="image/avif"
                      />
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        width="1000"
                        height="600"
                        className={`h-full w-full object-cover ${item.imageClassName || ''}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                  <div className="px-6 pb-8 pt-5 text-left">
                    <h3 className="text-[33px] font-bold leading-[1.12] tracking-tight text-[#172126] md:text-[30px]">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-[#59635f]">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#f0f0f0] bg-white px-5 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-[1200px] rounded-[16px] bg-[#eeece7] px-6 py-12 text-center md:px-12 md:py-16">
            <h2 className="mx-auto max-w-[15ch] text-[22px] font-bold leading-[1.1] tracking-tight text-[#172126] md:max-w-none md:text-[32px]">
              {whyHeading}
            </h2>

            <div className="mt-10 flex flex-col items-center gap-4 md:mt-10 md:grid md:grid-cols-4 md:gap-5">
              {activeReassuranceItems.map((item) => (
                <article key={item.label} className="flex w-full flex-col items-center rounded-[12px] bg-white/50 px-4 py-6 text-center">
                  <item.icon size={38} strokeWidth={1.5} className="text-[#4a9078]" />
                  <h3 className="mt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#172126]">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[#68726f]">{item.desc}</p>
                </article>
              ))}
            </div>

            <Link
              to="/contact"
              onClick={() =>
                pushDataLayerEvent('quote_cta_click', {
                  cta_location: 'homepage_reassurance',
                  cta_text: 'Contact us',
                  destination_url: '/contact'
                })
              }
              className="mt-14 inline-flex items-center rounded-full bg-[#007653] px-10 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#00855a] md:mt-16 md:px-14 md:py-4 md:text-[17px]"
            >
              Contact us
            </Link>
          </div>
        </section>

        <section className="bg-white px-5 py-14 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1360px]">
            <div className="mx-auto max-w-[780px] text-center">
              <h2 className="text-[28px] font-bold leading-[1.1] tracking-tight text-[#172126] md:text-[32px]">Common questions about office pods</h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#59635f] md:text-[17px]">
                A few things buyers usually want to clarify before choosing a pod.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[14px] font-medium text-[#007653] md:text-[15px]">
                <Link to="/office-pods" className="underline-offset-4 hover:underline">
                  View office pods
                </Link>
                <Link to="/compare-office-pods" className="underline-offset-4 hover:underline">
                  Compare office pods
                </Link>
                <Link
                  to="/pricing"
                  onClick={() =>
                    pushDataLayerEvent('pricing_cta_click', {
                      cta_location: 'homepage_faq_links',
                      cta_text: 'View office pod pricing',
                      destination_url: '/pricing'
                    })
                  }
                  className="underline-offset-4 hover:underline"
                >
                  View office pod pricing
                </Link>
                <Link to="/installation-support" className="underline-offset-4 hover:underline">
                  Learn about installation and support
                </Link>
                <Link to="/faq" className="underline-offset-4 hover:underline">
                  Read common questions about office pods
                </Link>
                <Link
                  to="/installation-support#book-viewing"
                  onClick={() =>
                    pushDataLayerEvent('quote_cta_click', {
                      cta_location: 'homepage_faq_links',
                      cta_text: 'Book a viewing with our team',
                      destination_url: '/installation-support#book-viewing'
                    })
                  }
                  className="underline-offset-4 hover:underline"
                >
                  Book a viewing with our team
                </Link>
              </div>
            </div>

            <div className="mt-8 border-t border-[#e3e3e3] md:mt-10">
              {HOME_FAQ_ITEMS.map((item, idx) => {
                const isOpen = openHomepageFaq === idx;
                const answerId = `homepage-faq-answer-${idx}`;
                return (
                  <article key={item.question} className="border-b border-[#e3e3e3]">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => setOpenHomepageFaq(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left md:py-6"
                      >
                        <span className="text-[19px] font-semibold leading-[1.35] tracking-tight text-[#172126] md:text-[20px]">{item.question}</span>
                        <ChevronDown
                          size={20}
                          className={`mt-1 shrink-0 text-[#4a545f] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </h3>
                    <div id={answerId} className={`${isOpen ? 'pb-5 md:pb-6' : 'hidden'}`}>
                      <p className="w-full text-[15px] leading-[1.7] text-[#4f5862] md:text-[17px]">{item.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center md:mt-10">
              <Link
                to="/installation-support#book-viewing"
                onClick={() =>
                  pushDataLayerEvent('quote_cta_click', {
                    cta_location: 'homepage_faq_section',
                    cta_text: 'Contact us',
                    destination_url: '/installation-support#book-viewing'
                  })
                }
                className="inline-flex items-center rounded-[8px] bg-[#00855a] px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#172126]"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>

        <InstagramFeed />
        <SiteFooter className="mt-0" />
      </div>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onClick={() =>
          pushDataLayerEvent('whatsapp_click', {
            cta_location: 'floating_button',
            cta_text: 'WhatsApp',
            destination_url: WHATSAPP_LINK
          })
        }
        className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 md:bottom-8 md:right-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-7 w-7" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
