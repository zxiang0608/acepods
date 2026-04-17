import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import SeoMeta from '../components/SeoMeta';
import SubpageHeader from '../components/SubpageHeader';
import { getProductBySlug } from '../data/products';
import { buildAbsoluteUrl, buildCanonical, createBreadcrumbSchema, createProductSchema } from '../seo/schema';

const SwatchGroup = ({ label, options, selectedId, onSelect, hideHeading = false }) => (
  <div>
    {!hideHeading && <h3 className="mb-3 text-[16px] font-semibold text-[#1e2227]">{label}</h3>}
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

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedExterior, setSelectedExterior] = useState('');
  const [selectedInterior, setSelectedInterior] = useState('');
  const [selectedConfigurationOptionId, setSelectedConfigurationOptionId] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isAddonMenuOpen, setIsAddonMenuOpen] = useState(false);
  const [isContactChooserOpen, setIsContactChooserOpen] = useState(false);
  const [isDimensionsModalOpen, setIsDimensionsModalOpen] = useState(false);
  const chooserRef = useRef(null);
  const addonMenuRef = useRef(null);

  useEffect(() => {
    if (!product) return;
    setSelectedExterior(product.defaultExterior);
    setSelectedInterior(product.defaultInterior);
    setSelectedImage(product.thumbImage || product.heroImage);
    setSelectedConfigurationOptionId(null);
    setSelectedAddons([]);
    setIsAddonMenuOpen(false);
    setIsContactChooserOpen(false);
    setIsDimensionsModalOpen(false);
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

  useEffect(() => {
    if (!isDimensionsModalOpen) return;

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setIsDimensionsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isDimensionsModalOpen]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f4f4f4] px-6 py-16 text-[#1e2227]">
        <SeoMeta
          title="Pod not found | AcePods"
          description="The requested office pod page is not available."
          canonical={buildCanonical(`/pods/${slug || ''}`)}
          robots="noindex, follow"
          schemas={[]}
        />
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

  const canonicalPath = `/pods/${product.slug}`;
  const whatsappHref = 'https://wa.link/9umr4q';
  const emailHref = `mailto:sales@aceofficepods.com?subject=${encodeURIComponent(`AcePods enquiry - ${product.name}`)}`;
  const pdpPricing = product.pdpPricing || {};
  const baseConfigurations = [...(pdpPricing.baseConfigurations || [])].sort((a, b) => a.price - b.price);
  const baseUnit = baseConfigurations[0];
  const configurationOptions = [...(pdpPricing.configurationOptions || [])].sort((a, b) => a.amount - b.amount);
  const selectedConfigurationOption = configurationOptions.find((configuration) => configuration.id === selectedConfigurationOptionId) || null;
  const selectedConfigurationAmount = selectedConfigurationOption?.amount || 0;
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
    { label: 'Installation (Klang Valley)', amount: installationAmount },
    { label: 'Delivery (Klang Valley)', amount: deliveryAmount },
    { label: 'Add-ons subtotal', amount: selectedAddonsAmount }
  ];
  const outstationNote =
    pdpPricing.delivery?.outstationNote ||
    'Other areas outside of Klang Valley will be subject to different delivery and installation charges. If items need to be carried via staircase, additional handling charges will apply.';
  const outstationNoteLines = outstationNote.match(/[^.?!]+[.?!]/g)?.map((line) => line.trim()) || [outstationNote];

  const formatRM = (amount) => `RM${amount.toLocaleString('en-MY')}`;
  const toggleConfigurationOption = (id) => {
    setSelectedConfigurationOptionId((current) => (current === id ? null : id));
  };
  const toggleAddon = (id) => {
    setSelectedAddons((current) => (current.includes(id) ? current.filter((addonId) => addonId !== id) : [...current, id]));
  };
  const selectedConfigurationLabels = selectedConfigurationOption ? [selectedConfigurationOption.label] : [];
  const selectedAddonLabels = availableAddons
    .filter((addon) => selectedAddons.includes(addon.id))
    .map((addon) => addon.label);
  const selectedOptionLabels = [...selectedConfigurationLabels, ...selectedAddonLabels];
  const colorImageMap = product.colorImageMap || null;
  const pairKey = `${selectedExterior}|${selectedInterior}`;
  const mappedImage =
    colorImageMap?.byPair?.[pairKey] ||
    colorImageMap?.byExterior?.[selectedExterior] ||
    colorImageMap?.byInterior?.[selectedInterior] ||
    colorImageMap?.default ||
    null;
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
    { label: 'Certified tested dBA (A-weighted decibels)', value: technicalSpecifications.certifiedTestedDba },
    { label: 'Weight', value: technicalSpecifications.weight }
  ].filter((row) => row.value);
  const customerPhotos = product.customerPhotos || [];
  const podPrimaryImage = product.thumbImage || product.heroImage;
  const mainImage = mappedImage || selectedImage || podPrimaryImage;
  const exteriorLabel = product.exteriorLabel || 'Exterior Color';
  const interiorMaterialSections = product.interiorMaterialSections || null;
  const mdfInteriorOptions = (interiorMaterialSections?.mdf?.optionIds || [])
    .map((optionId) => product.interiorColors.find((color) => color.id === optionId))
    .filter(Boolean);
  const petInteriorOptions = (interiorMaterialSections?.pet?.optionIds || [])
    .map((optionId) => product.interiorColors.find((color) => color.id === optionId))
    .filter(Boolean);
  const hasSplitInteriorSections = mdfInteriorOptions.length > 0 && petInteriorOptions.length > 0;
  const seoTitle = `${product.displayTitle || product.name} Office Pod Pricing, Specs and Colors | AcePods`;
  const seoDescription = `${product.displayTitle || product.name}: ${product.shortDesc}. ${product.pricing.amount} in Malaysia. View colors, add-ons, installation (Klang Valley), and delivery details.`;
  const seoSchemas = [
    createProductSchema({
      path: canonicalPath,
      name: product.displayTitle || product.name,
      description: product.shortDesc,
      image: podPrimaryImage || mainImage,
      price: baseUnit?.price,
      availability: 'https://schema.org/InStock',
      category: 'Office pods'
    }),
    createBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Ace Pods', path: '/office-pods' },
      { name: product.displayTitle || product.name, path: canonicalPath }
    ])
  ];
  const shouldShowThumbnails = customerPhotos.length > 0 && !product.hideThumbnailsOnColorMode;
  const isMainChairImage = typeof mainImage === 'string' && mainImage.includes('bar-stool');

  const handleExteriorSelect = (id) => {
    setSelectedExterior(id);
    if (product.syncExteriorInteriorSelection) {
      setSelectedInterior(id);
    }
  };

  const handleInteriorSelect = (id) => {
    setSelectedInterior(id);
    if (product.syncExteriorInteriorSelection) {
      setSelectedExterior(id);
    }
  };

  return (
    <main className="min-h-screen bg-[#efefef] text-[#1e2227]">
      <SeoMeta
        title={seoTitle}
        description={seoDescription}
        canonical={buildCanonical(canonicalPath)}
        ogImage={buildAbsoluteUrl(podPrimaryImage || mainImage)}
        schemas={seoSchemas}
      />
      <SubpageHeader />

      <section className="px-5 pb-8 pt-2 md:px-8 md:pb-12 md:pt-4">
        <div className="mx-auto w-full max-w-[1280px] space-y-12 lg:space-y-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:items-start lg:gap-12">
            <div className="min-w-0">
              <div className="flex flex-col gap-4 rounded-[8px]">
                <div
                  className={`flex-1 w-full min-h-[340px] sm:min-h-[380px] md:min-h-[500px] lg:min-h-0 ${
                    isMainChairImage ? 'flex items-center justify-center lg:items-start' : ''
                  }`}
                >
                  {isMainChairImage ? (
                    <img src={mainImage} alt={product.name} className="mx-auto block h-[60%] w-[60%] object-contain object-center" />
                  ) : (
                    <div className="relative h-full w-full">
                      <img
                        src={mainImage}
                        alt={product.name}
                        className="relative z-[1] mx-auto h-full w-full object-contain object-bottom mix-blend-multiply md:origin-bottom md:scale-[1.12] md:translate-y-[3%] lg:origin-top lg:scale-100 lg:translate-y-0 lg:object-top"
                      />
                    </div>
                  )}
                </div>
                {shouldShowThumbnails && (
                  <div className="mt-auto w-full overflow-x-auto pb-1">
                    <div className="mx-auto flex w-max snap-x snap-mandatory justify-center gap-2 px-5 md:snap-none md:gap-3 md:px-0">
                      {customerPhotos.map((photo, index) => {
                        const isActive = mainImage === photo;
                        return (
                          <button
                            key={`${product.slug}-customer-photo-${index}`}
                            type="button"
                            onClick={() => setSelectedImage(photo)}
                            className={`flex h-8 w-8 shrink-0 snap-start items-center justify-center overflow-hidden rounded-[6px] border bg-white transition md:h-[44px] md:w-[44px] ${
                              isActive ? 'border-[#145b5f] ring-1 ring-[#145b5f]/40' : 'border-[#d0d3d7] hover:border-[#98a2ac]'
                            }`}
                            aria-label={`View customer photo ${index + 1} for ${product.name}`}
                          >
                            <img src={photo} alt={`${product.name} customer installation ${index + 1}`} className="h-full w-full object-cover" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex flex-col">
                <p className="mb-4 text-[13px] font-medium text-[#1c6e72]">
                  Home / {product.breadcrumbLabel || 'Ace Pods'} / {product.displayTitle || product.name}
                </p>
                <h1 className="max-w-[12ch] text-[46px] font-semibold leading-[1.03] tracking-tight md:text-[64px]">
                  {product.displayTitle || product.name}
                </h1>
                <p className="mt-3 text-[16px] font-semibold leading-tight text-[#145b5f] md:text-[20px]">
                  Starting from {formatRM(baseUnit?.price || 0)}
                </p>
                <p className="mt-5 max-w-[42ch] text-[17px] leading-[1.5] text-[#2e3136]">{product.shortDesc}</p>

                <div className="mt-8 border-y border-[#d0d0d0] py-6 md:py-7">
                  <div className="grid gap-6 md:grid-cols-2 md:items-stretch md:gap-8">
                    <div className="h-full rounded-[6px] border border-[#d0d3d7] bg-white p-5 md:p-6">
                      <SwatchGroup label={exteriorLabel} options={product.exteriorColors} selectedId={selectedExterior} onSelect={handleExteriorSelect} />
                      <div className="mt-6 border-t border-[#d8d8d8] pt-6">
                        {hasSplitInteriorSections ? (
                          <div className="space-y-6">
                            <div>
                              <h3 className="mb-3 text-[14px] font-semibold leading-[1.4] text-[#1e2227]">
                                Interior Wall Colour Options (Melamine Faced Chipboard / MDF)
                              </h3>
                              <SwatchGroup
                                hideHeading
                                label="Interior Wall Colour Options (Melamine Faced Chipboard / MDF)"
                                options={mdfInteriorOptions}
                                selectedId={selectedInterior}
                                onSelect={handleInteriorSelect}
                              />
                            </div>

                            <div className="border-t border-[#e4e7eb] pt-4">
                              <h3 className="mb-3 text-[14px] font-semibold leading-[1.4] text-[#1e2227]">PET Fabric Interior Wall Colour</h3>
                              <SwatchGroup
                                hideHeading
                                label="PET Fabric Interior Wall Colour"
                                options={petInteriorOptions}
                                selectedId={selectedInterior}
                                onSelect={handleInteriorSelect}
                              />
                            </div>
                          </div>
                        ) : (
                          <SwatchGroup label="Interior Color" options={product.interiorColors} selectedId={selectedInterior} onSelect={handleInteriorSelect} />
                        )}
                      </div>
                    </div>

                    <div className="flex h-full flex-col gap-4">
                      <div className="relative rounded-[6px] border border-[#d0d3d7] bg-white p-5 md:p-6" ref={addonMenuRef}>
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
                                      const checked = selectedConfigurationOptionId === configuration.id;
                                      return (
                                        <label
                                          key={configuration.id}
                                          className="flex cursor-pointer items-center justify-between rounded-[4px] border border-transparent px-2 py-1.5 transition-colors hover:border-[#d5dade] hover:bg-[#f9fafb]"
                                        >
                                          <span className="flex items-center gap-2 text-[13px] font-medium text-[#333941]">
                                            <input
                                              type="radio"
                                              name={`configuration-option-${product.slug}`}
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

                      <div className="rounded-[6px] border border-[#d0d3d7] bg-white p-5 md:p-6">
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
                        <div className="mt-3 space-y-1 text-[11px] font-medium leading-[1.4] text-[#626a73]">
                          {outstationNoteLines.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>

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
                                WhatsApp Us
                              </a>
                              <a
                                href={emailHref}
                                className="mt-2 block rounded-[6px] border border-[#cdd1d5] px-3 py-2.5 text-center hover:bg-[#f5f6f7]"
                              >
                                <span className="block text-[14px] font-semibold text-[#1e2227]">Email Us</span>
                                <span className="mt-0.5 block text-[12px] font-medium text-[#5d6670]">sales@aceofficepods.com</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
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
                <h2 className="text-[18px] font-semibold tracking-tight text-[#1e2227]">Dimensions</h2>
                <div className="mt-3 w-full">
                  {product.drawing2dImage ? (
                    <button
                      type="button"
                      onClick={() => setIsDimensionsModalOpen(true)}
                      className="inline-flex max-w-full items-center justify-center overflow-hidden rounded-[6px] border border-[#d9d9d9] bg-[#f3f3f3] p-0.5 text-left transition-colors hover:border-[#b8bec5]"
                      aria-label={`View detailed dimensions for ${product.name}`}
                    >
                      <img
                        src={product.drawing2dImage}
                        alt={`${product.name} dimensions`}
                        className="block h-auto max-w-full w-auto [image-rendering:-webkit-optimize-contrast]"
                      />
                    </button>
                  ) : (
                    <div className="flex min-h-[180px] w-full items-center justify-center rounded-[6px] border border-[#d9d9d9] bg-[#f3f3f3] text-center text-[13px] font-medium text-[#6e737a]">
                      Dimensions will be added soon
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <section className="mx-auto w-full max-w-[980px] border-t border-[#d0d0d0] pt-8">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto inline-flex w-full items-center justify-center rounded-[6px] bg-[#145b5f] px-6 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-[#0f4b4e] sm:w-auto"
            >
              WhatsApp us
            </a>
          </section>
        </div>
      </section>

      {product.drawing2dImage && isDimensionsModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} dimensions detailed view`}
          onClick={() => setIsDimensionsModalOpen(false)}
        >
          <div className="relative max-h-[88vh] max-w-[92vw]" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsDimensionsModalOpen(false)}
              className="absolute right-2 top-2 z-10 rounded-[6px] bg-black/70 px-2 py-1 text-[12px] font-semibold text-white hover:bg-black"
              aria-label="Close dimensions viewer"
            >
              Close
            </button>
            <img
              src={product.drawing2dImage}
              alt={`${product.name} dimensions detailed view`}
              className="max-h-[88vh] max-w-[92vw] rounded-[8px] border border-[#d9d9d9] bg-white object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
