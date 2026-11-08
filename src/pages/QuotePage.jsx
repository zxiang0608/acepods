import React, { useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { publishedProducts } from '../data/products';
import { pushDataLayerEvent } from '../lib/tracking';
import { SEO_BRAND_PHONE, SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildCanonical } from '../seo/schema';
import ProductMediaPending from '../components/ProductMediaPending';
import { STANDARD_KLANG_VALLEY_DELIVERY } from '../data/commercialTerms.js';

const TOTAL_STEPS = 3;
const WHATSAPP_NUMBER = SEO_BRAND_PHONE.replace(/\D/g, '');

const formatRM = (amount) => `RM${amount.toLocaleString('en-MY')}`;
const getQuoteUnitPrice = (product) => product.pdpPricing?.finalPrice ?? product.pdpPricing?.baseConfigurations?.[0]?.price;

const initialDetails = {
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  city: '',
  country: 'Malaysia',
  customerType: '',
  timeline: '',
  message: '',
  privacy: false
};

const fieldClassName =
  'mt-2 h-12 w-full rounded-[4px] border border-[#d7d9d6] bg-white px-4 text-[15px] text-[#172126] outline-none transition-colors placeholder:text-[#9aa19e] focus:border-[#00855a] focus:ring-1 focus:ring-[#00855a]';

export default function QuotePage() {
  const [searchParams] = useSearchParams();
  const formTopRef = useRef(null);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [details, setDetails] = useState(initialDetails);
  const [quantities, setQuantities] = useState(() => {
    const requestedProduct = searchParams.get('product');
    return Object.fromEntries(publishedProducts.map((product) => [product.slug, product.slug === requestedProduct ? 1 : 0]));
  });

  const selectedProducts = useMemo(
    () => publishedProducts.filter((product) => quantities[product.slug] > 0),
    [quantities]
  );

  const selectedUnitCount = selectedProducts.reduce((total, product) => total + quantities[product.slug], 0);
  const estimatedPodTotal = selectedProducts.reduce((total, product) => {
    const unitPrice = getQuoteUnitPrice(product) || 0;
    return total + unitPrice * quantities[product.slug];
  }, 0);

  const goToStep = (nextStep) => {
    setError('');
    setStep(nextStep);
    window.requestAnimationFrame(() => formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const updateQuantity = (slug, value) => {
    const safeValue = Math.min(99, Math.max(0, Number.parseInt(value, 10) || 0));
    setQuantities((current) => ({ ...current, [slug]: safeValue }));
    setError('');
  };

  const updateDetail = (field, value) => {
    setDetails((current) => ({ ...current, [field]: value }));
    setError('');
  };

  const continueFromProducts = () => {
    if (selectedProducts.length === 0) {
      setError('Choose at least one pod and enter the quantity required.');
      return;
    }
    goToStep(2);
  };

  const continueFromDetails = () => {
    if (!details.firstName.trim() || !details.lastName.trim() || !details.email.trim() || !details.city.trim() || !details.country) {
      setError('Complete the required contact fields before continuing.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(details.email)) {
      setError('Enter a valid email address before continuing.');
      return;
    }

    goToStep(3);
  };

  const submitQuoteRequest = (event) => {
    event.preventDefault();

    if (!details.customerType || !details.privacy) {
      setError('Select the type of customer and accept the privacy acknowledgement.');
      return;
    }

    const productLines = selectedProducts.map((product) => {
      const unitPrice = getQuoteUnitPrice(product);
      const priceText = unitPrice
        ? ` — ${product.pdpPricing?.finalPrice || product.pdpPricing?.pricingIncludesDeliveryAndInstallation ? 'final price' : 'from'} ${formatRM(unitPrice)} each`
        : '';
      return `• ${product.name}: ${quantities[product.slug]} unit${quantities[product.slug] > 1 ? 's' : ''}${priceText}`;
    });

    const messageLines = [
      'Hello Ace Office Pods, I would like a project quotation.',
      '',
      'PODS REQUIRED',
      ...productLines,
      '',
      'CONTACT DETAILS',
      `Name: ${details.firstName.trim()} ${details.lastName.trim()}`,
      details.company.trim() ? `Company: ${details.company.trim()}` : null,
      `Email: ${details.email.trim()}`,
      details.phone.trim() ? `Phone: ${details.phone.trim()}` : null,
      `Location: ${details.city.trim()}, ${details.country}`,
      '',
      'PROJECT DETAILS',
      `Customer type: ${details.customerType}`,
      details.timeline ? `Required timeline: ${details.timeline}` : null,
      details.message.trim() ? `Notes: ${details.message.trim()}` : null,
      '',
      `Standard Klang Valley delivery: ${formatRM(STANDARD_KLANG_VALLEY_DELIVERY)} per trip; installation and options quoted separately.`,
      'Please confirm the full quotation, delivery, installation and applicable lead time.'
    ].filter(Boolean);

    pushDataLayerEvent('quote_form_continue_to_whatsapp', {
      cta_location: 'quote_form_step_3',
      cta_text: 'Continue to WhatsApp',
      selected_models: selectedProducts.map((product) => product.slug).join(','),
      selected_unit_count: selectedUnitCount,
      customer_type: details.customerType
    });

    window.location.assign(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageLines.join('\n'))}`);
  };

  return (
    <PageShell>
      <SeoMeta
        title="Get an Office Pod Quote | Ace Office Pods"
        description="Choose Ace Office Pods models and quantities, share your project details, and prepare a structured quotation request for our Malaysia sales team."
        canonical={buildCanonical('/get-a-quote')}
        keywords={`${SEO_KEYWORDS_COMMON}, office pod quotation, get office pod quote`}
        robots="noindex, follow"
      />

      <section ref={formTopRef} className="scroll-mt-24 bg-[#fbfaf7] px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
        <div className="mx-auto w-full max-w-[1040px]">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#68726f]">Project quotation</p>
            <h1 className="mt-5 text-[44px] font-semibold leading-none tracking-[-0.045em] text-[#172126] md:text-[64px]">Get a quote</h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.6] text-[#59635f] md:text-[17px]">
              Choose the pods you need. We will use your selections to prepare the right commercial scope for your project.
            </p>
            <Link to="/instant-quotation" className="mt-5 inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-[#007653] underline underline-offset-4">
              Download an instant preliminary quotation <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mx-auto mt-16 max-w-[820px] md:mt-24">
            <div className="flex items-end justify-between gap-4">
              <p className="text-[13px] font-medium text-[#68726f]">Step {step} of {TOTAL_STEPS}</p>
              <p className="text-right text-[13px] font-medium text-[#68726f]">
                {step === 1 ? 'Choose models' : step === 2 ? 'Your details' : 'Project details'}
              </p>
            </div>
            <div
              className="mt-2 h-[5px] overflow-hidden bg-[#e1e4e1]"
              role="progressbar"
              aria-label={`Quote request progress: step ${step} of ${TOTAL_STEPS}`}
              aria-valuemin="1"
              aria-valuemax={TOTAL_STEPS}
              aria-valuenow={step}
            >
              <div className="h-full bg-[#00855a] transition-[width] duration-300" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
            </div>

            {step === 1 && (
              <div className="mt-8">
                <h2 className="sr-only">Choose pod models and quantities</h2>
                <div className="divide-y divide-[#dedfdc] border-y border-[#dedfdc]">
                  {publishedProducts.map((product) => {
                    const unitPrice = getQuoteUnitPrice(product);
                    return (
                      <article key={product.slug} className="grid items-center gap-5 py-7 sm:grid-cols-[140px_1fr_150px] md:gap-8 md:py-8">
                        <div className="mx-auto flex h-[112px] w-[140px] items-end justify-center sm:mx-0">
                          {product.catalogImage || product.thumbImage ? (
                            <img
                              src={product.catalogImage || product.thumbImage}
                              alt={product.name}
                              className={`h-full w-full object-contain object-bottom ${product.catalogImageClassName || ''}`}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <ProductMediaPending productName={product.name} variant="card" />
                          )}
                        </div>
                        <div className="text-center sm:text-left">
                          <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#172126] md:text-[22px]">{product.name}</h3>
                          <p className="mt-2 text-[14px] leading-[1.5] text-[#59635f]">{product.cardSupport || product.shortDesc}</p>
                          {unitPrice ? <p className="mt-2 text-[13px] font-semibold text-[#007653]">{product.pdpPricing?.finalPrice || product.pdpPricing?.pricingIncludesDeliveryAndInstallation ? 'Final price' : 'From'} {formatRM(unitPrice)} per unit</p> : null}
                        </div>
                        <div>
                          <label htmlFor={`quantity-${product.slug}`} className="mb-2 block text-center text-[12px] font-semibold uppercase tracking-[0.1em] text-[#68726f] sm:text-left">
                            Quantity
                          </label>
                          <input
                            id={`quantity-${product.slug}`}
                            type="number"
                            min="0"
                            max="99"
                            inputMode="numeric"
                            value={quantities[product.slug]}
                            onChange={(event) => updateQuantity(product.slug, event.target.value)}
                            className="h-12 w-full rounded-[4px] border border-[#d7d9d6] bg-white px-4 text-center text-[16px] tabular-nums text-[#172126] outline-none transition-colors focus:border-[#00855a] focus:ring-1 focus:ring-[#00855a]"
                          />
                        </div>
                      </article>
                    );
                  })}
                </div>

                {selectedProducts.length > 0 ? (
                  <div className="mt-6 flex flex-col gap-2 border-l-2 border-[#00855a] pl-4 text-[14px] text-[#59635f] sm:flex-row sm:items-center sm:justify-between">
                    <span>{selectedUnitCount} pod{selectedUnitCount > 1 ? 's' : ''} selected</span>
                    <span className="font-semibold text-[#172126]">Indicative pod total {formatRM(estimatedPodTotal)}</span>
                  </div>
                ) : null}

                <p className="mt-4 text-[13px] leading-[1.6] text-[#68726f]">
                  Standard Klang Valley delivery is {formatRM(STANDARD_KLANG_VALLEY_DELIVERY)} per trip. Installation and options are quoted separately. Additional trips, outstation delivery and restricted access are confirmed in your quotation.
                </p>

                {error ? <p className="mt-5 text-[14px] font-medium text-[#a33a2b]" role="alert">{error}</p> : null}

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={continueFromProducts}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-[4px] border border-[#9da5a1] bg-white text-[#172126] transition-colors hover:border-[#00855a] hover:bg-[#00855a] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00855a] focus:ring-offset-2"
                    aria-label="Continue to contact details"
                  >
                    <ArrowRight size={24} strokeWidth={1.7} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mt-8">
                <h2 className="text-[24px] font-semibold tracking-[-0.025em] text-[#172126]">Who should we prepare the quotation for?</h2>
                <p className="mt-2 text-[14px] leading-[1.55] text-[#68726f]">Required fields are marked with an asterisk.</p>
                <div className="mt-8 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  <label className="text-[15px] font-medium text-[#303a3e]">
                    First name <span className="text-[#a33a2b]">*</span>
                    <input value={details.firstName} onChange={(event) => updateDetail('firstName', event.target.value)} className={fieldClassName} autoComplete="given-name" />
                  </label>
                  <label className="text-[15px] font-medium text-[#303a3e]">
                    Last name <span className="text-[#a33a2b]">*</span>
                    <input value={details.lastName} onChange={(event) => updateDetail('lastName', event.target.value)} className={fieldClassName} autoComplete="family-name" />
                  </label>
                  <label className="text-[15px] font-medium text-[#303a3e] sm:col-span-2">
                    Company
                    <input value={details.company} onChange={(event) => updateDetail('company', event.target.value)} className={fieldClassName} autoComplete="organization" />
                  </label>
                  <label className="text-[15px] font-medium text-[#303a3e]">
                    Email <span className="text-[#a33a2b]">*</span>
                    <input type="email" value={details.email} onChange={(event) => updateDetail('email', event.target.value)} className={fieldClassName} autoComplete="email" />
                  </label>
                  <label className="text-[15px] font-medium text-[#303a3e]">
                    Phone
                    <input type="tel" value={details.phone} onChange={(event) => updateDetail('phone', event.target.value)} className={fieldClassName} autoComplete="tel" />
                  </label>
                  <label className="text-[15px] font-medium text-[#303a3e]">
                    City <span className="text-[#a33a2b]">*</span>
                    <input value={details.city} onChange={(event) => updateDetail('city', event.target.value)} className={fieldClassName} autoComplete="address-level2" />
                  </label>
                  <label className="text-[15px] font-medium text-[#303a3e]">
                    Country <span className="text-[#a33a2b]">*</span>
                    <select value={details.country} onChange={(event) => updateDetail('country', event.target.value)} className={fieldClassName} autoComplete="country-name">
                      <option value="Malaysia">Malaysia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </div>

                {error ? <p className="mt-5 text-[14px] font-medium text-[#a33a2b]" role="alert">{error}</p> : null}

                <div className="mt-8 flex items-center justify-between">
                  <button type="button" onClick={() => goToStep(1)} className="inline-flex h-14 w-14 items-center justify-center rounded-[4px] border border-[#9da5a1] bg-white text-[#172126] transition-colors hover:border-[#00855a] hover:text-[#00855a] focus:outline-none focus:ring-2 focus:ring-[#00855a] focus:ring-offset-2" aria-label="Back to pod selection">
                    <ArrowLeft size={24} strokeWidth={1.7} />
                  </button>
                  <button type="button" onClick={continueFromDetails} className="inline-flex h-14 w-14 items-center justify-center rounded-[4px] border border-[#00855a] bg-[#00855a] text-white transition-colors hover:bg-[#006e4a] focus:outline-none focus:ring-2 focus:ring-[#00855a] focus:ring-offset-2" aria-label="Continue to project details">
                    <ArrowRight size={24} strokeWidth={1.7} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form className="mt-8" onSubmit={submitQuoteRequest}>
                <h2 className="text-[24px] font-semibold tracking-[-0.025em] text-[#172126]">Tell us about your project</h2>
                <div className="mt-8 grid gap-y-5">
                  <label className="text-[15px] font-medium text-[#303a3e]">
                    I am enquiring as <span className="text-[#a33a2b]">*</span>
                    <select value={details.customerType} onChange={(event) => updateDetail('customerType', event.target.value)} className={fieldClassName}>
                      <option value="">Select type</option>
                      <option value="Business">Business</option>
                      <option value="Architect or designer">Architect or designer</option>
                      <option value="Dealer or reseller">Dealer or reseller</option>
                      <option value="Individual">Individual</option>
                    </select>
                  </label>
                  <label className="text-[15px] font-medium text-[#303a3e]">
                    When do you need the pods?
                    <select value={details.timeline} onChange={(event) => updateDetail('timeline', event.target.value)} className={fieldClassName}>
                      <option value="">Select timeline</option>
                      <option value="As soon as possible">As soon as possible</option>
                      <option value="Within 1 month">Within 1 month</option>
                      <option value="Within 1–3 months">Within 1–3 months</option>
                      <option value="More than 3 months">More than 3 months</option>
                      <option value="Still planning">Still planning</option>
                    </select>
                  </label>
                  <label className="text-[15px] font-medium text-[#303a3e]">
                    Project notes
                    <textarea
                      value={details.message}
                      onChange={(event) => updateDetail('message', event.target.value)}
                      className="mt-2 min-h-[150px] w-full resize-y rounded-[4px] border border-[#d7d9d6] bg-white px-4 py-3 text-[15px] leading-[1.55] text-[#172126] outline-none transition-colors placeholder:text-[#9aa19e] focus:border-[#00855a] focus:ring-1 focus:ring-[#00855a]"
                      placeholder="Tell us about the intended use, site access, finishes, add-ons, or anything else we should quote."
                    />
                  </label>
                </div>

                <div className="mt-7 space-y-5 border-t border-[#dedfdc] pt-7">
                  <label className="flex items-start gap-3 text-[14px] leading-[1.55] text-[#59635f]">
                    <input type="checkbox" checked={details.privacy} onChange={(event) => updateDetail('privacy', event.target.checked)} className="mt-1 h-4 w-4 accent-[#00855a]" />
                    <span>
                      I agree that Ace Workplace Solutions may use these details to respond to my quotation request. <span className="text-[#a33a2b]">*</span>{' '}
                      <Link to="/privacy" target="_blank" className="font-semibold text-[#172126] underline underline-offset-3">Privacy policy</Link>
                    </span>
                  </label>
                </div>

                <div className="mt-7 flex items-start gap-3 border-l-2 border-[#00855a] bg-white px-4 py-4 text-[13px] leading-[1.55] text-[#59635f]">
                  <Check className="mt-0.5 shrink-0 text-[#00855a]" size={18} />
                  <p>Your selections and details will be prepared as a WhatsApp message. Review the message and press send to deliver the request to Ace.</p>
                </div>

                {error ? <p className="mt-5 text-[14px] font-medium text-[#a33a2b]" role="alert">{error}</p> : null}

                <div className="mt-8 flex items-center justify-between">
                  <button type="button" onClick={() => goToStep(2)} className="inline-flex h-14 w-14 items-center justify-center rounded-[4px] border border-[#9da5a1] bg-white text-[#172126] transition-colors hover:border-[#00855a] hover:text-[#00855a] focus:outline-none focus:ring-2 focus:ring-[#00855a] focus:ring-offset-2" aria-label="Back to contact details">
                    <ArrowLeft size={24} strokeWidth={1.7} />
                  </button>
                  <button type="submit" className="inline-flex min-h-14 items-center gap-3 rounded-[4px] bg-[#00855a] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#006e4a] focus:outline-none focus:ring-2 focus:ring-[#00855a] focus:ring-offset-2">
                    Continue to WhatsApp
                    <ArrowRight size={21} strokeWidth={1.7} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
