import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { buildCanonical, createBreadcrumbSchema, organizationSchema, websiteSchema } from '../seo/schema';

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Privacy Policy', path: '/privacy' }
];

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <SeoMeta
        title="Privacy Policy | Ace Office Pods"
        description="Privacy policy for aceofficepods.com, explaining how Ace Workplace Solutions collects, uses, and protects personal data under Malaysia's Personal Data Protection Act 2010."
        canonical={buildCanonical('/privacy')}
        robots="noindex, follow"
        schemas={[organizationSchema, websiteSchema, createBreadcrumbSchema(breadcrumbs)]}
      />

      <section className="mx-auto w-full max-w-[820px] px-5 pb-16 pt-10 md:px-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#68726f]">
          <Link to="/" className="hover:text-[#007653]">
            Home
          </Link>{' '}
          / <span>Privacy Policy</span>
        </nav>

        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-[#172126] md:text-[44px]">Privacy Policy</h1>
        <p className="mt-3 text-[14px] text-[#68726f]">Last updated: June 2026</p>

        <div className="mt-8 space-y-8 text-[16px] leading-[1.7] text-[#172126]">

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">1. About this policy</h2>
            <p>
              Ace Workplace Solutions (operating as Ace Office Pods Malaysia, registration no. 202403171118) operates the website at aceofficepods.com. This policy explains how we collect, use, and protect personal data in accordance with the Personal Data Protection Act 2010 (Malaysia).
            </p>
            <p className="mt-3">
              By using this website or contacting us, you agree to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">2. Data we collect</h2>
            <p>We may collect the following types of personal data:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Name, company name, and contact details provided through enquiry forms, WhatsApp, or email</li>
              <li>Phone number (including WhatsApp number) when you contact us directly</li>
              <li>Email address when you send us a message</li>
              <li>Site usage data collected automatically via Google Analytics, including pages visited and approximate location</li>
              <li>Any information you voluntarily provide when requesting a quote or asking about our products</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">3. How we use your data</h2>
            <p>We use your personal data to:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Respond to enquiries about office pods, pricing, and project requirements</li>
              <li>Prepare and issue quotations</li>
              <li>Coordinate delivery, installation, and after-sales support</li>
              <li>Improve our website and understand how visitors use it</li>
              <li>Contact you with information relevant to your enquiry</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">4. Cookies and analytics</h2>
            <p>
              This website uses Google Analytics to collect anonymised data about how visitors use the site, including pages visited, time on site, and device type. This data is used only to improve the website and is not used to identify you personally.
            </p>
            <p className="mt-3">
              You can opt out of Google Analytics tracking by installing the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#007653] underline underline-offset-4 hover:no-underline">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">5. Data retention</h2>
            <p>
              Enquiry and project data is retained for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable Malaysian law. You may request deletion of your personal data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">6. Your rights</h2>
            <p>Under the Personal Data Protection Act 2010 (Malaysia), you have the right to:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate or incomplete personal data</li>
              <li>Withdraw consent for processing of your personal data</li>
              <li>Request deletion of your personal data</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, please contact us at{' '}
              <a href="mailto:sales@aceofficepods.com" className="text-[#007653] underline underline-offset-4 hover:no-underline">
                sales@aceofficepods.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">7. Third-party links</h2>
            <p>
              This website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and recommend you read their privacy policies before providing any personal data.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">8. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The most current version will always be available at aceofficepods.com/privacy. Continued use of the website after any update constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[22px] font-semibold tracking-tight text-[#172126]">9. Contact us</h2>
            <p>For any privacy-related questions or requests:</p>
            <address className="mt-3 not-italic space-y-1">
              <div className="font-semibold text-[#172126]">Ace Workplace Solutions (Ace Office Pods Malaysia)</div>
              <div>Jalan Gopeng, Kawasan 18, 41400 Klang, Selangor</div>
              <div>
                <a href="mailto:sales@aceofficepods.com" className="text-[#007653] underline underline-offset-4 hover:no-underline">
                  sales@aceofficepods.com
                </a>
              </div>
              <div>
                <a href="tel:+601154352700" className="text-[#007653] underline underline-offset-4 hover:no-underline">
                  +60 11-5435 2700
                </a>
              </div>
            </address>
          </section>

        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-[14px] font-semibold text-[#007653]">
          <Link to="/terms" className="underline-offset-4 hover:underline">Terms of Use</Link>
          <Link to="/contact" className="underline-offset-4 hover:underline">Contact us</Link>
        </div>
      </section>
    </PageShell>
  );
}
