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
      amount: 'From RM13,500',
      note: 'Indicative pricing, final quote depends on finish and site conditions.'
    },
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
      amount: 'From RM15,900',
      note: 'Indicative pricing, final quote depends on finish and site conditions.'
    },
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
      amount: 'From RM21,500 - RM24,150',
      note: 'Indicative pricing, final quote depends on finish and site conditions.'
    },
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
      amount: 'From RM22,800 - RM40,200',
      note: 'Range includes Ace Meeting and Meeting XL configurations.'
    },
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
      amount: 'From RM36,700 - RM40,200',
      note: 'Indicative pricing, final quote depends on finish and site conditions.'
    },
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
