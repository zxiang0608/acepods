import React from 'react';

export default function SelectionCarousel({ title, items, isSelected, onSelect, emptyText = 'No options available.' }) {
  return (
    <section>
      <h3 className="mb-3 text-[14px] font-semibold text-[#172126]">{title}</h3>
      {items.length === 0 ? (
        <p className="rounded-[6px] border border-[#d9dde2] bg-white px-3 py-2 text-[12px] text-[#68726f]">{emptyText}</p>
      ) : (
        <div className="overflow-x-auto pb-1">
          <div className="flex w-max gap-2">
            {items.map((item) => {
              const selected = isSelected(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={`w-[122px] shrink-0 overflow-hidden rounded-[8px] border bg-white text-left transition-colors ${
                    selected ? 'border-[#00855a] ring-1 ring-[#007653]/35' : 'border-[#d0d3d7] hover:border-[#a7b0b8]'
                  }`}
                >
                  {item.image ? (
                    <div className="h-[74px] w-full bg-[#f7f6f2]">
                      <img src={item.image} alt={item.label} className="h-full w-full object-cover" />
                    </div>
                  ) : item.swatchHex ? (
                    <div className="h-[30px] w-full border-b border-[#e2e5e8]" style={{ backgroundColor: item.swatchHex }} />
                  ) : (
                    <div className="h-[30px] w-full border-b border-[#e2e5e8] bg-[#f7f6f2]" />
                  )}
                  <div className="px-2.5 py-2">
                    <p className="line-clamp-2 text-[12px] font-semibold leading-[1.35] text-[#172126]">{item.label}</p>
                    {item.meta && <p className="mt-1 text-[11px] font-medium text-[#68726f]">{item.meta}</p>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
