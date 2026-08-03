import React from 'react';
import { Link } from 'react-router-dom';

export default function SmartPodsBanner({ items, onItemClick, maxWidthClass = 'max-w-[1600px]' }) {
  return (
    <div className="absolute left-0 top-full hidden w-full border-t border-[#d9d9d9] bg-[#eeece7] lg:block">
      <div className={`mx-auto ${maxWidthClass} px-12 py-10`}>
        <div className="grid grid-cols-5 gap-8">
          {items.map((item) => (
            <Link key={item.title} to={item.to} onClick={onItemClick} className="flex flex-col items-center text-center">
              <div className="flex h-[180px] w-full items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  width="320"
                  height="320"
                  className={`h-full w-full object-contain object-bottom ${item.imageClassName || ''}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="mt-5 text-[20px] font-semibold tracking-tight text-[#007653]">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.5] text-[#68726f]">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
