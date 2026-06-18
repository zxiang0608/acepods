import { useState, useEffect } from 'react';
import { isLocalMarket, getUsdRateSync, fetchUsdRate } from '../lib/currency';

export function useCurrency() {
  const isLocal = isLocalMarket();
  const [usdRate, setUsdRate] = useState(() => (isLocal ? null : getUsdRateSync()));

  useEffect(() => {
    if (isLocal) return;
    fetchUsdRate().then((rate) => {
      if (rate) setUsdRate(rate);
    });
  }, [isLocal]);

  return { isLocal, usdRate };
}
