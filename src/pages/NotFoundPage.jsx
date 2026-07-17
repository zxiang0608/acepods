import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SeoMeta from '../components/SeoMeta';
import SiteFooter from '../components/SiteFooter';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical } from '../seo/schema';

export default function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#172126]">
      <SeoMeta
        title="Page not found | Ace Office Pods"
        description="The page you requested is unavailable."
        canonical={buildCanonical(pathname || '/404')}
        robots="noindex, follow"
        keywords={SEO_KEYWORDS_COMMON}
        schemas={[]}
      />
      <main className="flex min-h-[calc(100vh-180px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-[720px] rounded-[16px] border border-[#dedede] bg-white p-10 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#72757b]">404</p>
          <h1 className="mt-3 text-[40px] font-bold tracking-tight">Page not found</h1>
          <p className="mx-auto mt-3 max-w-[44ch] text-[16px] text-[#68726f]">
            The page you requested is unavailable. Return to the homepage to continue browsing Ace pods.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-[6px] bg-[#00855a] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#172126]"
          >
            Go to homepage
          </Link>
        </div>
      </main>
      <SiteFooter className="mt-0" />
    </div>
  );
}
