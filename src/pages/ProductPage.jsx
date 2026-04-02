import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import acePodsLogo from '../../Logos/ace pods logo.png';
import { getProductBySlug } from '../data/products';

const SwatchGroup = ({ label, options, selectedId, onSelect }) => (
  <div>
    <h3 className="mb-3 text-[16px] font-semibold text-[#1e2227]">{label}</h3>
    <div className="flex flex-wrap gap-2">
      {options.map((color) => {
        const selected = color.id === selectedId;
        return (
          <button
            key={color.id}
            type="button"
            onClick={() => onSelect(color.id)}
            className={`relative h-10 w-10 border transition-all ${selected ? 'border-[#1e2227] ring-1 ring-[#1e2227]' : 'border-[#c9c9c9]'}`}
            style={{ backgroundColor: color.hex }}
            aria-label={`${label}: ${color.label}`}
          >
            {selected && <Check size={14} className="absolute right-1 top-1 text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.75)]" />}
          </button>
        );
      })}
    </div>
    <p className="mt-2 text-[12px] font-medium text-[#666]">{options.find((option) => option.id === selectedId)?.label}</p>
  </div>
);

export default function ProductPage() {
  const { slug } = useParams();
  const product = useMemo(() => getProductBySlug(slug), [slug]);

  const [selectedExterior, setSelectedExterior] = useState('');
  const [selectedInterior, setSelectedInterior] = useState('');

  useEffect(() => {
    if (!product) return;
    setSelectedExterior(product.defaultExterior);
    setSelectedInterior(product.defaultInterior);
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f4f4f4] px-6 py-16 text-[#1e2227]">
        <div className="mx-auto max-w-[900px] rounded-[16px] border border-[#dedede] bg-white p-8 text-center">
          <h1 className="text-[32px] font-bold tracking-tight">Pod not found</h1>
          <p className="mx-auto mt-3 max-w-[46ch] text-[16px] text-[#666]">The product page you requested does not exist or is not available yet.</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-[6px] border border-[#1e2227] px-5 py-3 text-[14px] font-semibold text-[#1e2227] transition-colors hover:bg-[#1e2227] hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#efefef] text-[#1e2227]">
      <header className="bg-[#efefef]">
        <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-5 md:px-8">
          <Link to="/">
            <img src={acePodsLogo} alt="Ace Pods" className="h-8 w-auto" />
          </Link>
          <div className="h-8 w-8" />
        </div>
      </header>

      <section className="px-5 pb-8 pt-2 md:px-8 md:pb-12 md:pt-4">
        <div className="mx-auto w-full max-w-[1280px] space-y-8 lg:space-y-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:gap-12">
            <div className="min-w-0">
              <div className="overflow-hidden rounded-[8px] bg-[#efefef] p-1.5 md:p-2">
                <img src={product.heroImage} alt={product.name} className="h-auto w-full object-contain" />
              </div>
            </div>

            <div className="min-w-0 self-start">
              <p className="mb-4 text-[13px] font-medium text-[#1c6e72]">
                Home / {product.breadcrumbLabel || 'Ace Pods'} / {product.displayTitle || product.name}
              </p>
              <h1 className="max-w-[12ch] text-[46px] font-semibold leading-[1.03] tracking-tight md:text-[64px]">
                {product.displayTitle || product.name}
              </h1>
              <p className="mt-5 max-w-[42ch] text-[17px] leading-[1.5] text-[#2e3136]">{product.shortDesc}</p>

              <div className="mt-8 border-y border-[#d0d0d0] py-6">
                <SwatchGroup label="Exterior Color" options={product.exteriorColors} selectedId={selectedExterior} onSelect={setSelectedExterior} />
                <div className="mt-6 border-t border-[#d8d8d8] pt-6">
                  <SwatchGroup label="Interior Color" options={product.interiorColors} selectedId={selectedInterior} onSelect={setSelectedInterior} />
                </div>
              </div>

              <button className="mt-6 w-full rounded-[4px] bg-[#145b5f] px-5 py-4 text-white transition-colors hover:bg-[#0f4b4e]">
                <span className="block text-[20px] font-semibold leading-tight">Get Pricing</span>
                <span className="mt-1 block text-[26px] font-semibold leading-tight tracking-tight">{product.pricing.amount}</span>
                <span className="mt-2 block text-[11px] font-medium leading-[1.4] text-white/80">
                  Indicative pricing, final quote depends on finish and site conditions.
                </span>
              </button>
            </div>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:gap-12">
            <div className="min-w-0">
              <div className="rounded-[8px] border border-[#d8d8d8] bg-white p-4 md:p-5">
                <h2 className="text-[18px] font-semibold tracking-tight text-[#1e2227]">2D Drawing</h2>
                <div className="mt-3 aspect-square w-full overflow-hidden rounded-[6px] border border-[#e8e8e8] bg-[#f3f3f3] p-1.5">
                  {product.drawing2dImage ? (
                    <img
                      src={product.drawing2dImage}
                      alt={`${product.name} 2D drawing`}
                      className="h-full w-full object-contain [image-rendering:-webkit-optimize-contrast]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-center text-[13px] font-medium text-[#6e737a]">
                      2D drawing will be added soon
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="min-w-0 self-start">
              <div className="space-y-5 rounded-[8px] border border-[#d8d8d8] bg-white p-5">
                <div>
                  <h2 className="text-[24px] font-semibold tracking-tight">Key Specs</h2>
                  <dl className="mt-3 grid gap-y-2">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex items-start justify-between gap-4 border-b border-[#ececec] pb-2 text-[14px]">
                        <dt className="font-medium text-[#4e535a]">{spec.label}</dt>
                        <dd className="text-right font-semibold text-[#1f232a]">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <h3 className="text-[20px] font-semibold tracking-tight">Best for</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] text-[#3d4147]">
                    {product.useCases.map((useCase) => (
                      <li key={useCase}>{useCase}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 rounded-[8px] border border-[#d8d8d8] bg-white p-5">
                <h2 className="text-[24px] font-semibold tracking-tight">FAQ</h2>
                <div className="mt-4 space-y-4">
                  {product.faq.map((item) => (
                    <div key={item.q} className="border-t border-[#ececec] pt-3">
                      <h3 className="text-[15px] font-semibold text-[#1f232a]">{item.q}</h3>
                      <p className="mt-1 text-[14px] leading-[1.5] text-[#4b5058]">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
