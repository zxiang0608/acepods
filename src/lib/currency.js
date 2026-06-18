const CACHE_KEY = 'ace_usd_rate_v1';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export function isLocalMarket() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Kuala_Lumpur';
  } catch {
    return true; // default to MYR on any detection failure
  }
}

export function getUsdRateSync() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.rate;
  } catch {
    // ignore
  }
  return null;
}

export async function fetchUsdRate() {
  const cached = getUsdRateSync();
  if (cached) return cached;
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/MYR');
    const data = await res.json();
    const rate = data?.rates?.USD;
    if (!rate) return null;
    localStorage.setItem(CACHE_KEY, JSON.stringify({ rate, ts: Date.now() }));
    return rate;
  } catch {
    return null;
  }
}

// Round up MYR→USD to the nearest $100
export function myrToUsd(myr, rate) {
  return Math.ceil((myr * rate) / 100) * 100;
}
