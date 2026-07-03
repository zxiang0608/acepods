import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';

const OPTIONS = ['MYR', 'USD', 'SGD'];

export default function CurrencySwitcher({ className = '' }) {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  return (
    <div ref={rootRef} className={`relative text-[13px] font-medium ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 rounded-[6px] border border-stone-200 bg-white px-3 py-1.5 text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900"
      >
        {currency}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] z-20 min-w-full overflow-hidden rounded-[6px] border border-stone-200 bg-white shadow-md"
        >
          {OPTIONS.map((opt) => (
            <li key={opt} role="option" aria-selected={currency === opt}>
              <button
                type="button"
                onClick={() => {
                  setCurrency(opt);
                  setIsOpen(false);
                }}
                className={`block w-full px-3 py-1.5 text-left transition-colors ${
                  currency === opt ? 'bg-[#00855a] text-white' : 'bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
