import aceSoloCutout from '../../assets/ace-solo-cutout.png';
import aceSoloPlusCutout from '../../assets/ace-solo-plus-cutout.png';
import aceDuoCutout from '../../assets/ace-duo-cutout.png';
import aceMeetingCutout from '../../assets/ace-meeting-XL-cutout.png';
import aceMeetingXLCutout from '../../assets/ace-meeting-XL-cutout.png';
import aceSoloHero from '../../assets/ace-solo.png';
import aceSoloPlusHero from '../../assets/ace-solo-plus.png';
import aceDuoHero from '../../assets/ace-duo.png';
import aceMeetingHero from '../../assets/ace-meeting.png';
import aceMeetingXLHero from '../../assets/ace-meeting-XL.png';
import aceSolo2d from '../../assets/ace-solo-2d.png';
import aceSoloPlus2d from '../../assets/ace-solo-plus-2d.png';
import aceDuo2d from '../../assets/ace-duo-2d.png';
import aceMeeting2d from '../../assets/ace-meeting-2d.png';

const deliveryDefaults = {
  default: 350,
  outstationNote: 'Outstation: please email'
};

const highBarStoolAddon = { id: 'high-bar-stool', label: 'High bar stool (white/black)', amount: 290 };
const meetingSofaAddon = { id: 'meeting-sofa-set', label: '1 set sofa (Ace Meeting only)', amount: 1250 };
const meetingXLSofaAddon = { id: 'meeting-xl-sofa-set', label: '1 set sofa (Ace Meeting XL only)', amount: 1400 };
const meetingXLLShapeSofaAddon = { id: 'meeting-xl-l-shape-sofa', label: 'L-shape sofa (Ace Meeting XL only)', amount: 2650 };
const sharedFeatureStripItems = [
  { title: 'Motion sensor for energy saving', desc: 'Systems activate on entry and turn off after inactivity.' },
  { title: 'Efficient air flow system', desc: 'Fresh air is circulated to preserve acoustic comfort.' },
  { title: 'Comfortable ambience', desc: 'Adjustable LED control supports desired light levels.' },
  { title: 'Acoustic elegance', desc: 'Wood-lined surfaces support a quiet, premium interior feel.' },
  { title: 'Smart connectivity', desc: 'Universal power + USB charging options for daily work.' },
  { title: 'Effortless door handle design', desc: 'Seamless coated handle with practical day-to-day grip.' },
  { title: 'Ventilation outlet system', desc: 'Continuous outlet flow helps maintain cool air balance.' },
  { title: 'Soft closure', desc: 'Magnetic close reduces slamming and improves comfort.' },
  { title: 'Magnetic writable whiteboard', desc: 'Integrated writable panel for quick notes and planning.' },
  { title: 'Stylish door stopper', desc: 'Holds the door open and prevents abrupt swing-back.' },
  { title: 'Elevated spaces', desc: 'Foldable hook supports light bag and jacket use.' },
  { title: 'Innovation design unveiled', desc: 'Aluminium profile frame supports opening and access.' },
  { title: 'Enhanced power', desc: '13A UK plug plus configurable power and data options.' },
  { title: 'Ideal canvas for custom workspaces', desc: 'Layout-ready structure adapts to different office needs.' },
  { title: 'Versatile and movable oasis pods', desc: 'Engineered for practical relocation with proper handling.' },
  { title: 'PET material for enhanced acoustics', desc: 'PET layers help reduce echo and improve sound control.' },
  { title: 'Furnishing sofa', desc: 'High-density sofa cushioning supports longer sessions.' }
];

export const products = [
  {
    slug: 'ace-solo',
    name: 'Ace Solo',
    breadcrumbLabel: 'Ace Pods',
    shortDesc: 'Private pod for calls and quick focused work',
    heroImage: aceSoloHero,
    thumbImage: aceSoloCutout,
    drawing2dImage: aceSolo2d,
    imageScale: 'scale-[1.30]',
    hoverImg: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
    cardSupport: 'For short daily use',
    pricing: {
      amount: 'From RM12,500',
      note: 'Indicative pricing, final quote depends on finish and site conditions.'
    },
    pdpPricing: {
      baseConfigurations: [{ id: 'solo-unit', label: 'Unit only', price: 12500 }],
      configurationOptions: [],
      installationPerUnit: 350,
      delivery: deliveryDefaults,
      addOnOptions: [highBarStoolAddon]
    },
    technicalSpecifications: {
      capacity: '1 person',
      externalDimensions: '1200mm × 1000mm (47.24" × 39.37")',
      internalDimensions: '1078mm × 939mm (42.44" × 36.96")',
      internalHeight: '2207mm (86.88")',
      externalHeight: '2250mm (88.58")',
      roomHeightRequirement: '2400mm (94.48")',
      weight: '335kg ±',
      boothFacilities: ['Standing height table', 'Power socket']
    },
    featureStripItems: sharedFeatureStripItems,
    featureAvailabilityNote: '* Eco Pod does not include these features',
    specs: [
      { label: 'Capacity', value: '1 person' },
      { label: 'Best for', value: 'Calls and short focus sessions' },
      { label: 'Ventilation', value: 'Continuous airflow for daily use' },
      { label: 'Power', value: 'Integrated lighting + power access' }
    ],
    useCases: ['Client calls', 'Quick check-ins', 'Private concentration blocks'],
    exteriorColors: [
      { id: 'ext-white', label: 'Cloud White', hex: '#ececec' },
      { id: 'ext-black', label: 'Graphite', hex: '#1f1f1f' },
      { id: 'ext-green', label: 'Forest', hex: '#145a5d' },
      { id: 'ext-sand', label: 'Sand', hex: '#cdb89e' }
    ],
    interiorColors: [
      { id: 'int-grey', label: 'Light Grey', hex: '#c7cbd1' },
      { id: 'int-charcoal', label: 'Charcoal', hex: '#6d7178' },
      { id: 'int-clay', label: 'Clay', hex: '#c98b70' },
      { id: 'int-olive', label: 'Olive', hex: '#8c8a61' }
    ],
    defaultExterior: 'ext-white',
    defaultInterior: 'int-grey',
    faq: [
      { q: 'How fast can Ace Solo be installed?', a: 'Typical projects are scheduled after a site review and final confirmation.' },
      { q: 'Can it be moved later?', a: 'Yes. The unit can be relocated with proper handling and planning.' }
    ]
  },
  {
    slug: 'ace-solo-plus',
    name: 'Ace Solo Plus',
    breadcrumbLabel: 'Ace Pods',
    shortDesc: 'More spacious pod for longer solo sessions',
    heroImage: aceSoloPlusHero,
    thumbImage: aceSoloPlusCutout,
    drawing2dImage: aceSoloPlus2d,
    imageScale: 'scale-[1.40]',
    hoverImg: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
    cardSupport: 'For repeated daily use',
    pricing: {
      amount: 'From RM14,400',
      note: 'Indicative pricing, final quote depends on finish and site conditions.'
    },
    pdpPricing: {
      baseConfigurations: [{ id: 'solo-plus-unit', label: 'Unit only', price: 14400 }],
      configurationOptions: [],
      installationPerUnit: 500,
      delivery: deliveryDefaults,
      addOnOptions: [highBarStoolAddon]
    },
    technicalSpecifications: {
      capacity: '1 person',
      externalDimensions: '1000mm × 1000mm (39.37" × 39.37")',
      internalDimensions: '853mm × 918mm (33.58" × 36.14")',
      internalHeight: '2070mm (81.50")',
      externalHeight: '2350mm (92.52")',
      roomHeightRequirement: '2500mm (98.43")',
      weight: '335kg',
      boothFacilities: ['Standing height table', 'Whiteboard panel', 'Netbox power']
    },
    featureStripItems: sharedFeatureStripItems,
    specs: [
      { label: 'Capacity', value: '1 person' },
      { label: 'Best for', value: 'Longer solo sessions and focused work' },
      { label: 'Ventilation', value: 'Continuous airflow for extended occupancy' },
      { label: 'Power', value: 'Integrated lighting + power access' }
    ],
    useCases: ['Deep work', 'Daily confidential calls', 'Private virtual meetings'],
    exteriorColors: [
      { id: 'ext-white', label: 'Cloud White', hex: '#ececec' },
      { id: 'ext-black', label: 'Graphite', hex: '#1f1f1f' },
      { id: 'ext-green', label: 'Forest', hex: '#145a5d' },
      { id: 'ext-sand', label: 'Sand', hex: '#cdb89e' }
    ],
    interiorColors: [
      { id: 'int-grey', label: 'Light Grey', hex: '#c7cbd1' },
      { id: 'int-charcoal', label: 'Charcoal', hex: '#6d7178' },
      { id: 'int-clay', label: 'Clay', hex: '#c98b70' },
      { id: 'int-olive', label: 'Olive', hex: '#8c8a61' }
    ],
    defaultExterior: 'ext-white',
    defaultInterior: 'int-grey',
    faq: [
      { q: 'Is Ace Solo Plus suitable for all-day use?', a: 'Yes. It is designed for repeated daily use with comfort-focused interior space.' },
      { q: 'Can we match office finishes?', a: 'Yes. Exterior and interior finishes can be selected during specification.' }
    ]
  },
  {
    slug: 'ace-duo',
    name: 'Ace Duo',
    breadcrumbLabel: 'Ace Pods',
    shortDesc: 'Private pod for one-to-one conversations',
    heroImage: aceDuoHero,
    thumbImage: aceDuoCutout,
    drawing2dImage: aceDuo2d,
    imageScale: 'scale-[1.40]',
    hoverImg: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=800&auto=format&fit=crop',
    cardSupport: 'For interviews and shared work',
    pricing: {
      amount: 'From RM19,900',
      note: 'Indicative pricing, final quote depends on finish and site conditions.'
    },
    pdpPricing: {
      baseConfigurations: [{ id: 'duo-unit', label: 'Unit only', price: 19900 }],
      configurationOptions: [
        { id: 'duo-fixed-table', label: 'Fixed normal height table', amount: 1000 },
        { id: 'duo-adjustable-table', label: 'Adjustable table', amount: 3000 }
      ],
      installationPerUnit: 550,
      delivery: deliveryDefaults,
      addOnOptions: [highBarStoolAddon]
    },
    technicalSpecifications: {
      capacity: '1 person',
      externalDimensions: '1600mm × 1200mm (62.99" × 47.24")',
      internalDimensions: '1452mm × 1100mm (57.16" × 43.30")',
      internalHeight: '2070mm (81.50")',
      externalHeight: '2350mm (92.52")',
      roomHeightRequirement: '2500mm (98.43")',
      weight: '523kg',
      boothFacilities: ['Standing height table', 'Netbox power', 'Optional: height adjustable table', 'Optional: Netbox power (different ports)']
    },
    featureStripItems: sharedFeatureStripItems,
    specs: [
      { label: 'Capacity', value: 'Up to 2 people' },
      { label: 'Best for', value: 'One-to-one conversations and focused collaboration' },
      { label: 'Ventilation', value: 'Continuous airflow for two-person occupancy' },
      { label: 'Power', value: 'Integrated lighting + power access' }
    ],
    useCases: ['Interviews', '1:1 meetings', 'Private collaboration'],
    exteriorColors: [
      { id: 'ext-white', label: 'Cloud White', hex: '#ececec' },
      { id: 'ext-black', label: 'Graphite', hex: '#1f1f1f' },
      { id: 'ext-green', label: 'Forest', hex: '#145a5d' },
      { id: 'ext-sand', label: 'Sand', hex: '#cdb89e' }
    ],
    interiorColors: [
      { id: 'int-grey', label: 'Light Grey', hex: '#c7cbd1' },
      { id: 'int-charcoal', label: 'Charcoal', hex: '#6d7178' },
      { id: 'int-clay', label: 'Clay', hex: '#c98b70' },
      { id: 'int-olive', label: 'Olive', hex: '#8c8a61' }
    ],
    defaultExterior: 'ext-white',
    defaultInterior: 'int-grey',
    faq: [
      { q: 'Does Ace Duo support hybrid calls?', a: 'Yes. It works well for private calls and small hybrid discussions.' },
      { q: 'Can it replace small meeting rooms?', a: 'For short two-person sessions, Ace Duo is a practical alternative.' }
    ]
  },
  {
    slug: 'ace-meeting',
    name: 'Ace Meeting',
    breadcrumbLabel: 'Ace Pods',
    shortDesc: 'Meeting pod for small team discussions',
    heroImage: aceMeetingHero,
    thumbImage: aceMeetingCutout,
    drawing2dImage: aceMeeting2d,
    imageScale: 'scale-[1.40]',
    hoverImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    cardSupport: 'For 4 people and hybrid calls',
    pricing: {
      amount: 'From RM22,200',
      note: 'Indicative pricing, final quote depends on finish and site conditions.'
    },
    pdpPricing: {
      baseConfigurations: [{ id: 'meeting-unit', label: 'Unit only', price: 22200 }],
      configurationOptions: [
        { id: 'meeting-fixed-table', label: 'Fixed normal height table', amount: 700 },
        { id: 'meeting-adjustable-table', label: 'Height adjustable table', amount: 2550 },
        { id: 'meeting-whiteboard-discussion', label: '1 whiteboard panel + 1 discussion table', amount: 3600 },
        { id: 'meeting-2sofa-centre-table', label: '2 sofa sets + 1 central discussion table', amount: 3800 },
        { id: 'meeting-whiteboard-discussion-2sofa', label: '1 whiteboard panel + 1 discussion table + 2 sofa set', amount: 6200 }
      ],
      installationPerUnit: 750,
      delivery: deliveryDefaults,
      addOnOptions: [highBarStoolAddon, meetingSofaAddon]
    },
    technicalSpecifications: {
      capacity: '2–4 people',
      externalDimensions: '2200mm × 1200mm (86.61" × 47.24")',
      internalDimensions: '2030mm × 1140mm (79.92" × 44.88")',
      internalHeight: '2070mm (81.50")',
      externalHeight: '2350mm (92.52")',
      roomHeightRequirement: '2500mm (98.43")',
      weight: '651kg ±',
      boothFacilities: ['Fixed center table', 'White board center panel', 'Full fabric panel', '2 units of sofa (2-seater)']
    },
    featureStripItems: sharedFeatureStripItems,
    specs: [
      { label: 'Capacity', value: '4 people' },
      { label: 'Best for', value: 'Small team meetings and hybrid calls' },
      { label: 'Ventilation', value: 'Continuous airflow for group sessions' },
      { label: 'Power', value: 'Integrated lighting + power access' }
    ],
    useCases: ['Team syncs', 'Hybrid stand-ups', 'Internal project reviews'],
    exteriorColors: [
      { id: 'ext-white', label: 'Cloud White', hex: '#ececec' },
      { id: 'ext-black', label: 'Graphite', hex: '#1f1f1f' },
      { id: 'ext-green', label: 'Forest', hex: '#145a5d' },
      { id: 'ext-sand', label: 'Sand', hex: '#cdb89e' }
    ],
    interiorColors: [
      { id: 'int-grey', label: 'Light Grey', hex: '#c7cbd1' },
      { id: 'int-charcoal', label: 'Charcoal', hex: '#6d7178' },
      { id: 'int-clay', label: 'Clay', hex: '#c98b70' },
      { id: 'int-olive', label: 'Olive', hex: '#8c8a61' }
    ],
    defaultExterior: 'ext-white',
    defaultInterior: 'int-grey',
    faq: [
      { q: 'What is the difference between Meeting and Meeting XL?', a: 'Meeting XL adds more internal room for larger group sessions.' },
      { q: 'Is it suitable for longer team discussions?', a: 'Yes. It is designed for practical daily team use with acoustic control.' }
    ]
  },
  {
    slug: 'ace-meeting-xl',
    name: 'Ace Meeting XL',
    breadcrumbLabel: 'Ace Pods',
    shortDesc: 'Meeting pod for larger team discussions',
    heroImage: aceMeetingXLHero,
    thumbImage: aceMeetingXLCutout,
    drawing2dImage: aceMeeting2d,
    imageScale: 'scale-[1.40]',
    hoverImg: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=800&auto=format&fit=crop',
    cardSupport: 'For 6 people and hybrid calls',
    pricing: {
      amount: 'From RM27,800',
      note: 'Indicative pricing, final quote depends on finish and site conditions.'
    },
    pdpPricing: {
      baseConfigurations: [{ id: 'meeting-xl-unit', label: 'Unit only', price: 27800 }],
      configurationOptions: [
        { id: 'meeting-xl-centre-table', label: 'Centre table', amount: 1200 },
        { id: 'meeting-xl-whiteboard-centre-table', label: 'Whiteboard panel + centre table', amount: 4200 },
        { id: 'meeting-xl-centre-table-2sofa', label: 'Centre table + 2 sofa sets', amount: 5200 },
        { id: 'meeting-xl-whiteboard-centre-table-2sofa', label: 'Whiteboard panel + centre table + 2 sofa sets', amount: 8200 }
      ],
      installationPerUnit: 800,
      delivery: deliveryDefaults,
      addOnOptions: [highBarStoolAddon, meetingXLSofaAddon, meetingXLLShapeSofaAddon]
    },
    technicalSpecifications: {
      capacity: 'Up to 6 people',
      externalDimensions: '2200mm × 1500mm (86.61" × 59.05")',
      internalDimensions: '2030mm × 1440mm (79.92" × 56.69")',
      internalHeight: '2070mm (81.50")',
      externalHeight: '2350mm (92.52")',
      roomHeightRequirement: '2500mm (98.43")',
      weight: '651kg ±',
      boothFacilities: ['Fixed center table', 'White board center panel', 'Full fabric panel', '2 units of sofa (2-seater)', 'Netbox power']
    },
    featureStripItems: sharedFeatureStripItems,
    specs: [
      { label: 'Capacity', value: '6 people' },
      { label: 'Best for', value: 'Larger team meetings and hybrid calls' },
      { label: 'Ventilation', value: 'Continuous airflow for extended group use' },
      { label: 'Power', value: 'Integrated lighting + power access' }
    ],
    useCases: ['Project workshops', 'Extended team sessions', 'Group discussions'],
    exteriorColors: [
      { id: 'ext-white', label: 'Cloud White', hex: '#ececec' },
      { id: 'ext-black', label: 'Graphite', hex: '#1f1f1f' },
      { id: 'ext-green', label: 'Forest', hex: '#145a5d' },
      { id: 'ext-sand', label: 'Sand', hex: '#cdb89e' }
    ],
    interiorColors: [
      { id: 'int-grey', label: 'Light Grey', hex: '#c7cbd1' },
      { id: 'int-charcoal', label: 'Charcoal', hex: '#6d7178' },
      { id: 'int-clay', label: 'Clay', hex: '#c98b70' },
      { id: 'int-olive', label: 'Olive', hex: '#8c8a61' }
    ],
    defaultExterior: 'ext-white',
    defaultInterior: 'int-grey',
    faq: [
      { q: 'How is Ace Meeting XL different from Ace Meeting?', a: 'Ace Meeting XL provides more internal space for larger group sessions.' },
      { q: 'Is Ace Meeting XL suitable for daily hybrid meetings?', a: 'Yes. It is designed for regular team use and longer hybrid calls.' }
    ]
  }
];

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug);
