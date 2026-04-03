import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bike,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Globe,
  Hammer,
  Instagram,
  Linkedin,
  Maximize2,
  Menu,
  Route,
  Search,
  Ticket,
  Twitter,
  User,
  X
} from 'lucide-react';
import acePodsLogo from '../Logos/ace pods logo.png';
import acePodsHero from '../assets/hero-pods mirror.png';
import openOfficeImage from '../assets/open-office.png';
import comparePriceImage from '../assets/E105DYKK.avif';
import podsInstallationImage from '../assets/pods-installation.png';
import deliveryPodsImage from '../assets/delivery-pods.png';
import menuAceSolo from '../assets/ace-solo-cutout.png';
import menuAceSoloPlus from '../assets/ace-solo-plus-cutout.png';
import menuAceDuo from '../assets/ace-duo-cutout.png';
import menuAceMeeting from '../assets/ace-meeting.png';
import menuAceMeetingXL from '../assets/ace-meeting-XL-cutout.png';
import SeoMeta from './components/SeoMeta';
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

const navLinks = ['Smart Pods', 'Smart office', 'Explore', 'Professionals', 'About'];

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
    desc: 'Add privacy where it is needed without interrupting teams working around the pod area.'
  },
  {
    num: '02',
    title: 'Add private space without construction work',
    desc: 'Office pods create enclosed space for calls, focused work, and meetings without building fixed rooms.'
  },
  {
    num: '03',
    title: 'Move or expand your setup as your office changes',
    desc: 'You can adjust pod placement as team size, floor plans, or workspace needs evolve over time.'
  }
];

const privacyPoints = [
  {
    title: 'Calls need more privacy than open offices allow.',
    desc: 'Routine conversations become office-wide interruptions when shared space is doing too many jobs at once.'
  },
  {
    title: 'Some work needs fewer interruptions.',
    desc: 'Even short blocks of focused work are harder to protect when noise and movement are built into the day.'
  },
  {
    title: 'Small space problems spread across the office.',
    desc: 'When there is nowhere suitable for calls or quiet work, the effect reaches nearby teams.'
  }
];

const seoPrivacyPoints = [
  {
    title: 'Calls need more privacy than open offices allow',
    desc: 'Conversations that should stay private often carry across the office when there is no enclosed space.'
  },
  {
    title: 'Focused work needs fewer interruptions',
    desc: 'Noise and movement in open offices make concentration harder to protect throughout the day.'
  },
  {
    title: 'When private space is missing, the whole office feels it',
    desc: 'Lack of quiet zones affects nearby teams, shared focus, and day-to-day workplace flow.'
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

const smartPodsMenuItems = [
  {
    title: 'Ace Solo',
    description: 'Designed for individuals who need a quiet, private workspace.',
    image: menuAceSolo,
    to: '/pods/ace-solo'
  },
  {
    title: 'Ace Solo Plus',
    description: 'The perfect quiet workspace for two-person collaborations.',
    image: menuAceSoloPlus,
    to: '/pods/ace-solo-plus'
  },
  {
    title: 'Ace Duo',
    description: 'Private pod for one-to-one collaboration and focused conversations.',
    image: menuAceDuo,
    to: '/pods/ace-duo'
  },
  {
    title: 'Ace Meeting',
    description: 'Sound-contained environment tailored for small team meetings.',
    image: menuAceMeeting,
    imageClassName: 'scale-[1.14] mix-blend-multiply',
    to: '/pods/ace-meeting'
  },
  {
    title: 'Ace Meeting XL',
    description: 'Provides ample space for larger team meetings and collaboration.',
    image: menuAceMeetingXL,
    imageClassName: 'mix-blend-multiply',
    to: '/pods/ace-meeting-xl'
  }
];

const trustedLogos = [
  { name: "L'Oreal", type: 'text' },
  { name: 'ticketswap', type: 'icon', icon: Ticket },
  { name: 'M', type: 'text', style: { fontFamily: 'Georgia, serif' } },
  { name: 'Postmates', type: 'icon', icon: Bike },
  { name: 'BCG', type: 'text' },
  { name: 'Linked', type: 'special' },
  { name: 'GE', type: 'special-ge' },
  { name: 'M-Files', type: 'text' }
];

const footerLinkGroups = [
  {
    key: 'products',
    title: 'Products',
      links: [
        { label: 'Ace Solo', to: '/pods/ace-solo' },
        { label: 'Ace Solo Plus', to: '/pods/ace-solo-plus' },
        { label: 'Ace Duo', to: '/pods/ace-duo' },
        { label: 'Ace Meeting', to: '/pods/ace-meeting' },
        { label: 'Ace Meeting XL', to: '/pods/ace-meeting-xl' }
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

export default function App({ seoMode = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmartPodsDesktopOpen, setIsSmartPodsDesktopOpen] = useState(false);
  const [isSmartPodsMobileOpen, setIsSmartPodsMobileOpen] = useState(false);
  const [openFooterGroup, setOpenFooterGroup] = useState('products');
  const carouselRef = useRef(null);
  const navRef = useRef(null);

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

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const activeRenovationPoints = seoMode ? seoRenovationPoints : renovationPoints;
  const activePrivacyPoints = seoMode ? seoPrivacyPoints : privacyPoints;
  const activeCompareItems = seoMode ? seoCompareItems : compareItems;
  const activeReassuranceItems = seoMode ? seoReassuranceItems : reassuranceItems;
  const desktopTopPodCards = products.slice(0, 3);
  const desktopBottomPodCards = products.slice(3, 5);

  const heroHeadline = seoMode ? 'Office pods for calls, focus, and meetings' : 'Create a quieter, more functional workplace';
  const heroSupportingText = seoMode
    ? 'Add private space for calls, focused work, and meetings without building new rooms.'
    : 'For calls, focused work, and private meetings — without the cost and disruption of renovation.';
  const heroTrustLine = seoMode
    ? 'A practical alternative to building new rooms'
    : 'Practical privacy solutions for modern workplaces';
  const productIntroHeading = seoMode ? 'Choose the right office pod for calls, focus, or meetings' : null;
  const privateSpaceHeading = seoMode
    ? 'Add private space without building new rooms'
    : 'Private space without the cost and disruption of rebuilding';
  const compareSupportingLine = seoMode
    ? 'Compare more confidently when pricing, installation, and support are clear upfront.'
    : 'We show you the complete price upfront. You can compare more confidently when installation, support, and after-sales are clear too.';
  const trustSectionHeading = seoMode
    ? 'Trusted by teams in leading companies worldwide'
    : 'Trusted by over 70% of Forbes Top 100 companies';
  const whyHeading = seoMode ? 'Why teams choose AcePods' : 'Choose AcePods';
  const footerBrandLine = seoMode
    ? 'Acoustic office pods for calls, focus, and meetings'
    : 'Premium workplace pods for calls, focus, and meetings.';
  const seoSchemas = seoMode ? [organizationSchema, websiteSchema, createFaqSchema('/seo', HOME_FAQ_ITEMS)] : [];

  const renderPodCard = (pod, extraClass = '') => (
    <Link
      key={pod.slug}
      to={`/pods/${pod.slug}`}
      className={`group relative min-h-[400px] overflow-hidden rounded-[16px] bg-[#EAEAEA] md:h-[500px] md:rounded-[8px] ${extraClass}`}
    >
      <div className="absolute inset-0 z-0 opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
        <img src={pod.hoverImg} alt={pod.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="relative z-10 flex h-full flex-col items-center px-6 pb-8 pt-8 transition-all duration-500 md:pt-10 md:group-hover:-translate-y-2">
        <h3 className="relative -top-1 mb-8 whitespace-pre-line text-center text-[15px] font-semibold tracking-wide text-white transition-colors duration-300 md:text-[15px] md:text-[#505050] md:group-hover:text-white">
          {pod.name}
        </h3>
        <div className="mb-10 flex w-full items-center justify-center px-2 transition-opacity duration-300 group-hover:opacity-0">
          <div className="aspect-square w-full max-w-[180px] md:max-w-[200px]">
            <img src={pod.thumbImage} alt={pod.name} className={`h-full w-full object-contain transition-transform duration-300 ${pod.imageScale}`} />
          </div>
        </div>
        <p className="mb-5 max-w-[13ch] whitespace-pre-line text-center text-[19px] font-semibold leading-[1.3] text-[#3c3c3c] transition-opacity duration-300 group-hover:opacity-0 md:text-[20px]">
          {pod.shortDesc}
        </p>
        <p className="mb-2 min-h-[18px] text-center text-[12px] font-medium text-[#7a7a7a] transition-opacity duration-300 group-hover:opacity-0 md:text-[12px]">
          {pod.cardSupport}
        </p>
        {pod.cardNote && (
          <p className="mb-6 min-h-[16px] text-center text-[11px] font-medium text-[#999999] transition-opacity duration-300 group-hover:opacity-0">
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans antialiased text-[#1a1a1a]">
      {seoMode && (
        <SeoMeta
          title="Office Pods for Calls, Focus and Meetings | AcePods"
          description="Explore office pods for calls, focused work, and meetings. Add private space without major renovation, with clear pricing, installation, and support from AcePods."
          canonical={buildCanonical('/seo')}
          schemas={seoSchemas}
        />
      )}
      <nav
        ref={navRef}
        className={`fixed top-0 z-50 h-[64px] w-full transition-all duration-300 md:h-[80px] ${scrolled ? 'h-[60px] bg-white shadow-sm md:h-[70px]' : 'bg-white'}`}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 md:px-12">
          <div className="flex items-center gap-8 lg:gap-16">
            <img src={acePodsLogo} alt="Ace Pods" className="h-7 w-auto cursor-pointer md:h-12" />
            <div className="hidden items-center gap-9 lg:flex">
              {navLinks.map((link) => {
                const isSmartPods = link === 'Smart Pods';
                if (isSmartPods) {
                  return (
                    <div key={link} className="group flex cursor-pointer items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setIsSmartPodsDesktopOpen((prev) => !prev)}
                        className="text-[16px] font-medium text-[#111111] transition-colors group-hover:text-[#00855a]"
                      >
                        {link}
                      </button>
                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        className={`mt-0.5 text-[#00855a] transition-transform ${isSmartPodsDesktopOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                  );
                }
                return (
                  <div key={link} className="group flex cursor-pointer items-center gap-1.5">
                    <a href="#" className="text-[16px] font-medium text-[#111111] transition-colors group-hover:text-[#00855a]">
                      {link}
                    </a>
                    <ChevronDown size={16} strokeWidth={2} className="mt-0.5 text-[#00855a]" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden items-center gap-8 lg:flex">
              <div className="flex cursor-pointer items-center gap-2.5 text-[#111111] transition-colors hover:text-[#00855a]">
                <User size={22} strokeWidth={1.5} />
                <span className="text-[16px] font-medium">Login</span>
              </div>
              <button className="text-[#111111] transition-colors hover:text-[#00855a]">
                <Search size={22} strokeWidth={1.5} />
              </button>
              <div className="group flex cursor-pointer items-center gap-1.5 text-[#111111]">
                <span className="text-[16px] font-medium transition-colors group-hover:text-[#00855a]">EN</span>
                <ChevronDown size={16} strokeWidth={2} className="mt-0.5 text-[#00855a]" />
              </div>
            </div>

            <button className="hidden rounded-[4px] bg-[#00855a] px-6 py-2.5 text-[16px] font-semibold text-white transition-all hover:bg-[#006e4a] sm:block">
              Design your pod
            </button>

            <div className="flex items-center gap-4 lg:hidden">
              <button className="text-[#111111]">
                <Search size={24} strokeWidth={1.5} />
              </button>
              <button className="p-1 text-[#111111]" onClick={() => setIsMenuOpen(true)}>
                <Menu size={27} />
              </button>
            </div>
          </div>
        </div>

        {isSmartPodsDesktopOpen && (
          <div className="absolute left-0 top-full hidden w-full border-t border-[#d9d9d9] bg-[#efefef] lg:block">
            <div className="mx-auto max-w-[1600px] px-12 py-10">
              <div className="grid grid-cols-5 gap-8">
                {smartPodsMenuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    onClick={() => setIsSmartPodsDesktopOpen(false)}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex h-[180px] w-full items-center justify-center">
                      <img src={item.image} alt={item.title} className={`h-full w-full object-contain ${item.imageClassName || ''}`} />
                    </div>
                    <h3 className="mt-5 text-[20px] font-semibold tracking-tight text-[#0e5a60]">{item.title}</h3>
                    <p className="mt-3 text-[14px] leading-[1.5] text-[#666666]">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      <div
        className={`fixed inset-0 z-[100] transform bg-white transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <img src={acePodsLogo} alt="Ace Pods" className="h-10 w-auto" />
          <button onClick={() => setIsMenuOpen(false)} className="p-2">
            <X size={32} />
          </button>
        </div>
        <div className="h-[calc(100vh-80px)] space-y-8 overflow-y-auto p-8">
          {navLinks.map((link) => {
            const isSmartPods = link === 'Smart Pods';
            if (isSmartPods) {
              return (
                <div key={link} className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setIsSmartPodsMobileOpen((prev) => !prev)}
                    className="group flex w-full items-center justify-between"
                  >
                    <span className="text-2xl font-bold tracking-tight">{link}</span>
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
              <div key={link} className="group flex items-center justify-between">
                <span className="text-2xl font-bold tracking-tight">{link}</span>
                <ChevronRight className="text-[#00855a]" />
              </div>
            );
          })}
          <div className="space-y-6 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-4 text-xl font-bold text-[#111111]">
              <User size={24} /> Login
            </div>
            <div className="flex items-center gap-4 text-xl font-bold text-[#111111]">
              <Globe size={24} /> EN (Global)
            </div>
          </div>
        </div>
      </div>

      <div className="pt-[64px] md:pt-[80px]">
        <section className="relative flex h-[76vh] min-h-[560px] items-end justify-start pb-8 sm:h-[78vh] sm:min-h-[600px] sm:pb-8 lg:h-[calc(100vh-80px)] lg:items-center lg:justify-end lg:pb-0">
          <div className="absolute inset-0 z-0">
            <img
              src={acePodsHero}
              alt={seoMode ? 'Acoustic office pods for calls and focused work in an open office' : 'Office Pods'}
              className="h-full w-full object-cover object-[16%_10%] sm:object-[14%_12%] md:object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.08)_24%,rgba(0,0,0,0.22)_52%,rgba(0,0,0,0.58)_100%)] md:bg-black/22"></div>
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
                  <button className="min-w-0 flex-1 rounded-[6px] bg-white px-3.5 py-2.5 text-[14px] font-bold text-[#111111] transition-colors hover:bg-gray-100 md:flex-1 md:rounded-full md:px-8 md:py-4 md:text-[18px]">
                    Get Pricing
                  </button>
                  <button className="min-w-0 flex-1 rounded-[6px] border border-white/90 bg-transparent px-3.5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10 md:flex-1 md:rounded-full md:px-8 md:py-4 md:text-[18px]">
                    Book Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-8 flex flex-col items-start justify-between gap-6 md:mb-10 md:flex-row md:items-end">
              {seoMode ? (
                <h2 className="text-[24px] font-semibold leading-[1.2] tracking-tight text-[#222222] sm:text-[30px] md:text-[38px]">
                  {productIntroHeading}
                </h2>
              ) : (
                <h2 className="text-[24px] font-semibold leading-[1.2] tracking-tight sm:text-[30px] md:text-[38px]">
                  <span className="font-semibold text-[#626262]">Ace workplace pods.</span> <br className="md:hidden" />{' '}
                  <span className="font-semibold text-[#222222]">For calls, focus, and meetings.</span>
                </h2>
              )}
            </div>

            <div className="absolute right-4 top-1/2 z-10 lg:hidden">
              <button onClick={scrollNext} className="rounded-full bg-gray-100/80 p-3 text-gray-800 shadow-lg backdrop-blur-sm">
                <ChevronRight size={24} />
              </button>
            </div>

            <div ref={carouselRef} className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto md:grid md:grid-cols-2 md:overflow-visible lg:hidden">
              {products.map((pod) => renderPodCard(pod, 'w-[85%] flex-shrink-0 snap-center md:w-full'))}
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
            <div className="mb-12 max-w-[850px] md:mb-24">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#666666] md:mb-6 md:text-[11px]">
                Pods instead of renovation
              </span>
              <h2 className="mb-6 text-[28px] font-bold leading-[1.1] tracking-tight text-[#111111] sm:text-[36px] md:text-[48px] lg:text-[56px]">
                {privateSpaceHeading}
              </h2>
              <p className="max-w-[600px] text-[16px] leading-[1.6] text-[#555555] md:text-[20px]">
                A more practical way to create quiet, usable office space for calls, focus, and meetings.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 lg:gap-20">
              {activeRenovationPoints.map((item) => (
                <div key={item.num} className="flex flex-col border-t-[1.5px] border-[#111111] pt-5 md:pt-8">
                  <span className="mb-3 text-[12px] font-extrabold tracking-widest text-[#00855a] md:mb-5 md:text-[13px]">
                    {item.num}
                  </span>
                  <h3 className="mb-3 text-[20px] font-bold leading-[1.25] tracking-tight text-[#111111] md:mb-4 md:text-[26px]">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-[#555555] md:text-[16px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F6F5F0] px-5 py-16 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-10 max-w-[1240px] text-center md:mb-14">
              <span className="mb-3 block text-[12px] font-bold uppercase tracking-wide text-[#62727b] md:mb-4 md:text-[13px]">
                Why private space matters
              </span>
              <h2 className="text-[28px] font-extrabold leading-[1.1] tracking-tight text-[#111111] sm:text-[38px] md:text-[46px] lg:whitespace-nowrap lg:text-[48px]">
                Not every task belongs in an open office
              </h2>
            </div>

            <div className="flex flex-col items-center gap-12 md:gap-16 lg:flex-row lg:gap-24">
            <div className="hidden w-full flex-1 lg:block">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[#e8e6df]">
                <img
                  src={openOfficeImage}
                  alt={seoMode ? 'Open office area where private calls and meetings can disrupt nearby teams' : 'Open Office Graphic'}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="w-full max-w-[650px] flex-1">
              <div className="flex flex-col gap-6 md:gap-0">
                {activePrivacyPoints.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[20px] border border-[#eceae0] bg-white p-8 text-left shadow-sm md:rounded-none md:border-0 md:border-b md:border-[#e2dfd5] md:bg-transparent md:px-0 md:py-6 md:shadow-none"
                  >
                    <h3 className="mb-2 text-[19px] font-bold leading-tight tracking-tight text-[#111111] md:mb-3 md:text-[22px]">{item.title}</h3>
                    <p className="text-[15px] leading-[1.6] text-[#555555] md:text-[16px]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </section>

        <section className="bg-[#F6F5F0] px-5 py-16 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1240px]">
            <div className="max-w-[860px] text-left">
              <span className="mb-4 block text-[13px] font-bold tracking-wide text-[#62727b] md:mb-6 md:text-[14px]">Compare properly</span>
              <h2 className="mb-6 text-[38px] font-extrabold leading-[1.08] tracking-tight text-[#111111] sm:text-[46px] md:mb-8 md:text-[62px]">
                What buyers often overlook when comparing office pods
              </h2>
              <p className="max-w-[44ch] text-[16px] leading-[1.65] text-[#444444] md:text-[19px]">
                {compareSupportingLine}
              </p>
            </div>

            <div className="mt-14 space-y-12 md:mt-20 md:space-y-16">
              {activeCompareItems.map((item, idx) => (
                <article key={item.title} className="grid items-center gap-6 md:gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={`${idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} text-left`}>
                    <h3 className="text-[29px] font-bold leading-[1.16] tracking-tight text-[#111111] sm:text-[32px] md:text-[44px] lg:text-[48px]">{item.title}</h3>
                    <p className="mt-4 max-w-[44ch] text-[17px] leading-[1.7] text-[#5a5a5a] md:text-[19px]">{item.desc}</p>
                  </div>
                  <div className={`${idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} overflow-hidden rounded-[10px] bg-[#e7e3dc]`}>
                    <div className="aspect-[4/3] w-full">
                      <img src={item.image} alt={item.imageAlt} className={`h-full w-full object-cover ${item.imageClassName || ''}`} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {seoMode && (
          <section className="bg-white px-5 py-14 md:px-12 md:py-20">
            <div className="mx-auto max-w-[1240px]">
              <div className="mb-10 rounded-[10px] border border-[#e8e4db] bg-[#f8f7f3] p-6 md:p-8">
                <h2 className="text-[28px] font-bold tracking-tight text-[#14181c] md:text-[38px]">Office pod FAQ</h2>
                <p className="mt-3 max-w-[70ch] text-[16px] leading-[1.65] text-[#49505a]">
                  Direct answers to common buyer questions about office pods, pricing, installation, and support.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[15px] font-semibold text-[#145b5f]">
                  <Link to="/seo/office-pods" className="underline-offset-4 hover:underline">
                    View office pods
                  </Link>
                  <Link to="/seo/compare-office-pods" className="underline-offset-4 hover:underline">
                    Compare office pods
                  </Link>
                  <Link to="/seo/pricing" className="underline-offset-4 hover:underline">
                    View office pod pricing
                  </Link>
                  <Link to="/seo/installation-support" className="underline-offset-4 hover:underline">
                    Learn about installation and support
                  </Link>
                  <Link to="/seo/faq" className="underline-offset-4 hover:underline">
                    Read common questions about office pods
                  </Link>
                  <Link to="/seo/installation-support#book-viewing" className="underline-offset-4 hover:underline">
                    Book a viewing with our team
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {HOME_FAQ_ITEMS.map((item) => (
                  <article key={item.question} className="rounded-[8px] border border-[#e7e3da] bg-[#fcfcfa] p-5">
                    <h3 className="text-[20px] font-semibold tracking-tight text-[#1a1f26]">{item.question}</h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-[#4b535c]">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="overflow-hidden bg-white py-16 md:py-24">
          <h2 className="mb-10 px-5 text-center text-[22px] font-bold leading-[1.3] tracking-tight text-[#111111] md:mb-12 md:text-[32px]">
            {seoMode ? (
              trustSectionHeading
            ) : (
              <>
                Trusted by over 70% of <br /> Forbes Top 100 companies
              </>
            )}
          </h2>
          <div className="hide-scrollbar flex w-full justify-start gap-3 overflow-x-auto px-5 pb-6 lg:justify-center md:gap-4">
            {trustedLogos.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="flex aspect-square min-w-[140px] items-center justify-center rounded-[6px] bg-[#FAFAFA] text-[#777777] md:min-w-[190px]"
                style={logo.style}
              >
                {logo.type === 'text' && <span className="text-lg font-bold md:text-xl">{logo.name}</span>}
                {logo.type === 'icon' && (
                  <div className="flex items-center gap-1.5">
                    <logo.icon size={18} />
                    <span className="text-sm font-bold md:text-base">{logo.name}</span>
                  </div>
                )}
                {logo.type === 'special' && (
                  <span className="text-sm font-bold md:text-base">
                    Linked<span className="ml-0.5 rounded-sm bg-[#777777] px-0.5 text-[#FAFAFA]">in</span>
                  </span>
                )}
                {logo.type === 'special-ge' && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#777777] font-serif text-xs font-bold italic md:h-10 md:w-10">
                    GE
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[#f0f0f0] bg-[#efefef] px-5 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-[1200px] rounded-[16px] bg-[#e6e6e6] px-6 py-12 text-center md:px-12 md:py-16">
            <h2 className="mx-auto max-w-none whitespace-nowrap text-[36px] font-bold leading-[0.98] tracking-tight text-[#111111] md:text-[48px]">
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

        <footer className="bg-[#121212] px-5 pb-12 pt-14 text-left text-white md:px-12 md:pt-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="space-y-6 md:hidden">
              <div className="space-y-4">
                <div className="inline-flex rounded-[10px] bg-white px-3 py-2">
                  <img src={acePodsLogo} alt="Ace Pods" className="h-8 w-auto" />
                </div>
                <p className="max-w-xs text-[13px] leading-relaxed text-gray-400">{footerBrandLine}</p>
                <div className="flex gap-3">
                  {[Instagram, Linkedin, Twitter].map((Icon, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:text-white"
                    >
                      <Icon size={18} />
                    </button>
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
                  <img src={acePodsLogo} alt="Ace Pods" className="h-9 w-auto" />
                </div>
                <p className="max-w-xs text-[14px] leading-relaxed text-gray-400">{footerBrandLine}</p>
                <div className="flex gap-3">
                  {[Instagram, Linkedin, Twitter].map((Icon, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:text-white"
                    >
                      <Icon size={18} />
                    </button>
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
              <div>© 2026 ACE PODS. ALL RIGHTS RESERVED.</div>
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
