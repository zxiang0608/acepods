import React, { useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, Check } from 'lucide-react';
import PageShell from '../components/PageShell';
import SeoMeta from '../components/SeoMeta';
import { buildCanonical } from '../seo/schema';
import { SEO_BRAND_PHONE } from '../seo/constants';
import { pushDataLayerEvent } from '../lib/tracking';
import { quotationProducts, quoteCents, formatQuotationMoney as money, seatingGroup, setupIncludesSofa, calculatePreliminaryQuotation, preliminaryReference, downloadPreliminaryQuotation } from '../lib/preliminaryQuotation';

const field = 'mt-2 min-h-12 w-full rounded border border-[#cdd3cd] bg-white px-3 py-3 text-[15px] outline-none focus:border-[#007653] focus:ring-1 focus:ring-[#007653]';
const primary = 'inline-flex min-h-12 items-center justify-center gap-2 rounded bg-[#007653] px-6 py-3 text-sm font-semibold text-white hover:bg-[#005f43] disabled:opacity-50';
const initialDetails = { name: '', company: '', email: '', phone: '', city: '', address: '', zone: '', access: '' };
const steps = ['Pods & add-ons', 'Your details', 'Review & download'];

export default function InstantQuotationPage() {
  const [params] = useSearchParams(), top = useRef(null);
  const [selections, setSelections] = useState(() => quotationProducts.map(product => ({ slug: product.slug, qty: params.get('product') === product.slug ? 1 : 0, configurationId: '', addonIds: [] })));
  const [details, setDetails] = useState(initialDetails), [step, setStep] = useState(0), [error, setError] = useState(''), [busy, setBusy] = useState(false), [reference, setReference] = useState('');
  const quotation = useMemo(() => calculatePreliminaryQuotation(selections, details), [selections, details]);
  const change = (slug, values) => { setSelections(current => current.map(selection => selection.slug === slug ? { ...selection, ...values } : selection));setError('');setReference(''); };
  const detail = (key, value) => { setDetails(current => ({ ...current, [key]: value }));setError('');setReference(''); };
  const go = next => { setError('');setStep(next);requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })); };
  const validateDetails = () => {
    const required = [['name', 'Enter your name.'], ['email', 'Enter your email.'], ['city', 'Enter the delivery city.'], ['zone', 'Choose the delivery area.'], ['access', 'Choose the site access.']];
    const missing = required.find(([key]) => !details[key].trim());
    if (missing) { setError(missing[1]);requestAnimationFrame(() => window.document.getElementById('instant-' + missing[0])?.focus());return false; }
    if (!/^\S+@\S+\.\S+$/.test(details.email)) { setError('Enter a valid email address.');window.document.getElementById('instant-email')?.focus();return false; }
    return true;
  };
  const next = () => { if (step === 0 && !quotation.selected.length) { setError('Choose at least one pod.');return; }if (step === 1 && !validateDetails()) return;go(step + 1); };
  const download = async () => {
    if (!quotation.selected.length) { go(0);setError('Choose at least one pod.');return; }
    if (!validateDetails()) { setStep(1);return; }
    setBusy(true);setError('');
    const nextReference = reference || preliminaryReference();
    try { await downloadPreliminaryQuotation(details, quotation, nextReference);setReference(nextReference);pushDataLayerEvent('preliminary_quotation_download', { selected_models: quotation.selected.map(item => item.product.slug).join(','), selected_unit_count: quotation.selected.reduce((sum, item) => sum + item.quantity, 0), site_charges_pending: !quotation.standardSite }); }
    catch (issue) { setError('Unable to create your PDF. ' + issue.message); }
    finally { setBusy(false); }
  };
  const sendText = reference ? ['Hello Ace, please confirm my preliminary quotation ' + reference + '.', ...quotation.selected.map(item => `${item.title} × ${item.quantity}`), `Delivery: ${details.city}; ${details.zone === 'klang-valley' ? 'Klang Valley' : 'Outside Klang Valley'}; access: ${details.access}.`, 'I will attach the downloaded PDF.'].join('\n') : '';

  return <PageShell>
    <SeoMeta title="Instant Preliminary Quotation | Ace Office Pods" description="Choose office pods and add-ons, enter your details, and download a preliminary quotation for Ace to confirm." canonical={buildCanonical('/instant-quotation')} robots="noindex, follow" />
    <section ref={top} className="scroll-mt-24 bg-[#fbfaf7] px-5 pb-20 pt-12 md:px-8 md:pt-16">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#68726f]">Your first quotation</p>
        <h1 className="mt-4 text-[36px] font-semibold leading-[1.12] tracking-[-.04em] md:text-[54px]">Build your pod quotation.</h1>
        <p className="mt-4 max-w-[660px] text-base leading-relaxed text-[#59635f]">Choose your pods and add-ons, then download a preliminary quotation. Ace will confirm the final specifications and site requirements with you.</p>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <div>
            <ol className="mb-8 grid grid-cols-3 gap-2 border-b border-[#d7ddd5] pb-4" aria-label="Quotation steps">{steps.map((label, index) => <li key={label}><button disabled={busy || index > step} onClick={() => go(index)} aria-current={step === index ? 'step' : undefined} className={'flex min-h-12 w-full items-start gap-2 text-left text-xs leading-5 ' + (step === index ? 'font-semibold text-[#007653]' : 'text-[#68726f]')}><span className={'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ' + (step === index ? 'border-[#007653] bg-[#007653] text-white' : 'border-[#ccd3ca]')}>{index + 1}</span>{label}</button></li>)}</ol>
            {error && <p role="alert" className="mb-5 border-l-2 border-[#9b332a] bg-[#fff3ed] px-4 py-3 text-sm text-[#8b3026]">{error}</p>}
            <fieldset disabled={busy} className="min-w-0">
              <legend className="sr-only">{steps[step]}</legend>
              {step === 0 && <div className="divide-y divide-[#d7ddd5] border-y border-[#d7ddd5]">{quotationProducts.map(product => {
                const selection = selections.find(item => item.slug === product.slug), pricing = product.pdpPricing, setup = pricing.configurationOptions?.find(option => option.id === selection.configurationId);
                const unitPrice = pricing.baseConfigurations[0].price + (typeof setup?.amount === 'number' ? setup.amount : 0);
                return <article key={product.slug} className="py-6">
                  <div className="grid grid-cols-[90px_1fr] items-center gap-4 sm:grid-cols-[110px_1fr_90px]">
                    <img src={product.catalogImage} alt={product.name} className="h-24 w-full object-contain object-bottom" loading="lazy" />
                    <div><h2 className="text-xl font-semibold tracking-tight">{product.name}</h2><p className="mt-1 text-sm text-[#59635f]">{money(quoteCents(pricing.baseConfigurations[0].price))} · pod only</p></div>
                    <label className="col-span-2 grid grid-cols-[1fr_90px] items-center gap-3 text-sm font-medium sm:col-span-1 sm:block" htmlFor={'instant-qty-' + product.slug}>Quantity<input id={'instant-qty-' + product.slug} type="number" min="0" max="99" step="1" inputMode="numeric" value={selection.qty} onChange={event => change(product.slug, { qty: Math.min(99, Math.max(0, parseInt(event.target.value, 10) || 0)) })} className={field + ' !mt-0 sm:!mt-2'} /></label>
                  </div>
                  {selection.qty > 0 && <div className="mt-5 border-l-2 border-[#c3d7ca] pl-4 sm:ml-[126px]">
                    {!!pricing.configurationOptions?.length && <label className="block text-sm font-medium">Setup<select value={selection.configurationId} onChange={event => { const config = pricing.configurationOptions.find(option => option.id === event.target.value);change(product.slug, { configurationId: event.target.value, addonIds: setupIncludesSofa(config) ? selection.addonIds.filter(id => !/sofa/i.test(pricing.addOnOptions.find(option => option.id === id)?.label || '')) : selection.addonIds }); }} className={field}><option value="">Pod only</option>{pricing.configurationOptions.map(option => <option key={option.id} value={option.id}>{option.label} — {typeof option.amount === 'number' ? '+' + money(quoteCents(option.amount)) + ' / pod' : 'price to confirm'}</option>)}</select></label>}
                    <p className="mt-3 text-sm font-semibold text-[#007653]">{setup && typeof setup.amount !== 'number' ? 'Setup price to confirm' : money(quoteCents(unitPrice)) + ' / pod'}</p>
                    {!!pricing.addOnOptions?.length && <fieldset className="mt-5"><legend className="text-sm font-semibold">Add-ons <span className="font-normal text-[#68726f]">· per pod</span></legend><div className="mt-2 divide-y divide-[#e3e6df]">{pricing.addOnOptions.map(option => {
                      const included = setupIncludesSofa(setup) && /sofa/i.test(option.label), checked = selection.addonIds.includes(option.id);
                      return <label key={option.id} className="flex min-h-16 cursor-pointer items-center gap-3 py-3 text-sm"><input type="checkbox" checked={included || checked} disabled={included} onChange={event => { const ids = selection.addonIds.filter(id => id !== option.id && !(event.target.checked && seatingGroup(option.id) && seatingGroup(id)));change(product.slug, { addonIds: event.target.checked ? [...ids, option.id] : ids }); }} className="h-5 w-5 shrink-0 accent-[#007653]" />{option.image && <img src={option.image} alt="" className="h-14 w-12 shrink-0 object-contain" loading="lazy" />}<span className="min-w-0 flex-1">{option.label}</span><span className="shrink-0 text-xs font-semibold text-[#007653]">{included ? 'Included' : money(quoteCents(option.amount))}</span></label>;
                    })}</div></fieldset>}
                  </div>}
                </article>;
              })}</div>}
              {step === 1 && <div className="space-y-5">
                <h2 className="text-2xl font-semibold tracking-tight">Who is the quotation for?</h2>
                <div className="grid gap-5 sm:grid-cols-2">{[['name', 'Your name', 'name', 100], ['company', 'Company (optional)', 'organization', 160], ['email', 'Email', 'email', 180], ['phone', 'Phone (optional)', 'tel', 60], ['city', 'Delivery city', 'address-level2', 160]].map(([key, label, autoComplete, maxLength]) => <label key={key} htmlFor={'instant-' + key} className="text-sm font-medium">{label}<input id={'instant-' + key} type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'} value={details[key]} onChange={event => detail(key, event.target.value)} autoComplete={autoComplete} maxLength={maxLength} className={field} /></label>)}</div>
                <label htmlFor="instant-address" className="block text-sm font-medium">Delivery address (optional)<textarea id="instant-address" value={details.address} onChange={event => detail('address', event.target.value)} autoComplete="street-address" maxLength={500} rows="3" className={field} /></label>
                <div className="grid gap-5 sm:grid-cols-2"><label htmlFor="instant-zone" className="text-sm font-medium">Delivery area<select id="instant-zone" value={details.zone} onChange={event => detail('zone', event.target.value)} className={field}><option value="">Choose area</option><option value="klang-valley">Klang Valley</option><option value="other">Outside Klang Valley</option><option value="unknown">Not sure yet</option></select></label><label htmlFor="instant-access" className="text-sm font-medium">Site access<select id="instant-access" value={details.access} onChange={event => detail('access', event.target.value)} className={field}><option value="">Choose access</option><option value="standard">Ground floor / suitable lift</option><option value="staircase">Staircase or restricted access</option><option value="unknown">Not sure yet</option></select></label></div>
                <p className="text-xs leading-relaxed text-[#68726f]">Standard charges assume one Klang Valley delivery trip with ground-floor or suitable lift access. Ace will review access and location before confirming the order. Read our <Link to="/privacy" className="underline">privacy notice</Link>.</p>
              </div>}
              {step === 2 && <div>
                <h2 className="text-2xl font-semibold tracking-tight">Your preliminary quotation.</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#59635f]">Prepared for {details.company || details.name}. Download your PDF, then send it to Ace to confirm specifications and delivery.</p>
                <div className="mt-6 divide-y divide-[#d7ddd5] border-y border-[#d7ddd5]">{quotation.selected.map(item => <article key={item.product.slug} className="py-5"><div className="flex items-center gap-4"><img src={item.product.catalogImage} alt="" className="h-20 w-24 object-contain" /><div><h3 className="font-semibold">{item.title}</h3><p className="mt-1 text-sm text-[#59635f]">{item.quantity} {item.quantity === 1 ? 'pod' : 'pods'}</p></div></div>{item.addons.length > 0 && <ul className="mt-3 space-y-2">{item.addons.map(addon => <li key={addon.id} className="flex items-center gap-3 text-sm text-[#59635f]">{addon.image && <img src={addon.image} alt="" className="h-10 w-10 object-contain" />}<span>{addon.label} × {item.quantity}</span></li>)}</ul>}</article>)}</div>
                <p className="mt-5 text-sm leading-relaxed text-[#59635f]">This is a preliminary quotation, subject to specification and site confirmation. Payment terms, tax treatment and lead time will be confirmed by Ace.</p>
                {reference && <div role="status" className="mt-5 border-l-2 border-[#007653] bg-[#edf3ed] p-4"><p className="flex items-center gap-2 font-semibold"><Check size={18} /> PDF downloaded</p><p className="mt-2 text-sm">Reference: {reference}</p><a href={`https://wa.me/${SEO_BRAND_PHONE.replace(/\D/g, '')}?text=${encodeURIComponent(sendText)}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-[#007653] underline">Ask Ace to confirm this quotation →</a><p className="mt-2 text-xs text-[#68726f]">Attach the downloaded PDF in WhatsApp.</p></div>}
              </div>}
            </fieldset>
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#d7ddd5] pt-5 sm:flex-row sm:justify-between">{step > 0 ? <button disabled={busy} onClick={() => go(step - 1)} className="inline-flex min-h-12 items-center justify-center gap-2 px-4 text-sm font-medium text-[#59635f]"><ArrowLeft size={17} /> Back</button> : <Link to="/get-a-quote" className="inline-flex min-h-12 items-center justify-center text-sm text-[#59635f] underline">Prefer help from Ace?</Link>}{step < 2 ? <button onClick={next} className={primary}>{step === 0 ? 'Next: your details' : 'Review quotation'}<ArrowRight size={17} /></button> : <button disabled={busy} onClick={download} className={primary}><Download size={17} />{busy ? 'Preparing your PDF…' : reference ? 'Download PDF again' : 'Download preliminary PDF'}</button>}</div>
          </div>
          <aside className="border-t-2 border-[#253f32] pt-5 lg:sticky lg:top-28" aria-label="Quotation estimate"><h2 className="text-lg font-semibold">Your estimate</h2><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between gap-3"><dt>{quotation.pending ? 'Known items subtotal' : 'Pods & add-ons'}</dt><dd className="font-semibold">{money(quotation.subtotal)}</dd></div><div className="flex justify-between gap-3"><dt>Delivery · one trip</dt><dd>{quotation.standardSite ? money(quotation.delivery) : 'To confirm'}</dd></div><div className="flex justify-between gap-3"><dt>Installation</dt><dd>{quotation.standardSite ? money(quotation.installation) : 'To confirm'}</dd></div><div className="flex justify-between gap-3 border-t border-[#d7ddd5] pt-4 text-lg font-semibold"><dt>Preliminary total</dt><dd>{!quotation.selected.length ? '—' : quotation.pending || !quotation.standardSite ? 'To confirm' : money(quotation.total)}</dd></div></dl><p className="mt-4 text-xs leading-relaxed text-[#68726f]">{quotation.pending ? 'One selected setup needs an agreed price. Ace will confirm it.' : !details.zone || !details.access ? 'Choose the delivery area and site access to estimate standard charges.' : !quotation.standardSite ? 'Your site requires delivery and installation review. The PDF will mark these charges “To confirm”.' : 'Includes standard delivery and installation. Final site scope and tax treatment require confirmation.'}</p></aside>
        </div>
      </div>
    </section>
  </PageShell>;
}
