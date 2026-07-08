import { useState, useEffect } from 'react';
import { isLocalMarket, getCurrencyPref, setCurrencyPref, getRatesSync, fetchRates, CURRENCY_EVENT } from '../lib/currency';

export function useCurrency() {
  const [currency, setCurrencyState] = useState(() => {
    const pref = getCurrencyPref();
    if (pref) return pref;
    return isLocalMarket() ? 'MYR' : 'USD';
  });

  const [rates, setRates] = useState(() => getRatesSync());

  useEffect(() => {
    const handler = () => {
      const pref = getCurrencyPref();
      if (pref) setCurrencyState(pref);
    };
    window.addEventListener(CURRENCY_EVENT, handler);
    return () => window.removeEventListener(CURRENCY_EVENT, handler);
  }, []);

  useEffect(() => {
    if (currency === 'MYR') return;
    fetchRates().then((r) => { if (r) setRates(r); });
  }, [currency]);

  const setCurrency = (c) => {
    setCurrencyState(c);
    setCurrencyPref(c);
  };

  return {
    currency,
    setCurrency,
    usdRate: rates?.usd || null,
    sgdRate: rates?.sgd || null,
    isLocal: currency === 'MYR',
  };
}
