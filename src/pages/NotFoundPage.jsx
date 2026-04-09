import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SeoMeta from '../components/SeoMeta';
import { buildCanonical } from '../seo/schema';

export default function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f4f4] px-6 py-16 text-[#1e2227]">
      <SeoMeta
        title="Page not found | AcePods"
        description="The page you requested is unavailable."
        canonical={buildCanonical(pathname || '/404')}
        robots="noindex, follow"
        schemas={[]}
      />
      <div className="w-full max-w-[720px] rounded-[16px] border border-[#dedede] bg-white p-10 text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#72757b]">404</p>
        <h1 className="mt-3 text-[40px] font-bold tracking-tight">Page not found</h1>
        <p className="mx-auto mt-3 max-w-[44ch] text-[16px] text-[#666]">The page you requested is unavailable. Return to the homepage to continue browsing Ace pods.</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-[6px] bg-[#145b5f] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#0f4b4e]"
        >
          Go to homepage
        </Link>
      </div>
    </main>
  );
}
