import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeftRight,
  ArrowRight,
  Bike,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Globe,
  Hammer,
  Instagram,
  Layout,
  Linkedin,
  MapPin,
  Maximize2,
  Menu,
  PhoneIncoming,
  RefreshCw,
  Route,
  Search,
  Target,
  Ticket,
  Twitter,
  User,
  X,
  Zap
} from 'lucide-react';
import acePodsLogo from '../Logos/ace pods logo.png';
import acePodsHero from '../assets/hero-pods mirror.png';
import openOfficeImage from '../assets/open-office.png';
import { products } from './data/products';

const PlaceholderImage = ({ aspect = 'aspect-video', label = 'Image Placeholder', className = '' }) => (
  <div
    className={`w-full ${aspect} flex flex-col items-center justify-center rounded-sm border border-gray-200 bg-gray-100 text-gray-400 ${className}`}
  >
    <span className="mb-2 px-2 text-center text-[10px] font-bold uppercase tracking-widest md:text-xs">{label}</span>
    <div className="h-px w-10 bg-gray-300 md:w-12"></div>
  </div>
);

const navLinks = ['Smart pods', 'Smart office', 'Explore', 'Professionals', 'About'];

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

const privacyPoints = [
  {
    icon: <PhoneIncoming size={32} className="mb-4 text-[#00855a]" />,
    title: 'Calls need more privacy than open offices allow.',
    desc: 'Routine conversations become office-wide interruptions when shared space is doing too many jobs at once.'
  },
  {
    icon: <Target size={32} className="mb-4 text-[#00855a]" />,
    title: 'Some work needs fewer interruptions.',
    desc: 'Even short blocks of focused work are harder to protect when noise and movement are built into the day.'
  },
  {
    icon: <AlertCircle size={32} className="mb-4 text-[#00855a]" />,
    title: 'Small space problems spread across the office.',
    desc: 'When there is nowhere suitable for calls or quiet work, the effect reaches nearby teams.'
  }
];

const reassuranceItems = [
  {
    num: '01',
    title: 'Local installation and after-sales support',
    desc: 'Support stays close from planning through post-installation.'
  },
  {
    num: '02',
    title: 'A clearer path from quote to installation',
    desc: 'Buyers follow a clearer path from quote to setup.'
  },
  {
    num: '03',
    title: 'Comfortable for real daily use',
    desc: 'Designed for practical everyday use, not showroom-only appeal.'
  },
  {
    num: '04',
    title: 'Easier to fit into the workspace',
    desc: 'Fits more easily around circulation, team needs, and layout realities.'
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

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const carouselRef = useRef(null);

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

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans antialiased text-[#1a1a1a]">
      <nav className={`fixed top-0 z-50 h-[64px] w-full transition-all duration-300 md:h-[80px] ${scrolled ? 'h-[60px] bg-white shadow-sm md:h-[70px]' : 'bg-white'}`}>
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 md:px-12">
          <div className="flex items-center gap-8 lg:gap-16">
            <img src={acePodsLogo} alt="Ace Pods" className="h-7 w-auto cursor-pointer md:h-12" />
            <div className="hidden items-center gap-9 lg:flex">
              {navLinks.map((link) => (
                <div key={link} className="group flex cursor-pointer items-center gap-1.5">
                  <a href="#" className="text-[16px] font-medium text-[#111111] transition-colors group-hover:text-[#00855a]">
                    {link}
                  </a>
                  <ChevronDown size={16} strokeWidth={2} className="mt-0.5 text-[#00855a]" />
                </div>
              ))}
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
          {navLinks.map((link) => (
            <div key={link} className="group flex items-center justify-between">
              <span className="text-2xl font-bold tracking-tight">{link}</span>
              <ChevronRight className="text-[#00855a]" />
            </div>
          ))}
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
              alt="Office Pods"
              className="h-full w-full object-cover object-[41%_10%] sm:object-[39%_12%] md:object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.08)_24%,rgba(0,0,0,0.22)_52%,rgba(0,0,0,0.58)_100%)] md:bg-black/22"></div>
          </div>

          <div className="relative z-10 w-full max-w-[1440px] px-4 md:mx-auto md:px-12">
            <div className="mr-auto w-full max-w-none px-6 py-0 text-left text-white sm:px-6 lg:mr-0 lg:max-w-[640px] lg:bg-black/50 lg:px-8 lg:py-10">
              <div className="max-w-none md:max-w-[520px]">
                <h1 className="mb-4 max-w-[16ch] text-[35px] font-bold leading-[1.03] tracking-[-0.03em] sm:max-w-[18ch] sm:text-[39px] md:mb-6 md:max-w-none md:text-[65px]">
                  Create a quieter, more functional workplace
                </h1>
                <p className="mb-5 max-w-[32ch] text-[18px] font-semibold leading-[1.5] text-white/92 sm:max-w-[36ch] sm:text-[20px] md:mb-4 md:max-w-lg md:text-[28px]">
                  For calls, focused work, and private meetings — without the cost and disruption of renovation.
                </p>
                <p className="mb-7 max-w-none whitespace-nowrap text-[12px] font-semibold leading-[1.4] tracking-[0.01em] text-white/78 sm:text-[13px] md:mb-8 md:text-[17px]">
                  Practical privacy solutions for modern workplaces
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
              <h2 className="text-[24px] font-semibold leading-[1.2] tracking-tight sm:text-[30px] md:text-[38px]">
                <span className="font-semibold text-[#626262]">Ace workplace pods.</span> <br className="md:hidden" />{' '}
                <span className="font-semibold text-[#222222]">For calls, focus, and meetings.</span>
              </h2>
              <button aria-label="Compare products" className="flex items-center gap-2 border-b border-transparent pb-1 text-[14px] font-bold text-[#444444] transition-colors hover:text-[#111111]">
                <ArrowLeftRight size={18} strokeWidth={2} />
              </button>
            </div>

            <div className="absolute right-4 top-1/2 z-10 lg:hidden">
              <button onClick={scrollNext} className="rounded-full bg-gray-100/80 p-3 text-gray-800 shadow-lg backdrop-blur-sm">
                <ChevronRight size={24} />
              </button>
            </div>

            <div ref={carouselRef} className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
              {products.map((pod) => (
                <Link
                  key={pod.slug}
                  to={`/pods/${pod.slug}`}
                  className="group relative min-h-[400px] w-[85%] flex-shrink-0 snap-center overflow-hidden rounded-[16px] bg-[#EAEAEA] md:h-[500px] md:w-full md:rounded-[8px]"
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
              ))}
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
                Private space without the cost and disruption of rebuilding
              </h2>
              <p className="max-w-[600px] text-[16px] leading-[1.6] text-[#555555] md:text-[20px]">
                A more practical way to create quiet, usable office space for calls, focus, and meetings.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 lg:gap-20">
              {renovationPoints.map((item) => (
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
                <img src={openOfficeImage} alt="Open Office Graphic" className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="w-full max-w-[650px] flex-1">
              <div className="flex flex-col gap-6 md:gap-0">
                {privacyPoints.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[20px] border border-[#eceae0] bg-white p-8 text-left shadow-sm md:rounded-none md:border-0 md:border-b md:border-[#e2dfd5] md:bg-transparent md:px-0 md:py-6 md:shadow-none"
                  >
                    <div className="md:hidden">{item.icon}</div>
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
          <div className="mx-auto flex max-w-[1440px] flex-col gap-12 text-left md:gap-16 lg:flex-row lg:gap-28">
            <div className="relative max-w-[600px] flex-1">
              <div className="relative z-10">
                <span className="mb-4 block text-[13px] font-bold tracking-wide text-[#62727b] md:mb-6 md:text-[14px]">Compare properly</span>
                <h2 className="mb-6 text-[28px] font-extrabold leading-[1.1] tracking-tight text-[#111111] sm:text-[38px] md:mb-8 md:text-[52px]">
                  What buyers often overlook when comparing office pods
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#444444] md:text-[17px]">
                  We show you the complete price upfront. You can compare more confidently when installation, support, and after-sales are
                  clear too.
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col pt-4 md:pt-0">
              {[
                {
                  title: 'We show you the complete price upfront.',
                  desc: 'You can compare properly when you see more than just the headline number.'
                },
                {
                  title: 'Installation shapes the real buying experience.',
                  desc: 'Access, placement, and coordination all affect how straightforward the project feels.'
                },
                {
                  title: 'Support still matters after delivery.',
                  desc: 'When something needs adjusting or servicing, clear support makes the pod easier to manage.'
                }
              ].map((item, idx, arr) => (
                <div key={item.title} className={`border-[#e2dfd5] py-6 md:py-8 ${idx === 0 ? 'border-t' : ''} ${idx === arr.length - 1 ? 'border-y' : 'border-t'}`}>
                  <h3 className="mb-3 text-[18px] font-bold tracking-tight text-[#111111] md:text-[22px]">{item.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-[#555555] md:text-[16px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-white py-16 md:py-24">
          <h2 className="mb-10 px-5 text-center text-[22px] font-bold leading-[1.3] tracking-tight text-[#111111] md:mb-12 md:text-[32px]">
            Trusted by over 70% of <br /> Forbes Top 100 companies
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

        <section className="border-t border-[#f0f0f0] bg-white px-5 py-16 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 text-left md:mb-14">
              <span className="mb-4 block text-[12px] font-bold uppercase tracking-wide text-[#62727b] md:text-[13px]">
                Why Ace Workplace Solutions
              </span>
              <h2 className="max-w-[980px] text-[26px] font-bold leading-[1.1] tracking-tight text-[#111111] sm:text-[36px] md:text-[44px] lg:text-[46px]">
                A practical premium office pod partner for Malaysian workplaces
              </h2>

              <p className="mt-6 max-w-[820px] text-[16px] leading-[1.7] text-[#555555] md:text-[18px]">
                Ace Workplace Solutions helps businesses create quieter, more functional office space with pod solutions that are easier to
                plan, install, and manage.
              </p>
            </div>

            <div className="flex flex-col divide-y divide-[#e4dfd4] border-y border-[#e4dfd4] md:hidden">
              {reassuranceItems.map((item) => (
                <article key={item.num} className="py-5">
                  <span className="mb-3 block text-[12px] font-semibold tracking-[0.18em] text-[#0b7a57]">{item.num}</span>
                  <h3 className="text-[18px] font-semibold leading-[1.28] tracking-tight text-[#111111]">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.65] text-[#5a5a5a]">{item.desc}</p>
                </article>
              ))}
            </div>

            <div className="hidden md:flex md:border-y md:border-[#e4dfd4]">
              {reassuranceItems.map((item, index) => (
                <article
                  key={item.num}
                  className={`min-w-0 flex-1 py-8 ${index !== 0 ? 'border-l border-[#e4dfd4] pl-8 lg:pl-10' : 'pr-8 lg:pr-10'} ${index !== reassuranceItems.length - 1 ? 'pr-8 lg:pr-10' : ''}`}
                >
                  <span className="mb-4 block text-[12px] font-semibold tracking-[0.18em] text-[#0b7a57]">{item.num}</span>
                  <h3 className="max-w-[16ch] text-[19px] font-semibold leading-[1.28] tracking-tight text-[#111111] lg:text-[20px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[23ch] text-[15px] leading-[1.65] text-[#5a5a5a]">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F8F8F8] px-5 py-16 md:px-12 md:py-24">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center overflow-hidden rounded-[24px] border border-gray-100 bg-white px-0 pb-0 pt-16 text-center shadow-sm md:rounded-[32px] md:pt-24">
            <div className="max-w-[700px] px-8">
              <h2 className="mb-8 text-[32px] font-extrabold leading-[1.1] tracking-tight text-[#111111] md:text-[48px]">Get a quote</h2>
              <p className="mx-auto mb-12 max-w-[580px] text-[17px] leading-[1.6] text-[#555555] md:text-[20px]">
                Find your nearest representative to hear about pricing and get a quote for your project.
              </p>

              <div className="mb-16 flex justify-center md:mb-24">
                <button className="inline-flex items-center gap-4 rounded-[12px] border border-[#dcdcdc] bg-[#F2F2F2] px-8 py-4 text-[16px] font-bold text-[#111111] transition-all hover:bg-[#ebebeb] md:px-10">
                  <ArrowRight size={20} strokeWidth={2.5} />
                  Get a quote
                </button>
              </div>
            </div>

            <div className="-mb-1 w-full max-w-[900px] px-4">
              <div className="relative mx-auto">
                <div className="relative rounded-t-[14px] border-x border-t border-[#333] bg-[#000] p-[10px] pb-0">
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-t-[4px] border border-[#222] bg-white">
                    <div className="flex items-center justify-between border-b border-gray-100 bg-white p-4">
                      <img src={acePodsLogo} alt="Ace Pods" className="h-4 w-auto" />
                      <div className="flex gap-4">
                        <div className="h-1 w-8 rounded bg-gray-100"></div>
                        <div className="h-1 w-8 rounded bg-gray-100"></div>
                      </div>
                    </div>
                    <div className="h-full bg-[#FAFAFA] p-8 text-center">
                      <div className="mb-4 text-[14px] font-bold">Get a quote</div>
                      <div className="mx-auto max-w-[280px] space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-3 rounded-[4px] border border-gray-200 bg-white p-3">
                            <div className="h-8 w-8 rounded bg-gray-100"></div>
                            <div className="flex-1 space-y-1">
                              <div className="h-2 w-1/2 bg-gray-100"></div>
                              <div className="h-1 w-3/4 bg-gray-50"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-[12px] w-[105%] -translate-x-[2.5%] rounded-b-[6px] bg-[#222]">
                  <div className="absolute left-1/2 top-0 mt-1 h-1 w-20 -translate-x-1/2 rounded-full bg-[#444]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-[#121212] px-5 pb-12 pt-16 text-left text-white md:px-12 md:pt-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 md:mb-20">
              <div className="space-y-8">
                <div className="inline-flex rounded-[10px] bg-white px-3 py-2">
                  <img src={acePodsLogo} alt="Ace Pods" className="h-9 w-auto" />
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-gray-500">The world leader in acoustic office solutions.</p>
                <div className="flex gap-4">
                  <Instagram size={20} className="text-gray-400" />
                  <Linkedin size={20} className="text-gray-400" />
                  <Twitter size={20} className="text-gray-400" />
                </div>
              </div>
              {['Products', 'Company', 'Support'].map((cat) => (
                <div key={cat} className="space-y-4 md:space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{cat}</h4>
                  <ul className="space-y-3 text-sm font-medium text-gray-500 md:space-y-4">
                    <li>
                      <a href="#" className="transition-colors hover:text-white">
                        Products
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors hover:text-white">
                        Services
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition-colors hover:text-white">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 md:flex-row">
              <div>© 2025 FRAMERY. ALL RIGHTS RESERVED.</div>
              <div className="flex items-center gap-2">
                <Globe size={14} /> GLOBAL EN <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
