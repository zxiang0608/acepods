import React, { useEffect } from 'react';
import SubpageHeader from './SubpageHeader';
import SiteFooter from './SiteFooter';
import { localBusinessSchema, websiteSchema } from '../seo/schema';

// Injects org/LocalBusiness schema on every subpage using a separate data
// attribute so SeoMeta's per-page cleanup (data-seo-schema) leaves it alone.
// Effects run bottom-up, so this fires after the child page's SeoMeta.
function GlobalSchema() {
  useEffect(() => {
    const tags = [localBusinessSchema, websiteSchema].map((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.globalSchema = 'true';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });
    return () => tags.forEach((tag) => tag.remove());
  }, []);
  return null;
}

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#1a1a1a]">
      <GlobalSchema />
      <SubpageHeader />

      <main>{children}</main>

      <SiteFooter />
    </div>
  );
}
