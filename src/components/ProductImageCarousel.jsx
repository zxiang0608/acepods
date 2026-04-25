import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductImageCarousel({
  productName,
  slides,
  activeIndex,
  setActiveIndex,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onKeyDown
}) {
  const activeSlide = slides[activeIndex] || slides[0];

  return (
    <section
      className="rounded-[8px] border border-[#d8dbe0] bg-[#ececec] p-4 md:p-6"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label={`${productName} image carousel`}
    >
      <div className="relative flex min-h-[360px] items-center justify-center md:min-h-[520px]">
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)}
          aria-label="Previous image"
          className="absolute left-1 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#40c4ea] transition-colors hover:bg-white/70 md:left-2 md:h-11 md:w-11"
        >
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>

        <div className="flex h-full w-full items-center justify-center px-10 md:px-16">
          <img
            src={activeSlide?.src}
            alt={activeSlide?.alt || productName}
            className="max-h-[470px] w-auto max-w-full object-contain mix-blend-multiply"
          />
        </div>

        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
          aria-label="Next image"
          className="absolute right-1 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#40c4ea] transition-colors hover:bg-white/70 md:right-2 md:h-11 md:w-11"
        >
          <ChevronRight size={28} strokeWidth={2.5} />
        </button>
      </div>

      <div className="mt-4 overflow-x-auto pb-1">
        <div className="flex w-max gap-2">
          {slides.map((slide, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${slide.label}`}
                className={`h-[52px] w-[70px] shrink-0 overflow-hidden rounded-[5px] border bg-white transition-colors md:h-[60px] md:w-[82px] ${
                  selected ? 'border-[#145b5f] ring-1 ring-[#145b5f]/35' : 'border-[#d0d3d7] hover:border-[#9da7b1]'
                }`}
              >
                <img src={slide.src} alt={slide.alt || slide.label} className="h-full w-full object-cover" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
