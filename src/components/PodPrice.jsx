import React from 'react';
import { useCurrency } from '../hooks/useCurrency';
import { myrToUsd } from '../lib/currency';

export default function PodPrice({ myrAmount, prefix = 'From ', className = '' }) {
  const { isLocal, usdRate } = useCurrency();

  if (isLocal || !usdRate) {
    return (
      <span className={className}>
        {prefix}RM {myrAmount.toLocaleString('en-MY')}
      </span>
    );
  }

  const usd = myrToUsd(myrAmount, usdRate);
  return (
    <span className={className}>
      {prefix}USD ${usd.toLocaleString('en-US')}
      <span className="ml-1.5 text-[0.8em] font-normal opacity-50">ex-works</span>
    </span>
  );
}
