import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import acePodsLogo from '../../Logos/ace pods logo.png';
import SmartPodsBanner from './SmartPodsBanner';
import { smartPodsMenuItems } from './smartPodsMenuData';

const navItems = [
  { label: 'Smart Pods', type: 'smart-pods' },
  { label: 'Office Chairs', to: '/office-chairs' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Installation & Support', to: '/installation-support' }
];

export default function SubpageHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmartPodsDesktopOpen, setIsSmartPodsDesktopOpen] = useState(false);
  const [isSmartPodsMobileOpen, setIsSmartPodsMobileOpen] = useState(false);
  const navRef = useRef(null);

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

  return (
    <>
      <header ref={navRef} className="relative z-40 border-b border-[#e2e0d7] bg-white">
        <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between px-5 md:h-[80px] md:px-8">
          <Link to="/" className="inline-flex items-center">
            <img src={acePodsLogo} alt="AcePods" className="h-7 w-auto md:h-12" />
          </Link>

          <nav aria-label="Commercial navigation" className="hidden items-center gap-6 text-[14px] font-semibold text-[#2f353b] lg:flex">
            {navItems.map((item) => {
              if (item.type === 'smart-pods') {
                return (
                  <div key={item.label} className="group flex cursor-pointer items-center gap-1.5">
                    <button type="button" onClick={() => setIsSmartPodsDesktopOpen((prev) => !prev)} className="transition-colors group-hover:text-[#145b5f]">
                      {item.label}
                    </button>
                    <ChevronDown className={`text-[#00855a] transition-transform ${isSmartPodsDesktopOpen ? 'rotate-180' : ''}`} size={16} />
                  </div>
                );
              }
              return (
                <Link key={item.to} to={item.to} className="transition-colors hover:text-[#145b5f]">
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/installation-support#book-viewing"
              className="hidden rounded-[4px] bg-[#00855a] px-5 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#006e4a] md:inline-flex"
            >
              Contact us
            </Link>

            <button type="button" className="p-1 text-[#111111] lg:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <Menu size={26} />
            </button>
          </div>
        </div>
        {isSmartPodsDesktopOpen && <SmartPodsBanner items={smartPodsMenuItems} onItemClick={() => setIsSmartPodsDesktopOpen(false)} maxWidthClass="max-w-[1200px]" />}
      </header>

      <div className={`fixed inset-0 z-[100] transform bg-white transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-[#ececec] p-6">
          <img src={acePodsLogo} alt="AcePods" className="h-7 w-auto" />
          <button type="button" onClick={() => setIsMenuOpen(false)} className="p-1" aria-label="Close menu">
            <X size={30} />
          </button>
        </div>
        <div className="space-y-7 p-8">
          {navItems.map((item) => {
            if (item.type === 'smart-pods') {
              return (
                <div key={item.label} className="space-y-4">
                  <button type="button" onClick={() => setIsSmartPodsMobileOpen((prev) => !prev)} className="group flex w-full items-center justify-between">
                    <span className="text-[28px] font-bold leading-none tracking-tight text-[#151a1f]">{item.label}</span>
                    <ChevronDown className={`text-[#00855a] transition-transform ${isSmartPodsMobileOpen ? 'rotate-180' : ''}`} size={24} />
                  </button>
                  {isSmartPodsMobileOpen && (
                    <div className="space-y-8 border-t border-[#d9d9d9] pt-5">
                      {smartPodsMenuItems.map((menuItem) => (
                        <Link
                          key={menuItem.title}
                          to={menuItem.to}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsSmartPodsMobileOpen(false);
                          }}
                          className="block text-center"
                        >
                          <div className="mx-auto h-[200px] w-full max-w-[200px]">
                            <img src={menuItem.image} alt={menuItem.title} className={`h-full w-full object-contain ${menuItem.imageClassName || ''}`} />
                          </div>
                          <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-[#0e5a60]">{menuItem.title}</h3>
                          <p className="mx-auto mt-2 max-w-[280px] text-[14px] leading-[1.5] text-[#666666]">{menuItem.description}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link key={item.to} to={item.to} onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between">
                <span className="text-[28px] font-bold leading-none tracking-tight text-[#151a1f]">{item.label}</span>
                <ChevronRight className="text-[#00855a]" size={24} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
