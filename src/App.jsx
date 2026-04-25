import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Hammer,
  Instagram,
  LayoutGrid,
  LockKeyhole,
  MessageSquare,
  Linkedin,
  Maximize2,
  Menu,
  Route,
  TrendingUp,
  VolumeX,
  X
} from 'lucide-react';
import acePodsLogo from '../Logos/ace pods logo.png';
import acePodsHero from '../assets/pods-hero-v2.png';
import officeOneImage from '../assets/Office-1.png';
import officeTwoImage from '../assets/office-2.png';
import officeThreeImage from '../assets/office-3.png';
import comparePriceImage from '../assets/quotation.jpg';
import podsInstallationImage from '../assets/pods-installation.png';
import deliveryPodsImage from '../assets/delivery-pods.png';
import parkerLogo from '../assets/parker-logo.png';
import cmacgmLogo from '../assets/cmacgm-logo.svg';
import alphabetLogo from '../assets/alphabet-logo.png';
import rightwillLogo from '../assets/rightwill-logo.png';
import matradeLogo from '../assets/matrade-logo.png';
import taylorsUniversityLogo from '../assets/taylorsuniversity.svg';
import jyEliteLogo from '../assets/jy-elite.jpg';
import wsConstructionLogo from '../assets/ws-construction.png';
import idCandyLogo from '../assets/id-candy.jpg';
import SeoMeta from './components/SeoMeta';
import SmartPodsBanner from './components/SmartPodsBanner';
import { smartPodsMenuItems } from './components/smartPodsMenuData';
import { products } from './data/products';
import { HOME_FAQ_ITEMS } from './seo/constants';
import { buildCanonical, createFaqSchema, organizationSchema, websiteSchema } from './seo/schema';

const PlaceholderImage = ({ aspect = 'aspect-video', label = 'Image Placeholder', className = '' }) => (
  <div
    className={`w-full ${aspect} flex flex-col items-center justify-center rounded-sm border border-gray-200 bg-gray-100 text-gray-400 ${className}`}
  >
    <span className="mb-2 px-2 text-center text-[10px] font-bold uppercase tracking-widest md:text-xs">{label}</span>
    <div className="h-px w-10 bg-gray-300 md:w-12"></div>
  </div>
);

const navItems = [
  { label: 'Smart Pods', type: 'smart-pods' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Office Chairs', to: '/office-chairs' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Installation & Support', to: '/installation-support' },
  { label: 'FAQ', to: '/faq' }
];

const WHATSAPP_LINK = 'https://wa.link/9umr4q';
const footerSocialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/acepodsmy/', Icon: Instagram },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ace-workplace-solutions-ace-office-pods-malaysia/?viewAsMember=true',
    Icon: Linkedin
  }
];

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
    label: 'Local installation and support',
    desc: 'Support stays close from planning through post-installation use.'
  },
  {
    icon: Route,
    label: 'From quote to installation, made simple',
    desc: 'Buyers get a clearer path from quote to setup.'
  },
  {
    icon: CheckCircle2,
    label: 'Comfortable for daily use',
    desc: 'Designed for practical everyday office use.'
  },
  {
    icon: Maximize2,
    label: 'Designed to fit modern workplaces',
    desc: 'Pods fit circulation needs, team workflows, and existing layouts.'
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
    title: 'Delivery is not the end of the buying experience',
    desc: 'When something needs adjusting or servicing, clear support makes the pod easier to manage.',
    image: deliveryPodsImage,
    imageAlt: 'Office pod support and post-delivery use',
    imageClassName: 'object-[center_70%]'
  }
];

const trustedLogos = [
  { name: 'Parker Hanifin', image: parkerLogo, fitClass: 'scale-[0.92]', logoStageClass: 'max-h-[52px] max-w-[168px]' },
  { name: 'CMA CGM Shipping', image: cmacgmLogo, fitClass: 'scale-[0.98]', logoStageClass: 'max-h-[52px] max-w-[176px]' },
  { name: 'Alphabet Capital Sdn Bhd', image: alphabetLogo, fitClass: 'scale-[0.94]', logoStageClass: 'max-h-[50px] max-w-[176px]' },
  { name: 'JY Elite', image: jyEliteLogo, fitClass: 'scale-[0.98]', logoStageClass: 'max-h-[52px] max-w-[176px]' },
  { name: 'WS Construction', image: wsConstructionLogo, fitClass: 'scale-[0.98]', logoStageClass: 'max-h-[52px] max-w-[176px]' },
  { name: 'ID Candy', image: idCandyLogo, fitClass: 'scale-[0.98]', logoStageClass: 'max-h-[52px] max-w-[176px]' },
  { name: 'Rightwill Sdn Bhd', image: rightwillLogo, fitClass: 'scale-[0.88] -translate-y-[1px]', logoStageClass: 'max-h-[52px] max-w-[170px]' },
  {
    name: 'Malaysia External Trade Development Corporation (MATRADE)',
    image: matradeLogo,
    fitClass: 'scale-[0.96]',
    logoStageClass: 'max-h-[48px] max-w-[176px]'
  },
  { name: "Taylor's University Lakeside", image: taylorsUniversityLogo, fitClass: 'scale-[1.10]', logoStageClass: 'max-h-[52px] max-w-[172px]' }
];

const footerLinkGroups = [
  {
    key: 'products',
    title: 'Products',
      links: [
        { label: 'Ace Solo', to: '/pods/ace-solo' },
        { label: 'Ace Plus', to: '/pods/ace-plus' },
        { label: 'Ace Flex', to: '/pods/ace-flex' },
        { label: 'Ace Meet', to: '/pods/ace-meet' },
        { label: 'Ace Hub', to: '/pods/ace-hub' }
      ]
  },
  {
    key: 'company',
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Explore', href: '#' },
      { label: 'Professionals', href: '#' }
    ]
  },
  {
    key: 'support',
    title: 'Support',
    links: [
      { label: 'Contact us', href: '#' },
      { label: 'Installation & delivery', href: '#' },
      { label: 'After-sales support', href: '#' }
    ]
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmartPodsDesktopOpen, setIsSmartPodsDesktopOpen] = useState(false);
  const [isSmartPodsMobileOpen, setIsSmartPodsMobileOpen] = useState(false);
  const [openFooterGroup, setOpenFooterGroup] = useState('products');
  const [openHomepageFaq, setOpenHomepageFaq] = useState(0);
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
  const desktopBottomPodCards = products.slice(3, 5);

  const heroHeadline = 'Office pods for calls, focus, and meetings';
  const heroSupportingText = 'Add private space for calls, focused work, and meetings without building new rooms.';
  const heroTrustLine = 'A practical alternative to building new rooms';
  const productIntroHeading = 'Choose the right office pod for calls, focus, or meetings';
  const privateSpaceHeading = 'Add private space without building new rooms';
  const compareSupportingLine = 'Compare more confidently when pricing, installation, and support are clear upfront.';
  const trustSectionHeading = 'Trusted by local and international companies';
  const whyHeading = 'Choose AcePods';
  const footerBrandLine = 'Acoustic office pods for calls, focus, and meetings';
  const homepageSchemas = [organizationSchema, websiteSchema, createFaqSchema('/', HOME_FAQ_ITEMS)];

  const renderPodCard = (pod, extraClass = '') => (
    <Link
      key={pod.slug}
      to={`/pods/${pod.slug}`}
      className={`group relative min-h-[400px] overflow-hidden rounded-[16px] bg-[#EAEAEA] md:h-[500px] md:rounded-[8px] ${extraClass}`}
    >
      <div className="relative z-10 flex h-full flex-col items-center px-6 pb-8 pt-8 md:pt-10">
        <h3 className="relative -top-1 mb-8 whitespace-pre-line text-center text-[15px] font-semibold tracking-wide text-[#505050] md:text-[15px]">
          {pod.name}
        </h3>
        <div className="mb-10 flex w-full items-center justify-center px-2">
          <div className="aspect-square w-full max-w-[180px] md:max-w-[200px]">
            <img
              src={pod.thumbImage}
              alt={pod.name}
              className={`h-full w-full object-contain transition-transform duration-300 ${pod.imageScale}`}
            />
          </div>
        </div>
        <p className="mb-5 max-w-[13ch] whitespace-pre-line text-center text-[19px] font-semibold leading-[1.3] text-[#3c3c3c] md:text-[20px]">
          {pod.shortDesc}
        </p>
        <p className="mb-2 min-h-[18px] text-center text-[12px] font-medium text-[#7a7a7a] md:text-[12px]">
          {pod.cardSupport}
        </p>
        {pod.cardNote && (
          <p className="mb-6 min-h-[16px] text-center text-[11px] font-medium text-[#999999]">
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
    <div key={`mobile-${pod.slug}`} className="relative min-h-[660px] overflow-hidden rounded-[22px] bg-[#EAEAEA] px-6 pb-8 pt-10">
      <div className="relative z-10 flex h-full flex-col items-center text-center">
        <div className="max-w-[300px]">
          <h3 className="text-[16px] font-semibold tracking-[0.01em] text-[#636a74]">{pod.name}</h3>
          <p className="mt-4 text-[22px] font-semibold leading-[1.22] tracking-tight text-[#3d434b]">{pod.shortDesc}</p>
          <p className="mt-3 text-[15px] font-medium leading-[1.4] text-[#6d7580]">{pod.cardSupport}</p>
          {pod.cardNote && <p className="mt-2 text-[13px] font-medium leading-[1.4] text-[#7f8792]">{pod.cardNote}</p>}
        </div>

        <div className="mt-auto w-full pt-8">
          <div className="mx-auto aspect-square w-full max-w-[288px]">
            <img
              src={pod.thumbImage}
              alt={pod.name}
              className={`h-full w-full object-contain ${pod.imageScale}`}
            />
          </div>
          <div className="mt-[84px] flex justify-center">
            <Link to={`/pods/${pod.slug}`} className="rounded-[6px] bg-[#00855a] px-9 py-3.5 text-[16px] font-bold text-white">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans antialiased text-[#1a1a1a]">
      <SeoMeta
        title="Office Pods for Calls, Focus and Meetings | AcePods"
        description="Explore office pods for calls, focused work, and meetings. Add private space without major renovation, with clear pricing, installation, and support from AcePods."
        canonical={buildCanonical('/')}
        schemas={homepageSchemas}
      />
      <nav
        ref={navRef}
        className={`fixed top-0 z-50 h-[64px] w-full transition-all duration-300 md:h-[80px] ${scrolled ? 'h-[60px] bg-white shadow-sm md:h-[70px]' : 'bg-white'}`}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 md:px-12">
          <div className="flex items-center gap-8 lg:gap-16">
            <img src={acePodsLogo} alt="Ace Pods" className="h-8 w-auto cursor-pointer md:h-14" />
            <div className="hidden items-center gap-9 lg:flex">
              {navItems.map((item) => {
                const isSmartPods = item.type === 'smart-pods';
                if (isSmartPods) {
                  return (
                    <div key={item.label} className="group flex cursor-pointer items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setIsSmartPodsDesktopOpen((prev) => !prev)}
                        className="text-[16px] font-medium text-[#111111] transition-colors group-hover:text-[#00855a]"
                      >
                        {item.label}
                      </button>
                      <button
                        type="button"
                        aria-label={`${isSmartPodsDesktopOpen ? 'Close' : 'Open'} Smart Pods menu`}
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
                    className="text-[16px] font-medium text-[#111111] transition-colors hover:text-[#00855a]"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Link
              to="/installation-support#book-viewing"
              className="hidden rounded-[4px] bg-[#00855a] px-6 py-2.5 text-[15px] font-semibold text-white transition-all hover:bg-[#006e4a] sm:inline-flex"
            >
              Contact us
            </Link>

            <div className="flex items-center gap-4 lg:hidden">
              <button className="p-1 text-[#111111]" onClick={() => setIsMenuOpen(true)}>
                <Menu size={27} />
              </button>
            </div>
          </div>
        </div>

        {isSmartPodsDesktopOpen && <SmartPodsBanner items={smartPodsMenuItems} onItemClick={() => setIsSmartPodsDesktopOpen(false)} />}
      </nav>

      <div
        className={`fixed inset-0 z-[100] transform bg-white transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <img src={acePodsLogo} alt="Ace Pods" className="h-8 w-auto" />
          <button onClick={() => setIsMenuOpen(false)} className="p-2">
            <X size={32} />
          </button>
        </div>
        <div className="h-[calc(100vh-80px)] space-y-8 overflow-y-auto p-8">
          {navItems.map((item) => {
            const isSmartPods = item.type === 'smart-pods';
            if (isSmartPods) {
              return (
                <div key={item.label} className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setIsSmartPodsMobileOpen((prev) => !prev)}
                    className="group flex w-full items-center justify-between"
                  >
                    <span className="text-2xl font-bold tracking-tight">{item.label}</span>
                    <ChevronDown className={`text-[#00855a] transition-transform ${isSmartPodsMobileOpen ? 'rotate-180' : ''}`} />
                  </button>
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
                          <h3 className="mt-4 text-[20px] font-semibold tracking-tight text-[#0e5a60]">{item.title}</h3>
                          <p className="mx-auto mt-2 max-w-[280px] text-[14px] leading-[1.5] text-[#666666]">{item.description}</p>
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

      <div className="pt-[64px] md:pt-[80px]">
        <section className="relative flex h-[560px] items-end justify-start pb-8 sm:h-[620px] sm:pb-8 lg:h-[600px] lg:items-center lg:justify-end lg:pb-0">
          <div className="absolute inset-0 z-0">
            <img
              src={acePodsHero}
              alt="Acoustic office pods for calls and focused work in an open office"
              className="h-full w-full object-cover object-[16%_10%] sm:object-[14%_12%] md:object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.08)_24%,rgba(0,0,0,0.22)_52%,rgba(0,0,0,0.58)_100%)] md:bg-black/22 lg:bg-black/18"></div>
          </div>

          <div className="relative z-10 w-full max-w-[1440px] px-4 md:mx-auto md:px-12">
            <div className="w-full max-w-none px-6 py-0 text-left text-white sm:px-6 lg:ml-auto lg:max-w-[640px] lg:bg-black/50 lg:px-8 lg:py-10">
              <div className="max-w-none md:max-w-[520px]">
                <h1 className="mb-4 max-w-[16ch] text-[35px] font-bold leading-[1.03] tracking-[-0.03em] sm:max-w-[18ch] sm:text-[39px] md:mb-6 md:max-w-none md:text-[65px]">
                  {heroHeadline}
                </h1>
                <p className="mb-5 max-w-[32ch] text-[18px] font-semibold leading-[1.5] text-white/92 sm:max-w-[36ch] sm:text-[20px] md:mb-4 md:max-w-lg md:text-[28px]">
                  {heroSupportingText}
                </p>
                <p className="mb-7 max-w-none whitespace-nowrap text-[12px] font-semibold leading-[1.4] tracking-[0.01em] text-white/78 sm:text-[13px] md:mb-8 md:text-[17px]">
                  {heroTrustLine}
                </p>

                <div className="flex flex-row items-stretch justify-start gap-3 md:flex-row md:items-center md:gap-4">
                  <Link
                    to="/pricing#all-pod-prices"
                    className="min-w-0 flex-1 rounded-[6px] bg-white px-3.5 py-2.5 text-center text-[14px] font-bold text-[#111111] transition-colors hover:bg-gray-100 md:flex-1 md:rounded-full md:px-8 md:py-4 md:text-[18px]"
                  >
                    Get Pricing
                  </Link>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 flex-1 rounded-[6px] border border-white/90 bg-transparent px-3.5 py-2.5 text-center text-[14px] font-semibold text-white transition-colors hover:bg-white/10 md:flex-1 md:rounded-full md:px-8 md:py-4 md:text-[18px]"
                  >
                    Book Viewing
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 pt-8 pb-16 md:px-12 md:pt-12 md:pb-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-8 flex flex-col items-start justify-between gap-6 md:mb-10 md:flex-row md:items-end">
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-tight text-[#222222] sm:text-[30px] md:text-[38px]">
                {productIntroHeading}
              </h2>
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
                className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#d9d9d9]/90 p-3 text-[#4f555d] transition ${
                  activePodIndex === 0 ? 'pointer-events-none opacity-45' : 'hover:bg-[#d2d2d2]'
                }`}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                aria-label="Next pod"
                onClick={goToNextPod}
                disabled={activePodIndex === products.length - 1}
                className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#d9d9d9]/90 p-3 text-[#4f555d] transition ${
                  activePodIndex === products.length - 1 ? 'pointer-events-none opacity-45' : 'hover:bg-[#d2d2d2]'
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

        <section className="hidden border-b border-[#f0f0f0] bg-white px-5 py-16 md:block md:px-12 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 max-w-none md:mb-24">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#666666] md:mb-6 md:text-[11px]">
                Pods instead of renovation
              </span>
              <h2 className="mb-6 text-[28px] font-bold leading-[1.1] tracking-tight text-[#111111] sm:text-[36px] md:text-[48px] lg:text-[52px] xl:whitespace-nowrap">
                {privateSpaceHeading}
              </h2>
              <p className="max-w-none text-[16px] leading-[1.6] text-[#555555] md:text-[20px] xl:whitespace-nowrap">
                A more practical way to create quiet, usable office space for calls, focus, and meetings.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-10 lg:gap-14">
              {activeRenovationPoints.map((item) => (
                <article key={item.num} className="flex flex-col">
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-[#eceae3]">
                    <img src={item.image} alt={item.imageAlt} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-6 border-t border-[#717171] pt-6 md:mt-7 md:pt-7">
                    <span className="mb-3 block text-[12px] font-extrabold tracking-widest text-[#00855a] md:mb-5 md:text-[13px]">{item.num}</span>
                    <h3 className="mb-3 text-[20px] font-bold leading-[1.25] tracking-tight text-[#111111] md:mb-4 md:text-[26px]">{item.title}</h3>
                    <p className="text-[15px] leading-[1.65] text-[#555555] md:text-[16px]">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F6F5F0] px-5 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1240px]">
            <div className="mx-auto max-w-[900px] text-center">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#62727b] md:text-[12px]">WHY OFFICE PODS MAKE SENSE</span>
              <h2 className="text-[36px] font-extrabold leading-[1.08] tracking-tight text-[#111111] sm:text-[44px] md:text-[56px]">
                Add Quiet, Private Space
                <br className="hidden md:block" />
                Without Renovating Your Office
              </h2>
              <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-[1.65] text-[#4f5660] md:text-[20px]">
                Ace Pods help teams take calls, focus, meet, and recharge inside busy open offices - without permanent construction or major disruption.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeOfficeSenseItems.map((item) => (
                <article key={item.title} className="rounded-[8px] border border-[#dddddd] bg-[#f8f8f8] p-6">
                  <div className="flex items-start gap-4">
                    <item.icon size={36} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[#2a3138]" />
                    <div className="text-left">
                      <h3 className="text-[24px] font-bold leading-[1.12] tracking-tight text-[#111111] md:text-[26px]">{item.title}</h3>
                      <p className="mt-2 text-[16px] leading-[1.6] text-[#4f5660] md:text-[17px]">{item.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F6F5F0] px-5 py-16 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1240px]">
            <div className="mx-auto max-w-[960px] text-center">
              <span className="mb-4 block text-[12px] font-bold uppercase tracking-[0.24em] text-[#757d86] md:mb-5 md:text-[13px]">BEYOND THE PRODUCT</span>
              <h2 className="text-[36px] font-extrabold leading-[1.08] tracking-tight text-[#111111] sm:text-[44px] md:text-[52px]">Why Choose AcePods</h2>
              <p className="mx-auto mt-5 max-w-[70ch] text-[16px] leading-[1.65] text-[#4c545d] md:text-[19px]">{compareSupportingLine}</p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
              {activeCompareItems.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-[22px] border border-[#e5e5e2] bg-[#f2f2f0] shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
                  <div className="aspect-[5/3] w-full">
                    <img src={item.image} alt={item.imageAlt} className={`h-full w-full object-cover ${item.imageClassName || ''}`} />
                  </div>
                  <div className="px-6 pb-8 pt-5 text-left">
                    <h3 className="text-[33px] font-bold leading-[1.12] tracking-tight text-[#111111] md:text-[30px]">{item.title}</h3>
                    <p className="mt-3 text-[17px] leading-[1.65] text-[#4f5660]">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-white py-16 md:py-24">
          <h2 className="mb-10 px-5 text-center text-[22px] font-bold leading-[1.3] tracking-tight text-[#111111] md:mb-12 md:text-[32px]">
            {trustSectionHeading}
          </h2>
          <div className="logo-marquee px-5 pb-6">
            <div className="logo-marquee-track">
              {[...trustedLogos, ...trustedLogos].map((logo, idx) => (
                <div
                  key={`${logo.name}-${idx}`}
                  className="logo-marquee-card flex min-h-[88px] min-w-[170px] items-center justify-center rounded-[6px] border border-[#e8e8e8] bg-[#FAFAFA] px-4 md:min-h-[98px] md:min-w-[210px] md:px-5"
                >
                  <div className={`flex h-[60px] w-full items-center justify-center overflow-hidden md:h-[64px] ${logo.logoStageClass || ''}`}>
                    <img src={logo.image} alt={logo.name} className={`h-full w-full object-contain ${logo.fitClass || ''}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#f0f0f0] bg-[#efefef] px-5 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-[1200px] rounded-[16px] bg-[#e6e6e6] px-6 py-12 text-center md:px-12 md:py-16">
            <h2 className="mx-auto max-w-[15ch] text-[36px] font-bold leading-[0.98] tracking-tight text-[#111111] md:max-w-none md:text-[48px] md:whitespace-nowrap">
              {whyHeading}
            </h2>

            <div className="mt-14 flex flex-col items-center gap-14 md:mt-14 md:grid md:grid-cols-4 md:gap-7">
              {activeReassuranceItems.map((item) => (
                <article key={item.label} className="flex max-w-[230px] flex-col items-center text-center md:max-w-[200px]">
                  <item.icon size={52} strokeWidth={1.6} className="text-[#1f2328]" />
                  <h3 className="mt-6 text-[19px] font-semibold leading-[1.35] tracking-tight text-[#111111] md:text-[17px]">
                    {item.label}
                  </h3>
                  <span className="sr-only">{item.desc}</span>
                </article>
              ))}
            </div>

            <button className="mt-14 inline-flex items-center rounded-full bg-[#4a9078] px-10 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#3f7e69] md:mt-16 md:px-14 md:py-4 md:text-[17px]">
              Contact us
            </button>
          </div>
        </section>

        <section className="bg-white px-5 py-14 md:px-12 md:py-20">
          <div className="mx-auto max-w-[1360px]">
            <div className="mx-auto max-w-[780px] text-center">
              <h2 className="text-[30px] font-bold tracking-tight text-[#15191d] md:text-[42px]">Common questions about office pods</h2>
              <p className="mt-3 text-[16px] leading-[1.65] text-[#505964] md:text-[17px]">
                A few things buyers usually want to clarify before choosing a pod.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[14px] font-medium text-[#145b5f] md:text-[15px]">
                <Link to="/office-pods" className="underline-offset-4 hover:underline">
                  View office pods
                </Link>
                <Link to="/compare-office-pods" className="underline-offset-4 hover:underline">
                  Compare office pods
                </Link>
                <Link to="/pricing" className="underline-offset-4 hover:underline">
                  View office pod pricing
                </Link>
                <Link to="/installation-support" className="underline-offset-4 hover:underline">
                  Learn about installation and support
                </Link>
                <Link to="/faq" className="underline-offset-4 hover:underline">
                  Read common questions about office pods
                </Link>
                <Link to="/installation-support#book-viewing" className="underline-offset-4 hover:underline">
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
                        <span className="text-[19px] font-semibold leading-[1.35] tracking-tight text-[#171b20] md:text-[24px]">{item.question}</span>
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
                className="inline-flex items-center rounded-[8px] bg-[#145b5f] px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#104c4f]"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>

        <footer className="bg-[#121212] px-5 pb-12 pt-14 text-left text-white md:px-12 md:pt-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="space-y-6 md:hidden">
              <div className="space-y-4">
                <div className="inline-flex rounded-[10px] bg-white px-3 py-2">
                  <img src={acePodsLogo} alt="Ace Pods" className="h-8 w-auto" />
                </div>
                <p className="max-w-xs text-[13px] leading-relaxed text-gray-400">{footerBrandLine}</p>
                <div className="flex gap-3">
                  {footerSocialLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:text-white"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-white/10 border-y border-white/10">
                {footerLinkGroups.map((group) => {
                  const isOpen = openFooterGroup === group.key;
                  return (
                    <div key={group.key}>
                      <button
                        type="button"
                        onClick={() => setOpenFooterGroup(isOpen ? '' : group.key)}
                        className="flex min-h-[48px] w-full items-center justify-between py-3 text-left"
                      >
                        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-300">{group.title}</span>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <ul className="space-y-2 pb-4">
                          {group.links.map((link) => (
                            <li key={link.label}>
                              {link.to ? (
                                <Link to={link.to} className="block py-1 text-[15px] text-gray-400 transition-colors hover:text-white">
                                  {link.label}
                                </Link>
                              ) : (
                                <a href={link.href} className="block py-1 text-[15px] text-gray-400 transition-colors hover:text-white">
                                  {link.label}
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-14 hidden grid-cols-4 gap-10 md:grid">
              <div className="space-y-6">
                <div className="inline-flex rounded-[10px] bg-white px-3 py-2">
                  <img src={acePodsLogo} alt="Ace Pods" className="h-8 w-auto md:h-14" />
                </div>
                <p className="max-w-xs text-[14px] leading-relaxed text-gray-400">{footerBrandLine}</p>
                <div className="flex gap-3">
                  {footerSocialLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:text-white"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {footerLinkGroups.map((group) => (
                <div key={group.key} className="space-y-5">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400">{group.title}</h4>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        {link.to ? (
                          <Link to={link.to} className="text-[15px] text-gray-400 transition-colors hover:text-white">
                            {link.label}
                          </Link>
                        ) : (
                          <a href={link.href} className="text-[15px] text-gray-400 transition-colors hover:text-white">
                            {link.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-600 md:flex-row">
              <div className="flex flex-col items-center gap-2 md:items-start">
                <div>© 2026 ACE PODS. ALL RIGHTS RESERVED.</div>
                <a
                  href="https://aceofficepods.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium normal-case tracking-normal text-gray-500 transition-colors hover:text-white"
                >
                  Owned by Ace Workplace Solutions (Ace Office Pods Malaysia) - 202403171118
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Globe size={14} /> GLOBAL EN <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
