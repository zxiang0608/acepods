import React from 'react';
import SubpageHeader from './SubpageHeader';
import SiteFooter from './SiteFooter';

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1a1a1a]">
      <SubpageHeader />

      <main>{children}</main>

      <SiteFooter />
    </div>
  );
}
