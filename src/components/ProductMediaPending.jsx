import React from 'react';

export default function ProductMediaPending({ productName, variant = 'hero' }) {
  const isCard = variant === 'card';
  const isMenu = variant === 'menu';
  const sizeClass = isCard ? 'min-h-[180px]' : isMenu ? 'h-full min-h-[160px]' : 'h-full min-h-[320px]';

  return (
    <div
      role="img"
      aria-label={`${productName} product imagery pending approval`}
      className={`flex w-full items-center justify-center border border-dashed border-[#aeb8b3] bg-[#f2f1ec] px-5 text-center ${sizeClass}`}
    >
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#007653]">Product imagery pending</p>
        <p className="mt-2 max-w-[24ch] text-[12px] leading-[1.45] text-[#68726f]">
          Approved product visuals will be added after the source media is confirmed.
        </p>
      </div>
    </div>
  );
}
