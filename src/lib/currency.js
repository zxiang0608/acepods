const CACHE_KEY = 'ace_rates_v1';
const CACHE_TTL = 24 * 60 * 60 * 1000;
const PREF_KEY = 'ace_currency_pref';
const CURRENCY_EVENT = 'ace_currency_change';

export function isLocalMarket() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Kuala_Lumpur';
  } catch {
    return true;
  }
}

export function getCurrencyPref() {
  try { return localStorage.getItem(PREF_KEY) || null; } catch { return null; }
}

export function setCurrencyPref(currency) {
  try {
    localStorage.setItem(PREF_KEY, currency);
    window.dispatchEvent(new Event(CURRENCY_EVENT));
  } catch {}
}

export { CURRENCY_EVENT };

export function getRatesSync() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (cached && Date.now() - cached.ts < CACHE_TTL) return { usd: cached.usd, sgd: cached.sgd };
  } catch {}
  return null;
}

export async function fetchRates() {
  const cached = getRatesSync();
  if (cached) return cached;
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/MYR');
    const data = await res.json();
    const usd = data?.rates?.USD;
    const sgd = data?.rates?.SGD;
    if (!usd || !sgd) return null;
    localStorage.setItem(CACHE_KEY, JSON.stringify({ usd, sgd, ts: Date.now() }));
    return { usd, sgd };
  } catch {
    return null;
  }
}

export function myrToUsd(myr, rate) {
  return Math.ceil((myr * rate) / 100) * 100;
}

export function myrToSgd(myr, rate) {
  return Math.ceil((myr * rate) / 100) * 100;
}

// Backward compat — used by PricingPage indirectly via useCurrency
export const getUsdRateSync = () => getRatesSync()?.usd || null;
export const fetchUsdRate = async () => (await fetchRates())?.usd || null;
