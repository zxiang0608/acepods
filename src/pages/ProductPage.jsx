import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [selectedConfigurationOptions, setSelectedConfigurationOptions] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isAddonMenuOpen, setIsAddonMenuOpen] = useState(false);
  const [isContactChooserOpen, setIsContactChooserOpen] = useState(false);
  const chooserRef = useRef(null);
  const addonMenuRef = useRef(null);

  useEffect(() => {
    if (!product) return;
    setSelectedExterior(product.defaultExterior);
    setSelectedInterior(product.defaultInterior);
    setSelectedConfigurationOptions([]);
    setSelectedAddons([]);
    setIsAddonMenuOpen(false);
    setIsContactChooserOpen(false);
  }, [product]);

  useEffect(() => {
    if (!isContactChooserOpen && !isAddonMenuOpen) return;

    const handleOutsideClick = (event) => {
      if (chooserRef.current && !chooserRef.current.contains(event.target)) {
        setIsContactChooserOpen(false);
      }
      if (addonMenuRef.current && !addonMenuRef.current.contains(event.target)) {
        setIsAddonMenuOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsContactChooserOpen(false);
        setIsAddonMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isAddonMenuOpen, isContactChooserOpen]);

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

  const whatsappHref = `https://wa.me/600000000000?text=${encodeURIComponent(`Hi AcePods, I'm interested in pricing for ${product.name}`)}`;
  const emailHref = `mailto:hello@acepods.my?subject=${encodeURIComponent(`AcePods enquiry - ${product.name}`)}`;
  const pdpPricing = product.pdpPricing || {};
  const baseConfigurations = [...(pdpPricing.baseConfigurations || [])].sort((a, b) => a.price - b.price);
  const baseUnit = baseConfigurations[0];
  const configurationOptions = [...(pdpPricing.configurationOptions || [])].sort((a, b) => a.amount - b.amount);
  const selectedConfigurationAmount = configurationOptions
    .filter((configuration) => selectedConfigurationOptions.includes(configuration.id))
    .reduce((sum, configuration) => sum + configuration.amount, 0);
  const availableAddons = pdpPricing.addOnOptions || [];
  const selectedAddonsAmount = availableAddons
    .filter((addon) => selectedAddons.includes(addon.id))
    .reduce((sum, addon) => sum + addon.amount, 0);
  const installationAmount = pdpPricing.installationPerUnit || 0;
  const deliveryAmount = pdpPricing.delivery?.default || 0;
  const computedTotal = (baseUnit?.price || 0) + selectedConfigurationAmount + installationAmount + deliveryAmount + selectedAddonsAmount;

  const pricingRows = [
    { label: 'Base unit price', amount: baseUnit?.price || 0 },
    { label: 'Add-on', amount: selectedConfigurationAmount },
    { label: 'Installation', amount: installationAmount },
    { label: 'Delivery (Klang Valley)', amount: deliveryAmount },
    { label: 'Add-ons subtotal', amount: selectedAddonsAmount }
  ];

  const formatRM = (amount) => `RM${amount.toLocaleString('en-MY')}`;
  const toggleConfigurationOption = (id) => {
    setSelectedConfigurationOptions((current) => (current.includes(id) ? current.filter((optionId) => optionId !== id) : [...current, id]));
  };
  const toggleAddon = (id) => {
    setSelectedAddons((current) => (current.includes(id) ? current.filter((addonId) => addonId !== id) : [...current, id]));
  };
  const selectedConfigurationLabels = configurationOptions
    .filter((configuration) => selectedConfigurationOptions.includes(configuration.id))
    .map((configuration) => configuration.label);
  const selectedAddonLabels = availableAddons
    .filter((addon) => selectedAddons.includes(addon.id))
    .map((addon) => addon.label);
  const selectedOptionLabels = [...selectedConfigurationLabels, ...selectedAddonLabels];
  const technicalSpecifications = product.technicalSpecifications || {};
  const technicalSpecRows = [
    { label: 'Capacity', value: technicalSpecifications.capacity },
    { label: 'External dimensions', value: technicalSpecifications.externalDimensions },
    { label: 'Internal dimensions', value: technicalSpecifications.internalDimensions },
    { label: 'Internal height', value: technicalSpecifications.internalHeight },
    {
      label: 'External height',
      value:
        technicalSpecifications.externalHeight && technicalSpecifications.roomHeightRequirement
          ? `${technicalSpecifications.externalHeight} (room height required: ${technicalSpecifications.roomHeightRequirement})`
          : technicalSpecifications.externalHeight
    },
    { label: 'Weight', value: technicalSpecifications.weight }
  ].filter((row) => row.value);

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
        <div className="mx-auto w-full max-w-[1280px] space-y-12 lg:space-y-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:gap-12">
            <div className="min-w-0 flex items-end">
              <div className="w-full rounded-[8px]">
                <img
                  src={product.thumbImage || product.heroImage}
                  alt={product.name}
                  className="mx-auto h-auto w-full object-contain md:origin-bottom md:scale-[1.2] md:translate-y-[10%]"
                />
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

              <div className="mt-8 border-y border-[#d0d0d0] py-6 md:py-7">
                <div className="grid gap-6 md:grid-cols-2 md:items-stretch md:gap-8">
                  <div className="h-full rounded-[6px] border border-[#d0d3d7] bg-white p-5 md:p-6">
                    <SwatchGroup label="Exterior Color" options={product.exteriorColors} selectedId={selectedExterior} onSelect={setSelectedExterior} />
                    <div className="mt-6 border-t border-[#d8d8d8] pt-6">
                      <SwatchGroup label="Interior Color" options={product.interiorColors} selectedId={selectedInterior} onSelect={setSelectedInterior} />
                    </div>
                    <div className="relative mt-6 border-t border-[#d8d8d8] pt-6" ref={addonMenuRef}>
                      <h3 className="mb-3 text-[16px] font-semibold text-[#1e2227]">Add-ons</h3>
                      <button
                        type="button"
                        onClick={() => setIsAddonMenuOpen((prev) => !prev)}
                        aria-expanded={isAddonMenuOpen}
                        aria-controls="addons-menu"
                        className="flex w-full items-center justify-between rounded-[6px] border border-[#d8d8d8] bg-[#fbfbfb] px-3 py-2.5 text-left text-[13px] font-medium text-[#333941] transition-colors hover:bg-white"
                      >
                        <span>
                          {selectedOptionLabels.length > 0
                            ? `${selectedOptionLabels.length} option${selectedOptionLabels.length > 1 ? 's' : ''} selected`
                            : 'Select add-ons'}
                        </span>
                        <span className="text-[12px] text-[#67707a]">{isAddonMenuOpen ? '▲' : '▼'}</span>
                      </button>
                      {selectedOptionLabels.length > 0 && (
                        <p className="mt-2 line-clamp-2 text-[12px] leading-[1.4] text-[#5d6670]">{selectedOptionLabels.join(', ')}</p>
                      )}

                      {isAddonMenuOpen && (
                        <div
                          id="addons-menu"
                          className="absolute left-0 top-full z-20 mt-2 w-full rounded-[8px] border border-[#d8d8d8] bg-white p-2.5 shadow-lg"
                        >
                          <div className="grid gap-2.5">
                            <div>
                              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#66707a]">Configuration options</p>
                              <div className="grid gap-1.5">
                                {configurationOptions.length > 0 ? (
                                  configurationOptions.map((configuration) => {
                                    const checked = selectedConfigurationOptions.includes(configuration.id);
                                    return (
                                      <label
                                        key={configuration.id}
                                        className="flex cursor-pointer items-center justify-between rounded-[4px] border border-transparent px-2 py-1.5 transition-colors hover:border-[#d5dade] hover:bg-[#f9fafb]"
                                      >
                                        <span className="flex items-center gap-2 text-[13px] font-medium text-[#333941]">
                                          <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => toggleConfigurationOption(configuration.id)}
                                            className="h-4 w-4 accent-[#145b5f]"
                                          />
                                          {configuration.label}
                                        </span>
                                        <span className="text-[12px] font-semibold tabular-nums text-[#59606a]">{formatRM(configuration.amount)}</span>
                                      </label>
                                    );
                                  })
                                ) : (
                                  <p className="px-2 py-1.5 text-[12px] text-[#6b727b]">No configuration upgrades for this pod.</p>
                                )}
                              </div>
                            </div>

                            <div className="border-t border-[#e4e7eb] pt-2.5">
                              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#66707a]">Other add-ons</p>
                              <div className="grid gap-1.5">
                                {availableAddons.length > 0 ? (
                                  availableAddons.map((addon) => {
                                    const checked = selectedAddons.includes(addon.id);
                                    return (
                                      <label
                                        key={addon.id}
                                        className="flex cursor-pointer items-center justify-between rounded-[4px] border border-transparent px-2 py-1.5 transition-colors hover:border-[#d5dade] hover:bg-[#f9fafb]"
                                      >
                                        <span className="flex items-center gap-2 text-[13px] font-medium text-[#333941]">
                                          <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => toggleAddon(addon.id)}
                                            className="h-4 w-4 accent-[#145b5f]"
                                          />
                                          {addon.label}
                                        </span>
                                        <span className="text-[12px] font-semibold tabular-nums text-[#59606a]">{formatRM(addon.amount)}</span>
                                      </label>
                                    );
                                  })
                                ) : (
                                  <p className="px-2 py-1.5 text-[12px] text-[#6b727b]">No additional add-ons for this pod.</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="h-full rounded-[6px] border border-[#d0d3d7] bg-white p-5 md:p-6">
                    <p className="text-[16px] font-semibold leading-tight text-[#1e2227]">Pricing overview</p>
                    <dl className="mt-3 text-[14px]">
                      <div className="space-y-0">
                        {pricingRows.map((row) => (
                          <div key={row.label} className="grid grid-cols-[1fr_auto] items-center border-b border-[#e8eaed] py-2.5">
                            <dt className="font-medium text-[#414850]">{row.label}</dt>
                            <dd className="text-right font-semibold tabular-nums text-[#1f232a]">{formatRM(row.amount)}</dd>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 border-t border-[#d3d9df] pt-3">
                        <div className="grid grid-cols-[1fr_auto] items-center">
                          <dt className="text-[16px] font-semibold text-[#1f232a]">Total</dt>
                          <dd className="text-right text-[18px] font-bold tabular-nums text-[#1f232a]">{formatRM(computedTotal)}</dd>
                        </div>
                      </div>
                    </dl>
                    <p className="mt-3 text-[11px] font-medium leading-[1.4] text-[#626a73]">
                      {pdpPricing.delivery?.outstationNote || 'Outstation: please email'}
                    </p>
                    <p className="mt-2 text-[11px] font-medium leading-[1.4] text-[#626a73]">
                      Indicative pricing, final quote depends on finish and site conditions.
                    </p>

                    <div className="relative mt-4" ref={chooserRef}>
                      <button
                        type="button"
                        onClick={() => setIsContactChooserOpen((prev) => !prev)}
                        aria-expanded={isContactChooserOpen}
                        aria-controls="contact-chooser"
                        className="w-full rounded-[4px] border border-[#145b5f] bg-white px-4 py-3 text-[15px] font-semibold text-[#145b5f] transition-colors hover:bg-[#f1f6f6]"
                      >
                        Contact Us
                      </button>

                      {isContactChooserOpen && (
                        <div
                          id="contact-chooser"
                          className="absolute right-0 top-full z-20 mt-2 w-full min-w-[220px] rounded-[8px] border border-[#d7d7d7] bg-white p-3 shadow-lg md:w-[240px]"
                        >
                          <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-[6px] bg-[#145b5f] px-3 py-2.5 text-center text-[14px] font-semibold text-white hover:bg-[#0f4b4e]"
                          >
                            WhatsApp
                          </a>
                          <a
                            href={emailHref}
                            className="mt-2 block rounded-[6px] border border-[#cdd1d5] px-3 py-2.5 text-center text-[14px] font-semibold text-[#1e2227] hover:bg-[#f5f6f7]"
                          >
                            Email
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,56fr)_minmax(0,44fr)] lg:gap-12">
            <div className="min-w-0">
              <div className="h-full space-y-5">
                <div>
                  <h2 className="text-[24px] font-semibold tracking-tight">Technical Specifications</h2>
                  <dl className="mt-3 grid gap-y-2">
                    {technicalSpecRows.map((spec) => (
                      <div key={spec.label} className="flex items-start justify-between gap-4 border-b border-[#d9d9d9] pb-2 text-[14px]">
                        <dt className="font-medium text-[#4e535a]">{spec.label}</dt>
                        <dd className="max-w-[70%] text-right font-semibold text-[#1f232a]">{spec.value}</dd>
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
            </div>

            <div className="min-w-0">
              <div className="h-full">
                <h2 className="text-[18px] font-semibold tracking-tight text-[#1e2227]">2D Drawing</h2>
                <div className="mt-3 h-[250px] w-full overflow-hidden rounded-[6px] border border-[#d9d9d9] bg-[#f3f3f3] p-1.5 md:h-[320px] lg:h-[360px]">
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
          </div>

          <section className="mx-auto w-full max-w-[980px] border-t border-[#d0d0d0] pt-8">
            <h2 className="text-center text-[24px] font-semibold tracking-tight">FAQ</h2>
            <div className="mt-4">
              {product.faq.map((item) => (
                <article key={item.q} className="border-b border-[#d9d9d9] py-4 text-center">
                  <h3 className="text-[16px] font-semibold text-[#1f232a]">{item.q}</h3>
                  <p className="mx-auto mt-1.5 max-w-[90ch] text-[14px] leading-[1.55] text-[#4b5058]">{item.a}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
