import React from 'react';
import { Link } from 'react-router-dom';
import { smartPodsMenuItems } from './smartPodsMenuData';
import { products } from '../data/products';

const stripItems = smartPodsMenuItems.map((item) => {
  const slug = item.to.replace('/pods/', '');
  const product = products.find((p) => p.slug === slug);
  return {
    to: item.to,
    image: item.image,
    imageClassName: item.imageClassName || '',
    name: item.title,
    support: product?.cardSupport || '',
    price: product?.pricing?.amount || '',
  };
});

export default function PodStrip() {
  return (
    <section className="border-b border-[#e8e8e8] bg-white">
      <div className="mx-auto max-w-[1440px]">
        <div
          className="flex overflow-x-auto md:grid md:grid-cols-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {stripItems.map((item, idx) => (
            <Link
              key={item.to}
              to={item.to}
              className={`group flex min-w-[148px] flex-col items-center px-3 py-5 text-center transition-colors hover:bg-[#f7f6f2] md:min-w-0 ${
                idx < stripItems.length - 1 ? 'border-r border-[#ebebeb]' : ''
              }`}
            >
              <div className="flex h-[68px] w-[68px] items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  width="136"
                  height="136"
                  className={`h-full w-full object-contain object-bottom ${item.imageClassName}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="mt-3 text-[13px] font-bold leading-tight text-[#111]">{item.name}</p>
              <p className="mt-1 text-[11px] leading-snug text-[#68726f]">{item.support}</p>
              <p className="mt-2 text-[11px] font-semibold text-[#00855a]">{item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
