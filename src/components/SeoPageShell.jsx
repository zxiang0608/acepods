import React from 'react';
import { Link } from 'react-router-dom';
import acePodsLogo from '../../Logos/ace pods logo.png';

const seoNavLinks = [
  { label: 'Office Pods', to: '/seo/office-pods' },
  { label: 'Compare Office Pods', to: '/seo/compare-office-pods' },
  { label: 'Pricing', to: '/seo/pricing' },
  { label: 'FAQ', to: '/seo/faq' },
  { label: 'Installation & Support', to: '/seo/installation-support' }
];

export default function SeoPageShell({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1a1a1a]">
      <header className="border-b border-[#e2e0d7] bg-white">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
          <Link to="/seo" className="inline-flex items-center">
            <img src={acePodsLogo} alt="AcePods" className="h-9 w-auto" />
          </Link>
          <nav aria-label="SEO commercial navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-semibold text-[#2f353b]">
            {seoNavLinks.map((link) => (
              <Link key={link.to} to={link.to} className="transition-colors hover:text-[#145b5f]">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-16 border-t border-[#e1dfd7] bg-white px-5 py-10 md:px-8">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] text-[#4f565f]">Acoustic office pods for calls, focus, and meetings</p>
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7a8086]">© 2026 AcePods</p>
        </div>
      </footer>
    </div>
  );
}
