import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import SeoMeta from '../components/SeoMeta';
import SiteFooter from '../components/SiteFooter';
import SubpageHeader from '../components/SubpageHeader';
import { getProductBySlug } from '../data/products';
import { POD_SEO_BY_SLUG } from '../data/podSeoCatalog';
import { pushDataLayerEvent } from '../lib/tracking';
import { getGalleryAvifSource } from '../lib/galleryImages';
import { SEO_KEYWORDS_COMMON } from '../seo/constants';
import { buildAbsoluteUrl, buildCanonical, createBreadcrumbSchema, createFaqSchema, createProductSchema, organizationSchema, websiteSchema } from '../seo/schema';
import { getProductMeta, getProductPublicImage } from '../seo/pageMeta';
import QuoteForm from '../components/QuoteForm';
import { getProductMaterialMarks } from '../data/productMaterialMarks';
import barStoolBlack from '../../assets/bar-stool-black.png';
import barStoolWhite from '../../assets/bar-stool-white.png';

const EMPTY_PRESENTATION_GALLERY = [];

const PDP_QUICK_ANSWER_COPY = {
  'ace-uno': {
    intro:
      'Ace Uno is an enclosed one-person acoustic pod for calls, video meetings, and focused work. It includes ventilation, lighting, power, and a work surface, without requiring a permanent built room. Delivery timing and installation scope are confirmed for each site.',
    heading: 'Quick answers about Ace Uno',
    items: [
      {
        q: 'What is Ace Uno?',
        a: 'Ace Uno is a freestanding call and focus pod for one person, with a built-in worktop, LED lighting, dual ventilation fans, power socket, and USB charging. It is installed without building a permanent room.'
      },
      {
        q: 'How much does Ace Uno cost in Malaysia?',
        a: ({ startingPriceText }) =>
          `Ace Uno starts from ${startingPriceText} for the pod only. Standard Klang Valley installation is RM350 and delivery is RM350, making RM9,550 before the optional stool or RM9,800 with the optional RM250 high bar stool.`
      },
      {
        q: 'What is Ace Uno best for?',
        a: 'Ace Uno works best for short, frequent calls, video meetings, and focused work in open-plan offices when a permanent room is not required.'
      },
      {
        q: 'How is Ace Uno different from Ace Plus?',
        a: 'Ace Uno is the lower-priced enclosed call and focus pod with a wider footprint. Ace Plus has a smaller footprint and a separate unverified first-party approximately 27 dB(A) claim. Compare dimensions, intended session length, ventilation, and verified documentation before choosing.'
      }
    ]
  },
  'ace-plus': {
    intro: 'Ace Plus gives one person a more controlled space for calls and focused work in busy open-plan offices.',
    heading: 'Quick answers about Ace Plus',
    items: [
      {
        q: 'What is Ace Plus?',
        a: 'Ace Plus is a one-person phone and focus pod for private calls, video meetings, and focused work inside open-plan offices.'
      },
      {
        q: 'How much does Ace Plus cost in Malaysia?',
        a: ({ startingPriceText }) =>
          `Ace Plus starts from ${startingPriceText}. The calculator estimates the total with selected add-ons plus Klang Valley delivery and installation.`
      },
      {
        q: 'What is Ace Plus best for?',
        a: 'It is best for repeated one-person use, especially calls, video meetings, and focused work where privacy and sound control matter.'
      },
      {
        q: 'Does Ace Plus include delivery and installation?',
        a: 'Delivery and installation are shown as separate Klang Valley line items in the calculator. Other areas may be subject to different delivery and installation charges.'
      }
    ]
  },
  'ace-flex': {
    intro: 'Ace Flex adds more internal room for longer focus sessions and private work without converting fixed office space.',
    heading: 'Quick answers about Ace Flex',
    items: [
      {
        q: 'What is Ace Flex?',
        a: 'Ace Flex is a larger one-person focus and work pod with more internal room than the compact call pod models.'
      },
      {
        q: 'How much does Ace Flex cost in Malaysia?',
        a: ({ startingPriceText }) =>
          `Ace Flex starts from ${startingPriceText}. The calculator estimates the total with selected table options, add-ons, delivery, and installation.`
      },
      {
        q: 'What is Ace Flex best for?',
        a: 'It is best for longer focus sessions, private calls, and users who need more workspace inside the pod.'
      },
      {
        q: 'What configuration options are available for Ace Flex?',
        a: 'Ace Flex supports fixed normal-height table and adjustable table options, with office chair or sofa add-ons depending on the selected setup.'
      }
    ]
  },
  'ace-flex-duo': {
    intro: 'Ace Flex Duo creates a dedicated two-person pod for focused collaboration and private discussions in open offices.',
    heading: 'Quick answers about Ace Flex Duo',
    items: [
      {
        q: 'What is Ace Flex Duo?',
        a: 'Ace Flex Duo is a two-person pod configured for face-to-face collaboration, focused work, and private one-to-one discussions.'
      },
      {
        q: 'How much does Ace Flex Duo cost in Malaysia?',
        a: ({ startingPriceText }) =>
          `Ace Flex Duo starts from ${startingPriceText}. The calculator estimates the total with selected table options, add-ons, delivery, and installation.`
      },
      {
        q: 'How is Ace Flex Duo different from Ace Flex?',
        a: 'Ace Flex Duo uses a dedicated two-seater collaboration layout, while Ace Flex is positioned as a larger one-person focus and work pod.'
      },
      {
        q: 'What is Ace Flex Duo best for?',
        a: 'It is best for two-person collaboration, hybrid calls, interviews, and private discussions in open offices.'
      }
    ]
  },
  'ace-meet': {
    intro: 'Ace Meet creates a dedicated meeting space for small teams without depending only on built meeting rooms.',
    heading: 'Quick answers about Ace Meet',
    items: [
      {
        q: 'What is Ace Meet?',
        a: 'Ace Meet is a 2-4 pax meeting pod for small team discussions, hybrid calls, and quiet collaboration inside open-plan offices.'
      },
      {
        q: 'How much does Ace Meet cost in Malaysia?',
        a: ({ startingPriceText }) =>
          `Ace Meet starts from ${startingPriceText}. The calculator estimates the total with selected furniture configurations, add-ons, delivery, and installation.`
      },
      {
        q: 'What is Ace Meet best for?',
        a: 'It is best for small team meetings, short check-ins, and hybrid calls without relying only on fixed meeting rooms.'
      },
      {
        q: 'What configurations are available for Ace Meet?',
        a: 'Ace Meet supports table, adjustable table, whiteboard, sofa, and discussion-table configurations based on the selected setup.'
      }
    ]
  },
  'ace-hub': {
    intro: 'Ace Hub gives larger teams a more spacious enclosed area for meetings, hybrid calls, and lounge-style collaboration.',
    heading: 'Quick answers about Ace Hub',
    items: [
      {
        q: 'What is Ace Hub?',
        a: 'Ace Hub is a larger meeting and lounge pod for team discussions, longer hybrid sessions, and group collaboration for up to 6 people.'
      },
      {
        q: 'How much does Ace Hub cost in Malaysia?',
        a: ({ startingPriceText }) =>
          `Ace Hub starts from ${startingPriceText}. The calculator estimates the total with selected table, whiteboard, sofa, delivery, and installation options.`
      },
      {
        q: 'How is Ace Hub different from Ace Meet?',
        a: 'Ace Hub provides more internal room for larger group sessions, while Ace Meet is positioned for smaller 2-4 pax meetings.'
      },
      {
        q: 'What is Ace Hub best for?',
        a: 'It is best for team meetings, longer hybrid calls, and teams that need a larger enclosed collaboration space.'
      }
    ]
  }
};

const SwatchGroup = ({ label, options, selectedId, onSelect, hideHeading = false }) => (
  <div>
    {!hideHeading && <h3 className="mb-3 text-[16px] font-semibold text-[#172126]">{label}</h3>}
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
    <p className="mt-2 text-[12px] font-medium text-[#68726f]">{options.find((option) => option.id === selectedId)?.label}</p>
  </div>
);

export default function ProductPage() {
  const { slug } = useParams();
  const product = useMemo(() => getProductBySlug(slug), [slug]);
  const productMaterialMarks = useMemo(() => getProductMaterialMarks(slug), [slug]);

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedExterior, setSelectedExterior] = useState('');
  const [selectedInterior, setSelectedInterior] = useState('');
  const [selectedConfigurationOptionIds, setSelectedConfigurationOptionIds] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedStoolVariant, setSelectedStoolVariant] = useState('');
  const [isAddonMenuOpen, setIsAddonMenuOpen] = useState(false);
  const [isContactChooserOpen, setIsContactChooserOpen] = useState(false);
  const [isDimensionsModalOpen, setIsDimensionsModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryModalIndex, setGalleryModalIndex] = useState(0);
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false);
  const chooserRef = useRef(null);
  const addonMenuRef = useRef(null);
  const featureScrollRef = useRef(null);
  const thumbnailScrollRef = useRef(null);
  const wasBarStoolSelectedRef = useRef(false);
  const [canScrollFeaturesLeft, setCanScrollFeaturesLeft] = useState(false);
  const [canScrollFeaturesRight, setCanScrollFeaturesRight] = useState(false);
  const [canScrollThumbnailsLeft, setCanScrollThumbnailsLeft] = useState(false);
  const [canScrollThumbnailsRight, setCanScrollThumbnailsRight] = useState(false);

  useEffect(() => {
    if (!product) return;
    setSelectedExterior(product.defaultExterior);
    setSelectedInterior(product.defaultInterior);
    setSelectedImage('');
    setSelectedConfigurationOptionIds([]);
    setSelectedAddons([]);
    setSelectedStoolVariant('');
    wasBarStoolSelectedRef.current = false;
    setIsAddonMenuOpen(false);
    setIsContactChooserOpen(false);
    setIsDimensionsModalOpen(false);
    setIsGalleryModalOpen(false);
    setGalleryModalIndex(0);
    setIsSpecsExpanded(false);
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

  useEffect(() => {
    const scroller = featureScrollRef.current;
    if (!scroller) return;

    const updateFeatureScrollState = () => {
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      setCanScrollFeaturesLeft(scroller.scrollLeft > 4);
      setCanScrollFeaturesRight(maxScrollLeft - scroller.scrollLeft > 4);
    };

    updateFeatureScrollState();
    scroller.addEventListener('scroll', updateFeatureScrollState, { passive: true });
    window.addEventListener('resize', updateFeatureScrollState);

    return () => {
      scroller.removeEventListener('scroll', updateFeatureScrollState);
      window.removeEventListener('resize', updateFeatureScrollState);
    };
  }, [product?.slug]);

  useEffect(() => {
    const scroller = thumbnailScrollRef.current;
    if (!scroller) return;

    const updateThumbnailScrollState = () => {
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      setCanScrollThumbnailsLeft(scroller.scrollLeft > 4);
      setCanScrollThumbnailsRight(maxScrollLeft - scroller.scrollLeft > 4);
    };

    updateThumbnailScrollState();
    scroller.addEventListener('scroll', updateThumbnailScrollState, { passive: true });
    window.addEventListener('resize', updateThumbnailScrollState);

    return () => {
      scroller.removeEventListener('scroll', updateThumbnailScrollState);
      window.removeEventListener('resize', updateThumbnailScrollState);
    };
  }, [product?.slug, selectedExterior, selectedInterior, selectedAddons, selectedConfigurationOptionIds]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f7f6f2] px-6 py-16 text-[#172126]">
        <SeoMeta
          title="Pod not found | Ace Office Pods"
          description="The requested office pod page is not available."
          canonical={buildCanonical(`/pods/${slug || ''}`)}
          robots="noindex, follow"
          keywords={SEO_KEYWORDS_COMMON}
          schemas={[]}
        />
        <div className="mx-auto max-w-[900px] rounded-[16px] border border-[#dedede] bg-white p-8 text-center">
          <h1 className="text-[32px] font-bold tracking-tight">Pod not found</h1>
          <p className="mx-auto mt-3 max-w-[46ch] text-[16px] text-[#68726f]">The product page you requested does not exist or is not available yet.</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-[6px] border border-[#1e2227] px-5 py-3 text-[14px] font-semibold text-[#172126] transition-colors hover:bg-[#172126] hover:text-white"
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
  const emailHref = `mailto:sales@aceofficepods.com?subject=${encodeURIComponent(`Ace Office Pods enquiry - ${product.name}`)}`;
  const pdpPricing = product.pdpPricing || {};
  const baseConfigurations = [...(pdpPricing.baseConfigurations || [])].sort((a, b) => a.price - b.price);
  const baseUnit = baseConfigurations[0];
  const hasBaseUnitPrice = typeof baseUnit?.price === 'number';
  const baseUnitPrice = hasBaseUnitPrice ? baseUnit.price : 0;
  const configurationOptions = [...(pdpPricing.configurationOptions || [])].sort((a, b) => a.amount - b.amount);
  const selectedConfigurationAmount = configurationOptions
    .filter((configuration) => selectedConfigurationOptionIds.includes(configuration.id))
    .reduce((sum, configuration) => sum + configuration.amount, 0);
  const availableAddons = pdpPricing.addOnOptions || [];
  const currentChairAddon =
    availableAddons.find((addon) => addon.id === 'office-chair') ||
    availableAddons.find((addon) => addon.id === 'high-bar-stool') ||
    null;
  const selectedAddonsAmount = availableAddons
    .filter((addon) => selectedAddons.includes(addon.id))
    .reduce((sum, addon) => sum + addon.amount, 0);
  const installationAmount = pdpPricing.installationPerUnit || 0;
  const deliveryAmount = pdpPricing.delivery?.default || 0;
  const computedTotal = baseUnitPrice + selectedConfigurationAmount + installationAmount + deliveryAmount + selectedAddonsAmount;

  const isAceFlexDuo = product.slug === 'ace-flex-duo';
  const isAceUno = product.slug === 'ace-uno';
  const pricingRows = useMemo(
    () => [
      {
        label: isAceUno ? 'Pod only' : isAceFlexDuo ? 'Base unit' : 'Base unit\n(empty pod)',
        amount: baseUnitPrice,
        amountLabel: hasBaseUnitPrice ? null : product.pricing?.amount || 'Contact for price'
      },
      { label: 'Add-on', amount: selectedConfigurationAmount },
      { label: 'Installation\n(Klang Valley)', amount: installationAmount },
      { label: 'Delivery (Klang Valley)', amount: deliveryAmount },
      { label: 'Add-ons subtotal', amount: selectedAddonsAmount }
    ],
    [
      baseUnitPrice,
      deliveryAmount,
      hasBaseUnitPrice,
      installationAmount,
      isAceFlexDuo,
      isAceUno,
      product.pricing?.amount,
      selectedAddonsAmount,
      selectedConfigurationAmount
    ]
  );
  const outstationNote =
    pdpPricing.delivery?.outstationNote ||
    'Other areas outside of Klang Valley will be subject to different delivery and installation charges. If items need to be carried via staircase, additional handling charges will apply.';
  const outstationNoteLines = outstationNote.match(/[^.?!]+[.?!]/g)?.map((line) => line.trim()) || [outstationNote];

  const formatRM = (amount) => `RM${amount.toLocaleString('en-MY')}`;
  const startingPriceText = hasBaseUnitPrice ? formatRM(baseUnitPrice) : product.pricing?.amount || 'Contact for price';
  const computedTotalText = hasBaseUnitPrice ? formatRM(computedTotal) : 'Contact for price';
  const mutuallyExclusiveTableOptionIds = new Set(['duo-fixed-table', 'duo-adjustable-table']);
  const mutuallyExclusiveSeatingAddonIds = new Set(['high-bar-stool', 'office-chair', 'flex-sofa']);
  const getPreviewImageForOption = (option) => {
    if (!option) return '';
    if (option.id === 'high-bar-stool') {
      return selectedStoolVariant === 'white' ? barStoolWhite : barStoolBlack;
    }
    return option.previewImage || '';
  };
  const applySelectionPreviewImage = (option) => {
    const previewImage = getPreviewImageForOption(option);
    if (previewImage) {
      setSelectedImage(previewImage);
    }
  };
  const toggleConfigurationOption = (id) => {
    const option = configurationOptions.find((configuration) => configuration.id === id);
    setSelectedConfigurationOptionIds((current) => {
      const isSelected = current.includes(id);
      const isSingleSelectConfigProduct = ['ace-meet', 'ace-hub'].includes(product.slug);
      if (isSelected) {
        const optionPreviewImage = getPreviewImageForOption(option);
        if (optionPreviewImage && selectedImage === optionPreviewImage) {
          setSelectedImage('');
        }
        return isSingleSelectConfigProduct ? [] : current.filter((optionId) => optionId !== id);
      }
      if (isSingleSelectConfigProduct) {
        if (option) {
          applySelectionPreviewImage(option);
        }
        return [id];
      }
      const next = mutuallyExclusiveTableOptionIds.has(id)
        ? current.filter((optionId) => !mutuallyExclusiveTableOptionIds.has(optionId))
        : current;
      if (option) {
        applySelectionPreviewImage(option);
      }
      return [...next, id];
    });
  };
  const toggleAddon = (id) => {
    const option = availableAddons.find((addon) => addon.id === id);
    setSelectedAddons((current) => {
      const isSelected = current.includes(id);
      if (isSelected) {
        const optionPreviewImage = getPreviewImageForOption(option);
        if (optionPreviewImage && selectedImage === optionPreviewImage) {
          setSelectedImage('');
        }
        return current.filter((addonId) => addonId !== id);
      }
      const next = mutuallyExclusiveSeatingAddonIds.has(id)
        ? current.filter((addonId) => !mutuallyExclusiveSeatingAddonIds.has(addonId))
        : current;
      if (option) {
        applySelectionPreviewImage(option);
      }
      return [...next, id];
    });
  };
  const selectedConfigurationLabels = configurationOptions
    .filter((configuration) => selectedConfigurationOptionIds.includes(configuration.id))
    .map((configuration) => configuration.label);
  const selectedAddonLabels = availableAddons
    .filter((addon) => selectedAddons.includes(addon.id))
    .map((addon) => addon.label);
  const selectedOptionLabels = [...selectedConfigurationLabels, ...selectedAddonLabels];
  const colorImageMap = product.colorImageMap || null;
  const colorGalleryMap = product.colorGalleryMap || null;
  const presentationGallery = product.presentationGallery || EMPTY_PRESENTATION_GALLERY;
  const pairKey = `${selectedExterior}|${selectedInterior}`;
  const mappedImage =
    colorImageMap?.byPair?.[pairKey] ||
    colorImageMap?.byExterior?.[selectedExterior] ||
    colorImageMap?.byInterior?.[selectedInterior] ||
    colorImageMap?.default ||
    null;
  const technicalSpecifications = product.technicalSpecifications || {};
  const mergedTechnicalSpecRows = useMemo(
    () => {
      const specifications = product.technicalSpecifications || {};
      return [
        { label: 'Capacity', value: specifications.capacity },
        { label: 'External dimensions', value: specifications.externalDimensions },
        { label: 'Internal dimensions', value: specifications.internalDimensions },
        { label: 'Internal height', value: specifications.internalHeight },
        {
          label: 'External height',
          value:
            specifications.externalHeight && specifications.roomHeightRequirement
              ? `${specifications.externalHeight} (room height required: ${specifications.roomHeightRequirement})`
              : specifications.externalHeight
        },
        { label: 'Published acoustic claim', value: specifications.publishedAcousticClaim },
        { label: 'Weight', value: specifications.weight },
        ...(specifications.extraRows || [])
      ].filter((row) => row?.label && row?.value);
    },
    [product.technicalSpecifications]
  );
  const quickAnswerDimensionParts = [
    technicalSpecifications.capacity ? `Fits ${technicalSpecifications.capacity}` : null,
    technicalSpecifications.externalDimensions ? `External dimensions: ${technicalSpecifications.externalDimensions}` : null,
    technicalSpecifications.roomHeightRequirement ? `Recommended room height: ${technicalSpecifications.roomHeightRequirement}` : null
  ].filter(Boolean);
  const quickAnswerDimensionsText = quickAnswerDimensionParts.length > 0 ? quickAnswerDimensionParts.join('. ') + '.' : null;
  const quickAnswerAcousticText = technicalSpecifications.publishedAcousticClaim
    ? `Published acoustic claim: ${technicalSpecifications.publishedAcousticClaim}.`
    : null;
  const quickAnswerDeliveryParts = [
    installationAmount > 0 ? `Installation (Klang Valley): ${formatRM(installationAmount)}` : null,
    `Delivery (Klang Valley): ${formatRM(deliveryAmount)}`
  ].filter(Boolean);
  const quickAnswerDeliveryText =
    quickAnswerDeliveryParts.length > 0
      ? `${quickAnswerDeliveryParts.join('. ')}. ${outstationNoteLines[0] || ''}`.trim()
      : null;
  const quickAnswerPowerRows = mergedTechnicalSpecRows.filter((row) => /power|socket|usb|plug|ethernet|connectivity/i.test(row.label));
  const quickAnswerPowerText = quickAnswerPowerRows.length > 0
    ? quickAnswerPowerRows
        .slice(0, 2)
        .map((row) => `${row.label}: ${row.value}`)
        .join('. ') + '.'
    : null;
  const quickAnswerAddOnLabels = [...configurationOptions.map((item) => item.label), ...availableAddons.map((item) => item.label)];
  const quickAnswerAddOnsText =
    quickAnswerAddOnLabels.length > 0 ? `Available add-ons include ${quickAnswerAddOnLabels.slice(0, 4).join(', ')}.` : null;
  const quickAnswerHelpText = 'Need help choosing the right pod size and setup? Contact our team for a model recommendation.';
  const exteriorWallsRowIndex = mergedTechnicalSpecRows.findIndex((row) => row.label === 'Exterior walls');
  const canToggleSpecs = exteriorWallsRowIndex >= 0 && exteriorWallsRowIndex < mergedTechnicalSpecRows.length - 1;
  const visibleTechnicalSpecRows =
    canToggleSpecs && !isSpecsExpanded ? mergedTechnicalSpecRows.slice(0, exteriorWallsRowIndex + 1) : mergedTechnicalSpecRows;
  const podPrimaryImage = product.thumbImage || product.heroImage;
  const primaryGalleryImage = mappedImage || podPrimaryImage;
  const productDisplayItems = useMemo(() => {
    const items = [];
    const seenImages = new Set();

    const addProductImage = (image, meta = {}) => {
      if (!image || seenImages.has(image)) return;
      seenImages.add(image);
      items.push({
        type: 'product',
        image,
        ...meta
      });
    };

    if (presentationGallery.length > 0) {
      presentationGallery.forEach((entry, index) => {
        const galleryItem = typeof entry === 'string' ? { image: entry } : entry;
        addProductImage(galleryItem.image, {
          label: galleryItem.label || `${product.name} product view ${index + 1}`,
          exteriorId: galleryItem.exteriorId,
          interiorId: galleryItem.interiorId
        });
      });
    }

    const selectedColourGallery = presentationGallery.length === 0 ? colorGalleryMap?.byExterior?.[selectedExterior] || [] : [];

    if (selectedColourGallery.length > 0) {
      [...selectedColourGallery, ...(colorGalleryMap?.shared || [])].forEach((entry, index) => {
        const galleryItem = typeof entry === 'string' ? { image: entry } : entry;
        addProductImage(galleryItem.image, {
          label: galleryItem.label || `${product.name} product view ${index + 1}`,
          exteriorId: index < selectedColourGallery.length ? selectedExterior : undefined,
          interiorId: index < selectedColourGallery.length ? selectedInterior : undefined
        });
      });
    } else if (presentationGallery.length === 0) {
      if (primaryGalleryImage) {
        addProductImage(primaryGalleryImage, {
          label: `${selectedExterior} + ${selectedInterior}`,
          exteriorId: selectedExterior,
          interiorId: selectedInterior
        });
      }

      Object.entries(colorImageMap?.byPair || {}).forEach(([pair, image]) => {
        const [exteriorId, interiorId] = pair.split('|');
        if (!exteriorId || !interiorId) return;
        addProductImage(image, {
          label: `${exteriorId} + ${interiorId}`,
          exteriorId,
          interiorId
        });
      });

      (product.extraPreviewImages || []).forEach((image) => {
        addProductImage(image, {
          label: `${product.name} front view`
        });
      });
    }

    if (items.length === 0 && podPrimaryImage) {
      addProductImage(podPrimaryImage, {
        label: `${selectedExterior} + ${selectedInterior}`,
        exteriorId: selectedExterior,
        interiorId: selectedInterior
      });
    }

    return items;
  }, [
    colorImageMap,
    colorGalleryMap,
    presentationGallery,
    podPrimaryImage,
    primaryGalleryImage,
    product.extraPreviewImages,
    product.name,
    selectedExterior,
    selectedInterior
  ]);
  const customerGalleryItems = useMemo(() => {
    const items = [];
    const seenImages = new Set();
    (product.customerPhotos || []).forEach((image, index) => {
      if (!image || seenImages.has(image)) return;
      seenImages.add(image);
      items.push({
        type: 'photo',
        image,
        label: `Installation photo ${index + 1}`
      });
    });

    return items;
  }, [product.customerPhotos]);
  const defaultFrontPreviewImage = (product.extraPreviewImages || [])[0] || '';
  const mainImage = selectedImage || defaultFrontPreviewImage || productDisplayItems[0]?.image || primaryGalleryImage || podPrimaryImage;
  const activeGalleryIndex = Math.max(productDisplayItems.findIndex((item) => item.image === mainImage), 0);
  const exteriorLabel = product.exteriorLabel || 'Exterior Color';
  const interiorMaterialSections = product.interiorMaterialSections || null;
  const mdfInteriorOptions = (interiorMaterialSections?.mdf?.optionIds || [])
    .map((optionId) => product.interiorColors.find((color) => color.id === optionId))
    .filter(Boolean);
  const petInteriorOptions = (interiorMaterialSections?.pet?.optionIds || [])
    .map((optionId) => product.interiorColors.find((color) => color.id === optionId))
    .filter(Boolean);
  const hasSplitInteriorSections = mdfInteriorOptions.length > 0 && petInteriorOptions.length > 0;
  const featureRows = product.featureRows || [];
  const isPlusAndAboveFeatures = true;
  const displayFeatureRows = featureRows;
  const hasFeatureRows = displayFeatureRows.some((row) => row.length > 0);
  const allFeatureItems = displayFeatureRows.flat();
  const pdpQuickAnswerCopy = PDP_QUICK_ANSWER_COPY[product.slug] || null;
  const faqSchema = pdpQuickAnswerCopy?.items?.length
    ? createFaqSchema(
        canonicalPath,
        pdpQuickAnswerCopy.items.map((item) => ({
          question: item.q,
          answer: typeof item.a === 'function' ? item.a({ startingPriceText }) : item.a
        }))
      )
    : null;
  const productMeta = getProductMeta(product);
  const seoTitle = productMeta.title;
  const seoDescription = productMeta.description;
  const productSeoImage = getProductPublicImage(product.slug);
  const seoKeywords = `${SEO_KEYWORDS_COMMON}, ${product.displayTitle || product.name}, ${product.slug.replace(/-/g, ' ')}`;
  const seoSchemas = [
    organizationSchema,
    websiteSchema,
    createProductSchema({
      path: canonicalPath,
      name: product.displayTitle || product.name,
      description: product.shortDesc,
      image: productSeoImage,
      price: baseUnit?.price,
      category: 'Office pods',
      additionalProperties: POD_SEO_BY_SLUG[product.slug]?.schemaProperties
    }),
    createBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Ace Pods', path: '/office-pods' },
      { name: product.displayTitle || product.name, path: canonicalPath }
    ]),
    ...(faqSchema ? [faqSchema] : []),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${buildCanonical(canonicalPath)}#${product.slug}-answer`,
      url: buildCanonical(canonicalPath),
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: [`#${product.slug}-answer`]
      }
    }
  ];
  const shouldShowThumbnails = customerGalleryItems.length > 0;
  const isBarStoolSelected = currentChairAddon ? selectedAddons.includes(currentChairAddon.id) : false;
  const addonPreviewImages = [
    ...availableAddons.map((addon) => getPreviewImageForOption(addon)).filter(Boolean),
    ...(currentChairAddon ? [barStoolBlack, barStoolWhite] : [])
  ];
  const isAddonPreviewImage = addonPreviewImages.includes(mainImage);
  const shouldUseMultiplyBlend =
    isAddonPreviewImage ||
    (!product.disableProductImageBlend &&
      (product.slug === 'ace-uno' || (product.slug !== 'ace-plus' && mainImage !== product.catalogImage)));
  const hasMultipleExteriorColors = (product.exteriorColors || []).length > 1;
  const exteriorThumbnailItems = (product.exteriorColors || []).map((color) => {
    const exteriorPairKey = `${color.id}|${selectedInterior}`;
    const thumbnailImage =
      colorImageMap?.byPair?.[exteriorPairKey] || colorImageMap?.byExterior?.[color.id] || colorImageMap?.default || podPrimaryImage;
    return {
      ...color,
      thumbnailImage
    };
  });
  const usesPresentationGallery = presentationGallery.length > 0;
  const previewThumbnailItems = usesPresentationGallery
    ? productDisplayItems.map((item, index) => ({
        id: `gallery-${index}`,
        image: item.image,
        label: item.label,
        exteriorId: item.exteriorId,
        interiorId: item.interiorId
      }))
    : product.showGalleryPreviewsInThumbnailStrip
      ? productDisplayItems.slice(1).map((item, index) => ({
          id: `preview-${index}`,
          image: item.image,
          label: item.label
        }))
      : (product.extraPreviewImages || []).map((image, index) => ({
          id: `preview-${index}`,
          image,
          label: `${product.name} front view`
        }));
  const visibleExteriorThumbnailItems = usesPresentationGallery ? [] : exteriorThumbnailItems;
  const optionThumbnailItems = [
    ...configurationOptions
      .map((option) => {
        const image = getPreviewImageForOption(option);
        if (!image) return null;
        return {
          kind: 'config',
          id: option.id,
          label: option.label,
          image
        };
      })
      .filter(Boolean),
    ...availableAddons
      .map((option) => {
        if (option.id === 'high-bar-stool') {
          return null;
        }
        if (option.id === 'office-chair' && ['ace-plus', 'ace-flex'].includes(product.slug)) {
          return null;
        }
        const image = getPreviewImageForOption(option);
        if (!image) return null;
        return {
          kind: 'addon',
          id: option.id,
          label: option.label,
          image
        };
      })
      .filter(Boolean)
  ];
  const chairThumbnailItems = currentChairAddon && !['ace-meet', 'ace-hub'].includes(product.slug)
    ? [
        { id: 'chair-black', label: 'Chair (black)', image: barStoolBlack },
        { id: 'chair-white', label: 'Chair (white)', image: barStoolWhite }
      ]
    : [];
  const hubLShapeSofaPreviewImage = getPreviewImageForOption(availableAddons.find((addon) => addon.id === 'meeting-xl-l-shape-sofa'));
  const isHubLShapeSofaMainPreview = product.slug === 'ace-hub' && mainImage === hubLShapeSofaPreviewImage;
  const aceFlexSofaPreviewImage = getPreviewImageForOption(availableAddons.find((addon) => addon.id === 'flex-sofa'));
  const isAceFlexSofaMainPreview = product.slug === 'ace-flex' && mainImage === aceFlexSofaPreviewImage;
  const aceMeetOptionPreviewImages =
    product.slug === 'ace-meet' ? [...configurationOptions, ...availableAddons].map((option) => getPreviewImageForOption(option)).filter(Boolean) : [];
  const isAceMeetOptionPreviewImage = product.slug === 'ace-meet' && aceMeetOptionPreviewImages.includes(mainImage);
  const aceHubConfigurationPreviewImages =
    product.slug === 'ace-hub' ? configurationOptions.map((option) => getPreviewImageForOption(option)).filter(Boolean) : [];
  const isAceHubConfigurationPreviewImage = product.slug === 'ace-hub' && aceHubConfigurationPreviewImages.includes(mainImage);
  const activeProductImage = productDisplayItems.find((item) => item.image === mainImage);
  const mainProductAlt = activeProductImage?.label
    ? `${product.name}: ${activeProductImage.label}`
    : `${product.name} acoustic office pod`;
  const getFeatureAlt = (featureItem) =>
    featureItem?.title ? `${product.name} feature detail: ${featureItem.title}` : `${product.name} feature detail`;
  const sharedFeatureCardClass = 'flex w-[244px] shrink-0 flex-col text-center md:w-[320px]';
  const sharedFeatureMediaFrameClass =
    'mx-auto flex h-[152px] w-full max-w-[280px] items-center justify-center overflow-hidden rounded-[24px] sm:h-[164px] sm:max-w-[300px] md:h-[176px] md:max-w-[320px] md:rounded-[28px] lg:h-[188px] lg:max-w-[340px]';
  const soloFeatureMediaFrameClass =
    'mx-auto flex h-[240px] w-[240px] items-center justify-center overflow-hidden rounded-full md:h-[264px] md:w-full md:max-w-[320px] lg:h-[282px] lg:max-w-[340px]';
  const sharedFeatureImageClass = 'h-full w-full object-cover object-center';
  const soloFeatureImageClass = 'h-full w-full object-cover object-center';
  const featureTrackGapClass = isPlusAndAboveFeatures
    ? 'flex w-max items-start gap-5 px-5 md:px-0 md:min-w-full md:gap-8 lg:gap-10'
    : 'flex w-max items-start gap-0 md:min-w-full';
  const sharedFeatureTitleClass =
    'mx-auto mt-1 max-w-[18ch] text-[16px] font-semibold leading-[1.25] tracking-tight text-[#172126] md:mt-1.5 md:text-[18px]';
  const sharedFeatureDescClass = 'mx-auto mt-1.5 max-w-[28ch] text-left text-[14px] leading-[1.45] text-[#59635f] md:mt-2 md:text-[15px]';
  const getGalleryThumbAlt = (galleryItem) =>
    galleryItem?.type === 'photo' ? `${product.name} office pod installation photo` : `${product.name} office pod product image`;
  const scrollFeatureTrack = (direction) => {
    const scroller = featureScrollRef.current;
    if (!scroller) return;
    const step = Math.max(280, Math.round(scroller.clientWidth * 0.72));
    scroller.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const scrollThumbnailTrack = (direction) => {
    const scroller = thumbnailScrollRef.current;
    if (!scroller) return;
    const step = Math.max(180, Math.round(scroller.clientWidth * 0.55));
    scroller.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const handleExteriorSelect = (id) => {
    const exteriorPairKey = `${id}|${selectedInterior}`;
    const nextImage =
      colorImageMap?.byPair?.[exteriorPairKey] || colorImageMap?.byExterior?.[id] || colorImageMap?.default || podPrimaryImage || '';
    setSelectedExterior(id);
    setSelectedImage(nextImage);
    if (product.syncExteriorInteriorSelection) {
      setSelectedInterior(id);
    }
  };

  const handleInteriorSelect = (id) => {
    setSelectedInterior(id);
    setSelectedImage('');
    if (product.syncExteriorInteriorSelection) {
      setSelectedExterior(id);
    }
  };

  const selectProductDisplayItem = (item) => {
    if (!item) return;
    if (item.exteriorId) setSelectedExterior(item.exteriorId);
    if (item.interiorId) setSelectedInterior(item.interiorId);
    setSelectedImage(item.image);
  };

  const goToPrevImage = () => {
    if (productDisplayItems.length < 2) return;
    const nextIndex = (activeGalleryIndex - 1 + productDisplayItems.length) % productDisplayItems.length;
    selectProductDisplayItem(productDisplayItems[nextIndex]);
  };

  const goToNextImage = () => {
    if (productDisplayItems.length < 2) return;
    const nextIndex = (activeGalleryIndex + 1) % productDisplayItems.length;
    selectProductDisplayItem(productDisplayItems[nextIndex]);
  };

  useEffect(() => {
    if (productDisplayItems.length < 2) return;

    const handleGalleryKeydown = (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (isDimensionsModalOpen || isAddonMenuOpen || isContactChooserOpen || isGalleryModalOpen) return;

      const target = event.target;
      if (target instanceof HTMLElement) {
        const tagName = target.tagName.toLowerCase();
        const isTypingField = ['input', 'textarea', 'select'].includes(tagName) || target.isContentEditable;
        if (isTypingField) return;
      }

      event.preventDefault();
      if (event.key === 'ArrowLeft') {
        goToPrevImage();
        return;
      }
      goToNextImage();
    };

    document.addEventListener('keydown', handleGalleryKeydown);
    return () => {
      document.removeEventListener('keydown', handleGalleryKeydown);
    };
  }, [productDisplayItems, isDimensionsModalOpen, isAddonMenuOpen, isContactChooserOpen, isGalleryModalOpen, activeGalleryIndex]);

  useEffect(() => {
    const validPreviewImages = new Set(productDisplayItems.map((item) => item.image));
    configurationOptions.forEach((option) => {
      if (option?.previewImage) validPreviewImages.add(option.previewImage);
    });
    availableAddons.forEach((addon) => {
      const previewImage = getPreviewImageForOption(addon);
      if (previewImage) validPreviewImages.add(previewImage);
    });
    if (currentChairAddon) {
      validPreviewImages.add(barStoolBlack);
      validPreviewImages.add(barStoolWhite);
    }
    if (selectedImage && !validPreviewImages.has(selectedImage)) {
      setSelectedImage('');
    }
  }, [product.slug, productDisplayItems, selectedImage, configurationOptions, availableAddons, selectedStoolVariant, currentChairAddon]);

  useEffect(() => {
    const isStoolImage = selectedImage === barStoolBlack || selectedImage === barStoolWhite;
    if (!isBarStoolSelected && isStoolImage) {
      setSelectedImage('');
    }
  }, [isBarStoolSelected, selectedImage]);

  useEffect(() => {
    const wasSelected = wasBarStoolSelectedRef.current;
    const isFirstSelect = !wasSelected && isBarStoolSelected;
    if (isFirstSelect && currentChairAddon?.id === 'high-bar-stool') {
      setSelectedImage(selectedStoolVariant === 'white' ? barStoolWhite : barStoolBlack);
    }
    wasBarStoolSelectedRef.current = isBarStoolSelected;
  }, [isBarStoolSelected, selectedStoolVariant, currentChairAddon]);

  const openGalleryModalAtIndex = (index) => {
    if (index < 0 || index >= customerGalleryItems.length) return;
    setGalleryModalIndex(index);
    setIsGalleryModalOpen(true);
  };

  const goToPrevModalImage = () => {
    if (customerGalleryItems.length < 2) return;
    setGalleryModalIndex((current) => (current - 1 + customerGalleryItems.length) % customerGalleryItems.length);
  };

  const goToNextModalImage = () => {
    if (customerGalleryItems.length < 2) return;
    setGalleryModalIndex((current) => (current + 1) % customerGalleryItems.length);
  };

  useEffect(() => {
    if (!isGalleryModalOpen) return;

    const handleModalKeydown = (event) => {
      if (event.key === 'Escape') {
        setIsGalleryModalOpen(false);
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevModalImage();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNextModalImage();
      }
    };

    document.addEventListener('keydown', handleModalKeydown);
    return () => {
      document.removeEventListener('keydown', handleModalKeydown);
    };
  }, [isGalleryModalOpen, customerGalleryItems.length]);

  useEffect(() => {
    if (galleryModalIndex >= customerGalleryItems.length) {
      setGalleryModalIndex(0);
    }
  }, [galleryModalIndex, customerGalleryItems.length, product.slug]);

  const handleThumbnailSelect = (_item, index) => {
    openGalleryModalAtIndex(index);
  };

  return (
    <div>
    <main className="min-h-screen bg-[#eeece7] text-[#172126]">
      <SeoMeta
        title={seoTitle}
        description={seoDescription}
        canonical={buildCanonical(canonicalPath)}
        ogImage={buildAbsoluteUrl(productSeoImage)}
        keywords={seoKeywords}
        schemas={seoSchemas}
      />
      <SubpageHeader />

      <section className="px-5 pb-8 pt-2 md:px-8 md:pb-12 md:pt-4">
        <div className="mx-auto w-full max-w-[1280px] space-y-16 lg:space-y-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,56fr)_minmax(0,44fr)] lg:items-stretch lg:gap-10">
            <div className="min-w-0">
              <div className="lg:hidden">
                <p className="mb-3 text-[13px] font-medium text-[#007653]">
                  Home / {product.breadcrumbLabel || 'Ace Pods'} / {product.displayTitle || product.name}
                </p>
                <div
                  role="heading"
                  aria-level="1"
                  className="max-w-[12ch] text-[42px] font-semibold leading-[1.03] tracking-tight md:text-[56px]"
                >
                  {product.displayTitle || product.name}
                </div>
                <p className="mt-3 text-[16px] font-semibold leading-tight text-[#007653] md:text-[20px]">
                  Starting from {startingPriceText}
                </p>
                {isAceUno && <p className="mt-1 text-[13px] text-[#68726f]">Pod only; delivery and installation are separate.</p>}
                <p className="mt-4 max-w-[42ch] text-[17px] leading-[1.5] text-[#172126]">{product.shortDesc}</p>
              </div>
              <div className="relative mt-6 h-[380px] w-full sm:h-[460px] md:h-[620px] lg:mt-[56px] lg:h-[600px]">
                {productDisplayItems.length > 1 && (
                  <button
                    type="button"
                    onClick={goToPrevImage}
                    aria-label={`Previous image for ${product.name}`}
                    className="absolute left-0 top-1/2 z-[2] -translate-y-1/2 rounded-full border border-[#d4d8dd] bg-white/85 p-1.5 text-[#172126] shadow-sm backdrop-blur-sm transition-colors hover:bg-white md:left-1"
                  >
                    <ChevronLeft size={26} strokeWidth={2.25} />
                  </button>
                )}

	                <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                    <img
                      src={mainImage}
                      alt={mainProductAlt}
                      width="1000"
                      height="1000"
                      fetchPriority="high"
                      className={`relative z-[1] object-contain object-center ${
                        isHubLShapeSofaMainPreview
                          ? 'h-[70%] w-[70%]'
                          : isAceFlexSofaMainPreview
                            ? 'h-full w-full'
                          : isAceMeetOptionPreviewImage
                            ? 'h-full w-full'
                            : isAceHubConfigurationPreviewImage
                              ? 'h-full w-full'
                            : isAddonPreviewImage
                              ? 'h-1/2 w-1/2'
                              : 'h-full w-full'
                      } ${
                        shouldUseMultiplyBlend ? 'mix-blend-multiply' : ''
                      }`}
                    />
	                </div>

                {productDisplayItems.length > 1 && (
                  <button
                    type="button"
                    onClick={goToNextImage}
                    aria-label={`Next image for ${product.name}`}
                    className="absolute right-0 top-1/2 z-[2] -translate-y-1/2 rounded-full border border-[#d4d8dd] bg-white/85 p-1.5 text-[#172126] shadow-sm backdrop-blur-sm transition-colors hover:bg-white md:right-1"
                  >
                    <ChevronRight size={26} strokeWidth={2.25} />
                  </button>
                )}
              </div>
              {hasMultipleExteriorColors && (
                <div className="mt-1 block">
                  <div className="px-0 py-1">
                    <p className="mb-2 text-center text-[12px] font-semibold tracking-[0.03em] text-[#3b3f45]">
                      {product.thumbnailStripLabel || 'Available pod colours'}
                    </p>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => scrollThumbnailTrack(-1)}
                        aria-label="Scroll thumbnails left"
                        disabled={!canScrollThumbnailsLeft}
                        className={`absolute left-0 top-1/2 z-[2] hidden -translate-y-1/2 rounded-full border border-[#d4d8dd] bg-white/90 p-1.5 text-[#172126] shadow-sm backdrop-blur-sm transition-colors md:block ${
                          canScrollThumbnailsLeft ? 'hover:bg-white' : 'cursor-not-allowed opacity-35'
                        }`}
                      >
                        <ChevronLeft size={18} strokeWidth={2.25} />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollThumbnailTrack(1)}
                        aria-label="Scroll thumbnails right"
                        disabled={!canScrollThumbnailsRight}
                        className={`absolute right-0 top-1/2 z-[2] hidden -translate-y-1/2 rounded-full border border-[#d4d8dd] bg-white/90 p-1.5 text-[#172126] shadow-sm backdrop-blur-sm transition-colors md:block ${
                          canScrollThumbnailsRight ? 'hover:bg-white' : 'cursor-not-allowed opacity-35'
                        }`}
                      >
                        <ChevronRight size={18} strokeWidth={2.25} />
                      </button>
                      <div
                        ref={thumbnailScrollRef}
                        className="flex max-w-full flex-nowrap justify-start gap-2 overflow-x-auto overflow-y-hidden px-0 pb-1 md:justify-center md:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                      >
                      {previewThumbnailItems.map((preview) => {
                        const selected = mainImage === preview.image;
                        return (
                          <button
                            key={preview.id}
                            type="button"
                            onClick={() => selectProductDisplayItem(preview)}
                            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-[8px] border bg-[#f7f6f2] transition-all ${
                              selected ? 'border-[#1e2227] ring-1 ring-[#1e2227]' : 'border-[#d3d7dc]'
                            }`}
                            aria-label={preview.label || `Product preview image ${preview.id.replace('preview-', '')}`}
                          >
                            <img
                              src={preview.image}
                              alt={preview.label ? `${product.name}: ${preview.label}` : `${product.name} product view`}
                              width="56"
                              height="56"
                              className="h-full w-full object-contain object-center"
                            />
                            {selected && (
                              <span className="absolute inset-0 border border-[#1e2227]">
                                <Check size={12} className="absolute right-0.5 top-0.5 text-[#172126]" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                      {visibleExteriorThumbnailItems.map((color) => {
                        const selected = color.id === selectedExterior;
                        return (
                          <button
                            key={`left-color-${color.id}`}
                            type="button"
                            onClick={() => handleExteriorSelect(color.id)}
                            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-[8px] border bg-[#f7f6f2] transition-all ${
                              selected ? 'border-[#1e2227] ring-1 ring-[#1e2227]' : 'border-[#d3d7dc]'
                            }`}
                            aria-label={`Available pod colours: ${color.label}`}
                          >
                            <img
                              src={color.thumbnailImage}
                              alt={`${product.name} in ${color.label}`}
                              width="56"
                              height="56"
                              className="h-full w-full object-contain object-center"
                            />
                            {selected && (
                              <span className="absolute inset-0 border border-[#1e2227]">
                                <Check size={12} className="absolute right-0.5 top-0.5 text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.75)]" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                      {optionThumbnailItems.map((item) => {
                        const selected = mainImage === item.image;
                        return (
                          <button
                            key={`${item.kind}-${item.id}`}
                            type="button"
                            onClick={() => {
                              if (item.kind === 'config') {
                                if (!selectedConfigurationOptionIds.includes(item.id)) {
                                  toggleConfigurationOption(item.id);
                                  return;
                                }
                                setSelectedImage(item.image);
                                return;
                              }
                              if (!selectedAddons.includes(item.id)) {
                                toggleAddon(item.id);
                                return;
                              }
                              setSelectedImage(item.image);
                            }}
                            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-[8px] border bg-[#f7f6f2] transition-all ${
                              selected ? 'border-[#1e2227] ring-1 ring-[#1e2227]' : 'border-[#d3d7dc]'
                            }`}
                            aria-label={`Available pod colours option: ${item.label}`}
                          >
                            <img
                              src={item.image}
                              alt={item.label}
                              width="56"
                              height="56"
                              className={`object-contain object-center ${
                                ['flex-sofa', 'meeting-xl-sofa-set'].includes(item.id)
                                  ? 'mx-auto my-auto h-[70%] w-[70%]'
                                  : item.id === 'meeting-xl-l-shape-sofa'
                                    ? 'mx-auto my-auto h-[98%] w-[98%]'
                                    : 'h-full w-full'
                              }`}
                            />
                            {selected && (
                              <span className="absolute inset-0 border border-[#1e2227]">
                                <Check size={12} className="absolute right-0.5 top-0.5 text-[#172126]" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                      {chairThumbnailItems.map((chair) => {
                        const variant = chair.id === 'chair-white' ? 'white' : 'black';
                        const selected = mainImage === chair.image;
                        return (
                          <button
                            key={chair.id}
                            type="button"
                            onClick={() => {
                              if (!currentChairAddon) return;
                              setSelectedStoolVariant(variant);
                              setSelectedImage(chair.image);
                              setSelectedAddons((current) => {
                                const withoutMutuallyExclusiveSeating = current.filter(
                                  (addonId) => addonId !== 'flex-sofa' && addonId !== 'high-bar-stool' && addonId !== 'office-chair'
                                );
                                return withoutMutuallyExclusiveSeating.includes(currentChairAddon.id)
                                  ? withoutMutuallyExclusiveSeating
                                  : [...withoutMutuallyExclusiveSeating, currentChairAddon.id];
                              });
                            }}
                            className={`relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[8px] border transition-all ${
                              selected ? 'border-[#1e2227] ring-1 ring-[#1e2227]' : 'border-[#d3d7dc]'
                            }`}
                            aria-label={`Available pod colours accessory: ${chair.label}`}
                          >
                            <img src={chair.image} alt={chair.label} width="36" height="36" className="h-9 w-9 object-contain object-center mix-blend-multiply" />
                            {selected && (
                              <span className="absolute inset-0 border border-[#1e2227]">
                                <Check size={12} className="absolute right-0.5 top-0.5 text-[#172126]" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {productMaterialMarks && (
                <aside
                  className="mt-5 border-y border-[#d7d9d7] py-3"
                  aria-label="Ace product material and certification marks"
                >
                  <img
                    src={productMaterialMarks.image}
                    alt={productMaterialMarks.alt}
                    width="2200"
                    height="675"
                    className="mx-auto h-auto w-full max-w-[560px] object-contain"
                  />
                </aside>
              )}
            </div>

            <div className="min-w-0 lg:flex lg:h-[760px] lg:flex-col">
              <div className="hidden lg:block text-left">
                <p className="mb-3 text-[13px] font-medium text-[#007653]">
                  Home / {product.breadcrumbLabel || 'Ace Pods'} / {product.displayTitle || product.name}
                </p>
                <h1 className="text-[56px] font-semibold leading-[1.03] tracking-tight">{product.displayTitle || product.name}</h1>
                <p id={`${product.slug}-answer`} className="mt-2 text-[22px] leading-tight text-[#172126]">{product.shortDesc}</p>
                <p className="mt-2 text-[24px] font-semibold leading-tight text-[#007653]">Starting from {startingPriceText}</p>
                {isAceUno && <p className="mt-1 text-[13px] text-[#68726f]">Pod only; delivery and installation are itemised below.</p>}
              </div>

              <div className="mt-6 py-6 md:py-7 lg:flex-1">
                <div className="grid gap-6 md:grid-cols-2 md:items-stretch md:gap-8">
                  <div className="h-full rounded-[6px] border border-[#d0d3d7] bg-white p-5 md:p-6">
                    <SwatchGroup
                      label={exteriorLabel}
                      options={product.exteriorColors}
                      selectedId={selectedExterior}
                      onSelect={handleExteriorSelect}
                    />
                    <div className="mt-6 border-t border-[#d8d8d8] pt-6">
                      {hasSplitInteriorSections ? (
                        <div className="space-y-6">
                          <div>
                            <h3 className="mb-3 text-[14px] font-semibold leading-[1.4] text-[#172126]">
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
                            <h3 className="mb-3 text-[14px] font-semibold leading-[1.4] text-[#172126]">PET Fabric Interior Wall Colour</h3>
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
                    <div className="rounded-[6px] border border-[#d0d3d7] bg-white p-5 md:p-6">
                      <div className="relative mb-4 border-b border-[#e8eaed] pb-4" ref={addonMenuRef}>
                        <h3 className="mb-2 text-[15px] font-semibold text-[#172126]">Add-ons</h3>
                        <button
                          type="button"
                          onClick={() => setIsAddonMenuOpen((prev) => !prev)}
                          aria-expanded={isAddonMenuOpen}
                          aria-controls="addons-menu"
                          className="flex w-full items-center justify-between rounded-[6px] border border-[#d8d8d8] bg-[#f7f6f2] px-3 py-2.5 text-left text-[13px] font-medium text-[#172126] transition-colors hover:bg-white"
                        >
                          <span>
                            {selectedOptionLabels.length > 0
                              ? `${selectedOptionLabels.length} option${selectedOptionLabels.length > 1 ? 's' : ''} selected`
                              : 'Select add-ons'}
                          </span>
                          <span className="text-[12px] text-[#67707a]">{isAddonMenuOpen ? '▲' : '▼'}</span>
                        </button>
                        {selectedOptionLabels.length > 0 && (
                          <p className="mt-2 line-clamp-2 text-[12px] leading-[1.4] text-[#68726f]">{selectedOptionLabels.join(', ')}</p>
                        )}

                        {isAddonMenuOpen && (
                          <div
                            id="addons-menu"
                            className="absolute left-0 top-full z-20 mt-2 w-full rounded-[8px] border border-[#d8d8d8] bg-white p-2.5 shadow-lg"
                          >
                            <div className="grid gap-2.5">
                              <div>
                                {product.slug === 'ace-flex-duo' ? (
                                  <div>
                                    <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#68726f]">Configuration included</p>
                                    <p className="px-2 py-1.5 text-[13px] font-medium text-[#172126]">Bar-height table included as standard</p>
                                  </div>
                                ) : (
                                  <div>
                                    <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#68726f]">Configuration options</p>
                                    <div className="grid gap-1.5">
                                      {configurationOptions.length > 0 ? (
                                        configurationOptions.map((configuration) => {
                                          const checked = selectedConfigurationOptionIds.includes(configuration.id);
                                          return (
                                            <label
                                              key={configuration.id}
                                              className="flex cursor-pointer items-center justify-between rounded-[4px] border border-transparent px-2 py-1.5 transition-colors hover:border-[#d5dade] hover:bg-[#f7f6f2]"
                                            >
                                              <span className="flex items-center gap-2 text-[13px] font-medium text-[#172126]">
                                                <input
                                                  type="checkbox"
                                                  checked={checked}
                                                  onChange={() => toggleConfigurationOption(configuration.id)}
                                                  className="h-4 w-4 accent-[#007653]"
                                                />
                                                {configuration.label}
                                              </span>
                                              <span className="text-[12px] font-semibold tabular-nums text-[#59635f]">{formatRM(configuration.amount)}</span>
                                            </label>
                                          );
                                        })
                                      ) : (
                                        <p className="px-2 py-1.5 text-[12px] text-[#68726f]">No configuration upgrades for this pod.</p>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="border-t border-[#e4e7eb] pt-2.5">
                                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#68726f]">Other add-ons</p>
                                <div className="grid gap-1.5">
                                  {availableAddons.length > 0 ? (
                                    availableAddons.map((addon) => {
                                      const checked = selectedAddons.includes(addon.id);
                                      return (
                                        <label
                                          key={addon.id}
                                          className="flex cursor-pointer items-center justify-between rounded-[4px] border border-transparent px-2 py-1.5 transition-colors hover:border-[#d5dade] hover:bg-[#f7f6f2]"
                                        >
                                          <span className="flex items-center gap-2 text-[13px] font-medium text-[#172126]">
                                            <input
                                              type="checkbox"
                                              checked={checked}
                                              onChange={() => toggleAddon(addon.id)}
                                              className="h-4 w-4 accent-[#007653]"
                                            />
                                            {addon.label}
                                          </span>
                                          <span className="text-[12px] font-semibold tabular-nums text-[#59635f]">{formatRM(addon.amount)}</span>
                                        </label>
                                      );
                                    })
                                  ) : (
                                    <p className="px-2 py-1.5 text-[12px] text-[#68726f]">No additional add-ons for this pod.</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-[16px] font-semibold leading-tight text-[#172126]">Pricing overview</p>
                      <dl className="mt-3 text-[14px]">
                        <div className="space-y-0">
                          {pricingRows.map((row) => (
                            <div key={row.label} className="grid grid-cols-[1fr_auto] items-center border-b border-[#e8eaed] py-2.5">
                              <dt className="whitespace-pre-line font-medium leading-[1.35] text-[#414850]">{row.label}</dt>
                              <dd className="text-right font-semibold tabular-nums text-[#172126]">{row.amountLabel || formatRM(row.amount)}</dd>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 border-t border-[#d3d9df] pt-3">
                          <div className="grid grid-cols-[1fr_auto] items-center">
                            <dt className="text-[16px] font-semibold text-[#172126]">Total</dt>
                            <dd className="text-right text-[18px] font-bold tabular-nums text-[#172126]">{computedTotalText}</dd>
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
                          onClick={() => {
                            pushDataLayerEvent('quote_cta_click', {
                              cta_location: 'product_page_pricing_panel',
                              cta_text: 'Contact Us',
                              destination_url: '#contact-chooser',
                              product_name: product.name,
                              product_slug: product.slug
                            });
                            setIsContactChooserOpen((prev) => !prev);
                          }}
                          aria-expanded={isContactChooserOpen}
                          aria-controls="contact-chooser"
                          className="w-full rounded-[4px] border border-[#00855a] bg-white px-4 py-3 text-[15px] font-semibold text-[#007653] transition-colors hover:bg-[#f7f6f2]"
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
                              onClick={() =>
                                pushDataLayerEvent('whatsapp_click', {
                                  cta_location: 'product_page_contact_chooser',
                                  cta_text: 'WhatsApp Us',
                                  destination_url: whatsappHref,
                                  contact_method: 'whatsapp',
                                  product_name: product.name,
                                  product_slug: product.slug
                                })
                              }
                              className="block rounded-[6px] bg-[#00855a] px-3 py-2.5 text-center text-[14px] font-semibold text-white hover:bg-[#172126]"
                            >
                              WhatsApp Us
                            </a>
                            <a
                              href={emailHref}
                              onClick={() =>
                                pushDataLayerEvent('email_click', {
                                  cta_location: 'product_page_contact_chooser',
                                  cta_text: 'Email Us',
                                  destination_url: emailHref,
                                  contact_method: 'email',
                                  product_name: product.name,
                                  product_slug: product.slug
                                })
                              }
                              className="mt-2 block rounded-[6px] border border-[#cdd1d5] px-3 py-2.5 text-center hover:bg-[#f7f6f2]"
                            >
                              <span className="block text-[14px] font-semibold text-[#172126]">Email Us</span>
                              <span className="mt-0.5 block text-[12px] font-medium text-[#68726f]">sales@aceofficepods.com</span>
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

          {hasFeatureRows && (
            <section className="py-12 md:py-14">
              <h2 className="text-center text-[28px] font-semibold tracking-tight text-[#172126]">Key Features</h2>
              <p className="mt-1 text-center text-[12px] text-[#68726f] md:hidden">Swipe to see all →</p>

              <div className="mt-4 md:mt-7">
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Scroll features left"
                    onClick={() => scrollFeatureTrack(-1)}
                    disabled={!canScrollFeaturesLeft}
                    className={`absolute left-0 top-[72px] z-10 hidden -translate-x-1/2 rounded-full border border-[#cfd4d8] bg-white p-2 text-[#172126] shadow-sm transition md:block ${
                      canScrollFeaturesLeft ? 'hover:bg-[#f7f6f2]' : 'pointer-events-none opacity-40'
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Scroll features right"
                    onClick={() => scrollFeatureTrack(1)}
                    disabled={!canScrollFeaturesRight}
                    className={`absolute right-0 top-[72px] z-10 hidden translate-x-1/2 rounded-full border border-[#cfd4d8] bg-white p-2 text-[#172126] shadow-sm transition md:block ${
                      canScrollFeaturesRight ? 'hover:bg-[#f7f6f2]' : 'pointer-events-none opacity-40'
                    }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                <div ref={featureScrollRef} className="overflow-x-auto pb-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <div className={featureTrackGapClass}>
                    {allFeatureItems.map((item) => (
                      <article
                        key={item.id}
                        className={sharedFeatureCardClass}
                      >
                        <div className={isPlusAndAboveFeatures ? sharedFeatureMediaFrameClass : soloFeatureMediaFrameClass}>
                          <img
                            src={item.image}
                            alt={getFeatureAlt(item)}
                            className={isPlusAndAboveFeatures ? sharedFeatureImageClass : soloFeatureImageClass}
                            loading="lazy"
                          />
                        </div>
                        {isPlusAndAboveFeatures && item.title && (
                          <h3 className={sharedFeatureTitleClass}>
                            {item.title}
                          </h3>
                        )}
                        {isPlusAndAboveFeatures && item.desc && (
                          <p className={sharedFeatureDescClass}>
                            {item.desc}
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
                </div>
              </div>
            </section>
          )}

          <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,56fr)_minmax(0,44fr)] lg:gap-12">
            <div className="min-w-0">
              <div className="h-full space-y-5">
                <div>
                  <h2 className="text-[24px] font-semibold tracking-tight">Product Details</h2>
                  <div className="mt-3 space-y-3">
                    {pdpQuickAnswerCopy?.intro && (
                      <div className="border-b border-[#d9d9d9] pb-2 text-[14px]">
                        <p className="text-[#59635f]">{pdpQuickAnswerCopy.intro}</p>
                      </div>
                    )}
                    {quickAnswerDimensionsText && (
                      <div className="border-b border-[#d9d9d9] pb-2 text-[14px]">
                        <h3 className="font-semibold text-[#172126]">Dimensions &amp; fit</h3>
                        <p className="mt-1 text-[#59635f]">{quickAnswerDimensionsText}</p>
                      </div>
                    )}
                    {quickAnswerAcousticText && (
                      <div className="border-b border-[#d9d9d9] pb-2 text-[14px]">
                        <h3 className="font-semibold text-[#172126]">Acoustic performance</h3>
                        <p className="mt-1 text-[#59635f]">{quickAnswerAcousticText}</p>
                      </div>
                    )}
                    {quickAnswerDeliveryText && (
                      <div className="border-b border-[#d9d9d9] pb-2 text-[14px]">
                        <h3 className="font-semibold text-[#172126]">Delivery &amp; installation</h3>
                        <p className="mt-1 text-[#59635f]">{quickAnswerDeliveryText}</p>
                      </div>
                    )}
                    {quickAnswerPowerText && (
                      <div className="border-b border-[#d9d9d9] pb-2 text-[14px]">
                        <h3 className="font-semibold text-[#172126]">Power &amp; connectivity</h3>
                        <p className="mt-1 text-[#59635f]">{quickAnswerPowerText}</p>
                      </div>
                    )}
                    {quickAnswerAddOnsText && (
                      <div className="border-b border-[#d9d9d9] pb-2 text-[14px]">
                        <h3 className="font-semibold text-[#172126]">Add-ons</h3>
                        <p className="mt-1 text-[#59635f]">{quickAnswerAddOnsText}</p>
                      </div>
                    )}
                    <div className="text-[14px]">
                      <h3 className="font-semibold text-[#172126]">Need help choosing?</h3>
                      <p className="mt-1 text-[#59635f]">{quickAnswerHelpText}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-[24px] font-semibold tracking-tight">Technical Specifications</h2>
                  <dl className="mt-3 grid gap-y-2">
                    {visibleTechnicalSpecRows.map((spec) => (
                      <div key={spec.label} className="flex items-start justify-between gap-4 border-b border-[#d9d9d9] pb-2 text-[14px]">
                        <dt className="font-medium text-[#59635f]">{spec.label}</dt>
                        <dd className="max-w-[70%] text-right font-semibold text-[#172126]">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {canToggleSpecs && (
                    <div className="mt-3 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setIsSpecsExpanded((prev) => !prev)}
                        className="text-[13px] font-medium text-[#59635f] underline underline-offset-2 transition-colors hover:text-[#172126]"
                      >
                        {isSpecsExpanded ? 'See less' : 'See more'}
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-[20px] font-semibold tracking-tight">Best for</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] text-[#172126]">
                    {product.useCases.map((useCase) => (
                      <li key={useCase}>{useCase}</li>
                    ))}
                  </ul>
                </div>

                {pdpQuickAnswerCopy && (
                  <div>
                    <h3 className="text-[20px] font-semibold tracking-tight">{pdpQuickAnswerCopy.heading}</h3>
                    <div className="mt-2 space-y-2 text-[14px] text-[#172126]">
                      {pdpQuickAnswerCopy.items.map((item) => (
                        <p key={item.q}>
                          <span className="font-semibold text-[#172126]">Q: {item.q}</span>
                          <br />
                          A: {typeof item.a === 'function' ? item.a({ startingPriceText }) : item.a}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0">
              <div className="h-full">
                <h2 className="text-[18px] font-semibold tracking-tight text-[#172126]">Dimensions</h2>
                <div className="mt-3 w-full">
                  {product.drawing2dImage ? (
                    <button
                      type="button"
                      onClick={() => setIsDimensionsModalOpen(true)}
                      className="inline-flex max-w-full items-center justify-center overflow-hidden rounded-[6px] border border-[#d9d9d9] bg-[#f7f6f2] p-0.5 text-left transition-colors hover:border-[#b8bec5]"
                      aria-label={`View detailed dimensions for ${product.name}`}
                    >
                      <img
                        src={product.drawing2dImage}
                        alt={`${product.name} dimensions`}
                        className="block h-auto max-w-full w-auto [image-rendering:-webkit-optimize-contrast]"
                      />
                    </button>
                  ) : (
                    <div className="flex min-h-[180px] w-full items-center justify-center rounded-[6px] border border-[#d9d9d9] bg-[#f7f6f2] text-center text-[13px] font-medium text-[#6e737a]">
                      Dimensions will be added soon
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {shouldShowThumbnails && (
            <div className="w-full pt-10">
              <h3 className="mb-12 text-center text-[36px] font-semibold tracking-tight text-[#172126] md:text-[40px]">Our Past Projects</h3>
              <div className="w-full overflow-x-auto pb-2">
                <div className="flex w-max min-w-full justify-center gap-4 md:gap-5">
                  {customerGalleryItems.map((item, index) => {
                    const isActive = isGalleryModalOpen ? galleryModalIndex === index : index === 0;
                    return (
                      <button
                        key={`${product.slug}-${item.type}-thumb-unified-${index}`}
                        type="button"
                        onClick={() => handleThumbnailSelect(item, index)}
                        className={`flex h-[112px] w-[112px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border bg-white transition sm:h-[124px] sm:w-[124px] md:h-[132px] md:w-[132px] ${
                          isActive ? 'border-[#00855a] ring-1 ring-[#007653]/40' : 'border-[#d0d3d7] hover:border-[#98a2ac]'
                        }`}
                        aria-label={`Open gallery image ${index + 1} for ${product.name}`}
                      >
                        <picture className="block h-full w-full">
                          {getGalleryAvifSource(item.image) ? <source srcSet={getGalleryAvifSource(item.image)} type="image/avif" /> : null}
                          <img
                            src={item.image}
                            alt={getGalleryThumbAlt(item)}
                            className="h-full w-full object-cover"
                          />
                        </picture>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <section className="mx-auto w-full max-w-[980px] border-t border-[#d0d0d0] pt-8">
            <QuoteForm defaultPod={product.displayTitle || product.name} />
            <div className="mt-6 flex justify-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  pushDataLayerEvent('whatsapp_click', {
                    cta_location: 'product_page_bottom_cta',
                    cta_text: 'WhatsApp us',
                    destination_url: whatsappHref,
                    contact_method: 'whatsapp',
                    product_name: product.name,
                    product_slug: product.slug
                  })
                }
                className="inline-flex w-full items-center justify-center rounded-[6px] bg-[#00855a] px-6 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-[#172126] sm:w-auto"
              >
                WhatsApp us
              </a>
            </div>
          </section>
        </div>
      </section>
      <SiteFooter className="mt-0" />

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

      {isGalleryModalOpen && customerGalleryItems.length > 0 && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image gallery`}
          onClick={() => setIsGalleryModalOpen(false)}
        >
          <div className="relative flex h-full max-h-[92vh] w-full max-w-[96vw] items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsGalleryModalOpen(false)}
              className="absolute right-2 top-2 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>

            {customerGalleryItems.length > 1 && (
              <button
                type="button"
                onClick={goToPrevModalImage}
                className="absolute left-2 z-20 rounded-full bg-white/90 p-2 text-[#172126] transition hover:bg-white"
                aria-label="Previous gallery image"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            <picture className="flex max-h-[88vh] max-w-[92vw] items-center justify-center">
              {getGalleryAvifSource(customerGalleryItems[galleryModalIndex]?.image) ? (
                <source srcSet={getGalleryAvifSource(customerGalleryItems[galleryModalIndex]?.image)} type="image/avif" />
              ) : null}
              <img
                src={customerGalleryItems[galleryModalIndex]?.image}
                alt={getGalleryThumbAlt(customerGalleryItems[galleryModalIndex])}
                className="max-h-[88vh] max-w-[92vw] rounded-[8px] object-contain"
              />
            </picture>

            {customerGalleryItems.length > 1 && (
              <button
                type="button"
                onClick={goToNextModalImage}
                className="absolute right-2 z-20 rounded-full bg-white/90 p-2 text-[#172126] transition hover:bg-white"
                aria-label="Next gallery image"
              >
                <ChevronRight size={28} />
              </button>
            )}
          </div>
        </div>
      )}
    </main>
    </div>
  );
}
