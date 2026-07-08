import React from 'react';
import { useCurrency } from '../hooks/useCurrency';
import { myrToUsd, myrToSgd } from '../lib/currency';

export default function PodPrice({ myrAmount, prefix = 'From ', className = '' }) {
  const { currency, usdRate, sgdRate } = useCurrency();

  if (currency === 'USD' && usdRate) {
    const usd = myrToUsd(myrAmount, usdRate);
    return (
      <span className={className}>
        {prefix}USD ${usd.toLocaleString('en-US')}
        <span className="ml-1.5 text-[0.8em] font-normal opacity-50">ex-works</span>
      </span>
    );
  }

  if (currency === 'SGD' && sgdRate) {
    const sgd = myrToSgd(myrAmount, sgdRate);
    return (
      <span className={className}>
        {prefix}S$ {sgd.toLocaleString('en-SG')}
        <span className="ml-1.5 text-[0.8em] font-normal opacity-50">ex-works</span>
      </span>
    );
  }

  return (
    <span className={className}>
      {prefix}RM {myrAmount.toLocaleString('en-MY')}
    </span>
  );
}
