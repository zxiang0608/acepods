import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Globe, Instagram, Linkedin } from 'lucide-react';
import acePodsLogo from '../../Logos/ace pods logo.png';
import { pushDataLayerEvent } from '../lib/tracking';
import {
  SEO_BRAND_EMAIL,
  SEO_BRAND_PHONE,
  SEO_BRAND_POSTAL_CODE,
  SEO_BRAND_SHOWROOM_LOCALITY,
  SEO_BRAND_SHOWROOM_REGION,
  SEO_BRAND_STREET_ADDRESS
} from '../seo/constants';

const footerSocialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/acepodsmy/', Icon: Instagram },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ace-workplace-solutions-ace-office-pods-malaysia/',
    Icon: Linkedin
  }
];

const footerLinkGroups = [
  {
    key: 'products',
    title: 'Products',
    links: [
      { label: 'Ace Uno', to: '/pods/ace-uno' },
      { label: 'Ace Plus', to: '/pods/ace-plus' },
      { label: 'Ace Flex', to: '/pods/ace-flex' }
    ]
  },
  {
    key: 'products-more',
    title: 'Products',
    links: [
      { label: 'Ace Flex Duo', to: '/pods/ace-flex-duo' },
      { label: 'Ace Meet', to: '/pods/ace-meet' },
      { label: 'Ace Hub', to: '/pods/ace-hub' }
    ]
  },
  {
    key: 'solutions',
    title: 'Solutions',
    links: [
      { label: 'Meeting pods Malaysia', to: '/meeting-pods-malaysia' },
      { label: 'Office phone booths Malaysia', to: '/office-phone-booth-malaysia' },
      { label: 'Office pods near me', to: '/office-pods-near-me' },
      { label: 'Locations', to: '/locations' }
    ]
  },
  {
    key: 'support',
    title: 'Support',
    links: [
      { label: 'Contact us', to: '/contact' },
      { label: 'About Ace', to: '/about' },
      { label: 'Articles', to: '/articles' },
      { label: 'Installation & delivery', to: '/installation-support' },
      { label: 'After-sales support', to: '/installation-support#after-sales-support' },
      { label: 'Pod relocation', to: '/pod-relocation' }
    ]
  }
];

export default function SiteFooter({ className = 'mt-0' }) {
  const [openFooterGroup, setOpenFooterGroup] = useState('products');
  const footerBrandLine = 'Office pods for calls, focus, and meetings';
  const trackFooterClick = (label, destinationUrl, area) => {
    pushDataLayerEvent('footer_cta_click', {
      cta_location: area,
      cta_text: label,
      destination_url: destinationUrl
    });
  };

  return (
    <footer className={`${className} bg-[#172126] px-5 pb-12 pt-14 text-left text-white md:px-12 md:pt-20`}>
      <div className="mx-auto max-w-[1280px]">
        <div className="space-y-6 md:hidden">
          <div className="space-y-4">
            <div className="inline-flex rounded-[10px] bg-white px-3 py-2">
              <img src={acePodsLogo} alt="Ace Pods" width="32" height="32" className="h-8 w-auto" />
            </div>
            <p className="max-w-xs whitespace-pre-line text-[13px] leading-relaxed text-gray-400">{footerBrandLine}</p>
            <address className="not-italic space-y-1 text-[13px] leading-relaxed text-gray-400">
              <p>{SEO_BRAND_STREET_ADDRESS},</p>
              <p>{SEO_BRAND_POSTAL_CODE} {SEO_BRAND_SHOWROOM_LOCALITY}, {SEO_BRAND_SHOWROOM_REGION}</p>
              <p className="pt-1">
                <a href={`tel:${SEO_BRAND_PHONE}`} className="hover:text-white transition-colors">{SEO_BRAND_PHONE}</a>
              </p>
              <p>
                <a href={`mailto:${SEO_BRAND_EMAIL}`} className="hover:text-white transition-colors">{SEO_BRAND_EMAIL}</a>
              </p>
            </address>
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
                            <Link
                              to={link.to}
                              onClick={() => trackFooterClick(link.label, link.to, 'footer_mobile')}
                              className="block py-1 text-[15px] text-gray-400 transition-colors hover:text-white"
                            >
                              {link.label}
                            </Link>
                          ) : (
                            <a
                              href={link.href}
                              onClick={() => trackFooterClick(link.label, link.href, 'footer_mobile')}
                              className="block py-1 text-[15px] text-gray-400 transition-colors hover:text-white"
                            >
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

        <div className="hidden grid-cols-5 gap-8 md:grid">
          <div className="space-y-5">
            <div className="inline-flex rounded-[10px] bg-white px-3 py-2">
              <img src={acePodsLogo} alt="Ace Pods" width="56" height="56" className="h-8 w-auto md:h-14" />
            </div>
            <p className="max-w-xs whitespace-pre-line text-[14px] leading-relaxed text-gray-400">{footerBrandLine}</p>
            <address className="not-italic space-y-1 text-[13px] leading-relaxed text-gray-400">
              <p>{SEO_BRAND_STREET_ADDRESS},</p>
              <p>{SEO_BRAND_POSTAL_CODE} {SEO_BRAND_SHOWROOM_LOCALITY}, {SEO_BRAND_SHOWROOM_REGION}</p>
              <p className="pt-1">
                <a href={`tel:${SEO_BRAND_PHONE}`} className="hover:text-white transition-colors">{SEO_BRAND_PHONE}</a>
              </p>
              <p>
                <a href={`mailto:${SEO_BRAND_EMAIL}`} className="hover:text-white transition-colors">{SEO_BRAND_EMAIL}</a>
              </p>
            </address>
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
              <h4
                className={`text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 ${
                  group.key === 'products-more' ? 'invisible' : ''
                }`}
                aria-hidden={group.key === 'products-more'}
              >
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        onClick={() => trackFooterClick(link.label, link.to, 'footer_desktop')}
                        className="text-[15px] text-gray-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => trackFooterClick(link.label, link.href, 'footer_desktop')}
                        className="text-[15px] text-gray-400 transition-colors hover:text-white"
                      >
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
            <div className="flex gap-4 text-[11px] font-medium normal-case tracking-normal text-gray-600">
              <Link to="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="transition-colors hover:text-white">Terms of Use</Link>
              <Link to="/editorial-policy" className="transition-colors hover:text-white">Editorial Policy</Link>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Globe size={14} /> GLOBAL EN <ChevronDown size={14} />
          </div>
        </div>
      </div>
    </footer>
  );
}
