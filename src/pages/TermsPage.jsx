import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Terms of Use', path: '/terms' }
];

export default function TermsPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Terms of Use | Ace Office Pods"
        description="Terms of use for aceofficepods.com, covering acceptable use, product information accuracy, limitation of liability, and governing law under Malaysia."
        canonical={buildCanonical('/terms')}
        robots="noindex, follow"
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[820px] px-5 pb-16 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#68726f]">
          <Link to="/" className="hover:text-[#007653]">
            Home
          </Link>{' '}
          / <span>Terms of Use</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#172126] md:text-[44px]">Terms of Use</h1>
        <p className="mt-3 text-[14px] text-[#68726f]">Last updated: June 2026</p>

        <div className="mt-8 space-y-8 text-[16px] leading-[1.7] text-[#172126]">

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">1. Acceptance of terms</h2>
            <p>
              By accessing or using aceofficepods.com, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website. This website is operated by Ace Workplace Solutions (registration no. 202403171118), trading as Ace Office Pods Malaysia.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">2. Use of this website</h2>
            <p>You may use this website for lawful purposes only. You must not:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Use the website in any way that violates applicable Malaysian or international law</li>
              <li>Attempt to gain unauthorised access to any part of the website or its underlying systems</li>
              <li>Reproduce, copy, or redistribute content from this website without written permission</li>
              <li>Use automated tools to scrape or extract data from this website in bulk</li>
              <li>Transmit any harmful, offensive, or disruptive content through enquiry forms or contact channels</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">3. Product and pricing information</h2>
            <p>
              Product descriptions, specifications, and pricing on this website are provided for general reference only. Final pricing depends on model, quantity, delivery location, site access, installation scope, and selected options. All prices are subject to change without notice.
            </p>
            <p className="mt-3">
              Ace Workplace Solutions reserves the right to correct any errors, inaccuracies, or omissions in product information at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">4. No contractual offer</h2>
            <p>
              Nothing on this website constitutes a binding offer or contract. Enquiries submitted via this website, WhatsApp, or email are requests for information or quotation only. A binding agreement is only formed when a formal quotation is accepted and a deposit is received by Ace Workplace Solutions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">5. Intellectual property</h2>
            <p>
              All content on this website, including text, images, graphics, product photographs, and design elements, is the property of Ace Workplace Solutions or its licensors and is protected by applicable intellectual property laws. You may not reproduce, publish, or distribute any content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">6. Third-party links</h2>
            <p>
              This website may contain links to third-party websites for reference purposes. Ace Workplace Solutions does not endorse, control, or accept responsibility for the content or practices of any linked third-party site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">7. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by Malaysian law, Ace Workplace Solutions shall not be liable for any direct, indirect, incidental, or consequential loss arising from your use of this website or reliance on information contained herein.
            </p>
            <p className="mt-3">
              This website is provided on an "as is" basis without warranties of any kind, express or implied.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">8. Governing law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of Malaysia. Any dispute arising from these terms or your use of this website shall be subject to the exclusive jurisdiction of the courts of Malaysia.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">9. Changes to these terms</h2>
            <p>
              We may update these terms at any time. The current version will always be available at aceofficepods.com/terms. Continued use of the website after any changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">10. Contact</h2>
            <address className="mt-1 not-italic space-y-1">
              <div className="font-semibold text-[#172126]">Ace Workplace Solutions (Ace Office Pods Malaysia)</div>
              <div>Jalan Gopeng, Kawasan 18, 41400 Klang, Selangor</div>
              <div>
                <a href="mailto:sales@aceofficepods.com" className="text-[#007653] underline underline-offset-4 hover:no-underline">
                  sales@aceofficepods.com
                </a>
              </div>
            </address>
          </section>

        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-[14px] font-semibold text-[#007653]">
          <Link to="/privacy" className="underline-offset-4 hover:underline">Privacy Policy</Link>
          <Link to="/contact" className="underline-offset-4 hover:underline">Contact us</Link>
        </div>
      </section>
    </PageShell>
  );
}
