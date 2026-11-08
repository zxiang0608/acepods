import { publishedProducts } from '../data/products';
import { POD_SEO_BY_SLUG } from '../data/podSeoCatalog';
import { STANDARD_KLANG_VALLEY_DELIVERY } from '../data/commercialTerms.js';
import { SEO_BRAND_LEGAL, SEO_BRAND_IDENTIFIER, SEO_BRAND_EMAIL, SEO_BRAND_PHONE, SEO_BRAND_ADDRESS } from '../seo/constants';

export const quotationProducts = publishedProducts.filter(product => product.publicationStatus !== 'prelaunch');
export const quoteCents = amount => Math.round((Number(amount) || 0) * 100);
export const formatQuotationMoney = cents => 'RM' + (cents / 100).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const seatingGroup = id => ['high-bar-stool', 'two-high-bar-stools', 'office-chair', 'flex-sofa'].includes(id);
export const setupIncludesSofa = setup => /sofa/i.test(setup?.label || '');
export const quoteDate = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
export const preliminaryReference = () => 'ACE-PRE-' + quoteDate().replaceAll('-', '') + '-' + crypto.randomUUID().slice(0, 8).toUpperCase();

export function calculatePreliminaryQuotation(selections, location) {
  const rows = [], selected = [];let subtotal = 0, installation = 0, pending = false;
  for (const selection of selections) {
    if (!selection.qty) continue;
    const product = quotationProducts.find(item => item.slug === selection.slug);
    if (!product || !Number.isInteger(selection.qty) || selection.qty < 1 || selection.qty > 99) throw Error('Choose a valid pod and a quantity from 1 to 99.');
    const pricing = product.pdpPricing, setup = pricing.configurationOptions?.find(option => option.id === selection.configurationId);
    if (selection.configurationId && !setup) throw Error('Choose an available setup for ' + product.name + '.');
    const base = pricing.baseConfigurations[0].price, setupPending = !!setup && typeof setup.amount !== 'number';
    const unitPrice = base + (typeof setup?.amount === 'number' ? setup.amount : 0);
    const title = product.name + (setup ? ' (' + setup.label + ' variant)' : '');
    pending ||= setupPending;
    subtotal += quoteCents(unitPrice) * selection.qty;
    installation += quoteCents(pricing.installationPerUnit) * selection.qty;
    const index = String(selected.length + 1), addons = [];
    const dimensions = POD_SEO_BY_SLUG[product.slug].schemaProperties.find(property => property.name === 'External dimensions')?.value || '';
    rows.push({ kind: 'item', description: '**' + title + '**', dimensions, qty: selection.qty, price: unitPrice, pricePending: setupPending, free: false, height: 0, columns: 1, images: [{ name: product.name, data: product.catalogImage }], indexLabel: index });
    const ids = [...new Set(selection.addonIds || [])];
    if (ids.filter(seatingGroup).length > 1) throw Error('Choose one seating option for ' + product.name + '.');
    for (const id of ids) {
      const option = pricing.addOnOptions?.find(addon => addon.id === id);
      if (!option) throw Error('Choose an available add-on for ' + product.name + '.');
      if (setupIncludesSofa(setup) && /sofa/i.test(option.label)) throw Error('Sofas are already included in the selected setup.');
      const pricePending = typeof option.amount !== 'number';pending ||= pricePending;
      subtotal += quoteCents(option.amount) * selection.qty;
      const label = option.label + (product.slug === 'ace-flex' && id === 'flex-sofa' ? '\nSofa shown inside Ace Flex; pod priced separately.' : '');
      rows.push({ kind: 'item', isAddon: true, description: label, dimensions: '', qty: selection.qty, price: option.amount || 0, pricePending, free: false, height: 0, columns: 1, images: option.image ? [{ name: option.label, data: option.image }] : [], indexLabel: index + '.' + (addons.length + 1) });
      addons.push(option);
    }
    selected.push({ product, quantity: selection.qty, title, setup, addons });
  }
  const standardSite = location.zone === 'klang-valley' && location.access === 'standard';
  const delivery = standardSite && selected.length ? quoteCents(STANDARD_KLANG_VALLEY_DELIVERY) : 0;
  const fees = standardSite ? delivery + installation : 0;
  return { rows, selected, subtotal, installation, delivery, fees, standardSite, pending, total: subtotal + fees, discount: 0, tax: 0 };
}

export function preliminaryDocumentState(details, quotation, reference) {
  return { preliminary: true, documentTitle: 'PRELIMINARY QUOTATION', reference, date: quoteDate(), agent: 'Online quotation', customer: details.company.trim() || details.name.trim(), attention: details.name.trim(), email: details.email.trim(), phone: details.phone.trim(), address: details.address.trim() || details.city.trim(), sameAddress: true, deliveryAddress: '', building: '', floor: '', handling: details.access === 'standard' ? 'GROUND FLOOR / SUITABLE LIFT' : details.access === 'staircase' ? 'STAIRCASE — REVIEW REQUIRED' : 'TO CONFIRM', companyName: SEO_BRAND_LEGAL, companyRef: SEO_BRAND_IDENTIFIER, companyAddress: `${SEO_BRAND_ADDRESS}, Malaysia`, companyPhone: SEO_BRAND_PHONE, companyEmail: SEO_BRAND_EMAIL, websites: 'www.aceofficepods.com', chargesConfirmed: quotation.standardSite, delivery: quotation.delivery / 100, installation: quotation.installation / 100, handlingFee: 0, tax: 0, discount: 0, notes: 'Preliminary quotation based on your selections.\nFinal specifications, finishes and site scope require Ace confirmation.\nTax treatment and payment terms to confirm.', payment: '' };
}

let fontsReady;
async function loadQuotationFonts(assets) {
  if (!fontsReady) fontsReady = Promise.all([[400, assets.regular], [700, assets.bold]].map(async ([weight, url]) => { const font = await new FontFace('QuoteAssistant', `url(${url})`, { weight: String(weight) }).load();document.fonts.add(font); })).catch(error => { fontsReady = null;throw error; });
  return fontsReady;
}
async function imageDataUrl(url) {
  if (url.startsWith('data:image/')) return url;
  const response = await fetch(url);if (!response.ok) throw Error('An image could not load. Please try again.');
  const blob = await response.blob();
  return new Promise((resolve, reject) => { const reader = new FileReader();reader.onload = () => resolve(reader.result);reader.onerror = () => reject(Error('An image could not be read.'));reader.readAsDataURL(blob); });
}
export async function downloadPreliminaryQuotation(details, quotation, reference) {
  const [{ createQuotationDocument }, { default: assets }] = await Promise.all([import('./quotationDocument.js'), import('../../tools/quotation-generator/assets.json')]);
  await loadQuotationFonts(assets);
  const cache = new Map(), rows = await Promise.all(quotation.rows.map(async row => ({ ...row, images: await Promise.all(row.images.map(async image => { if (!cache.has(image.data)) cache.set(image.data, imageDataUrl(image.data));return { ...image, data: await cache.get(image.data) }; })) })));
  const state = preliminaryDocumentState(details, quotation, reference);
  const document = createQuotationDocument({ state, assets, helpers: { num: value => Math.max(0, Number(value) || 0), cents: quoteCents, formatted: value => (value / 100).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), calculate: () => quotation, quoteRows: () => rows } });
  const images = [];for (const page of document.render()) images.push(await document.svgToJpeg(page.svg));
  const url = URL.createObjectURL(document.makePdf(images)), anchor = window.document.createElement('a');anchor.href = url;anchor.download = reference + '.pdf';window.document.body.append(anchor);anchor.click();anchor.remove();setTimeout(() => URL.revokeObjectURL(url), 30000);
}
