import aceMonarch from '../assets/chairs/ace-monarch.png';
import aceRegal from '../assets/chairs/ace-regal.png';
import aceApex from '../assets/chairs/ace-apex.png';
import aceCrest from '../assets/chairs/ace-crest.png';
import acePace from '../assets/chairs/ace-pace.png';
import aceGuest from '../assets/chairs/ace-guest.png';
import aceLite from '../assets/chairs/ace-lite.png';

// Ace Chairs — customer-facing line. Supplier codes and costs never appear here.
export const chairs = [
  {
    id: 'ace-monarch',
    name: 'Ace Monarch',
    tier: 'Executive',
    price: 2270,
    image: aceMonarch,
    blurb: 'Top-of-range executive highback with full ergonomic adjustments, headrest and premium upholstery.'
  },
  {
    id: 'ace-regal',
    name: 'Ace Regal',
    tier: 'Executive',
    price: 1800,
    image: aceRegal,
    blurb: 'Executive highback for directors’ offices — refined look with full-day seating comfort.'
  },
  {
    id: 'ace-apex',
    name: 'Ace Apex',
    tier: 'Managerial',
    price: 1350,
    image: aceApex,
    blurb: 'Premium mesh managerial chair with adjustable lumbar support and breathable back.'
  },
  {
    id: 'ace-crest',
    name: 'Ace Crest',
    tier: 'Managerial',
    price: 1470,
    image: aceCrest,
    blurb: 'Sculpted managerial highback balancing presence and all-day support.'
  },
  {
    id: 'ace-pace',
    name: 'Ace Pace',
    tier: 'Daily work',
    price: 820,
    image: acePace,
    blurb: 'Dependable everyday workhorse chair for workstations and shared desks.'
  },
  {
    id: 'ace-guest',
    name: 'Ace Guest',
    tier: 'Visitor',
    price: 790,
    image: aceGuest,
    blurb: 'Cantilever visitor chair that keeps meeting corners consistent and professional.'
  },
  {
    id: 'ace-lite',
    name: 'Ace Lite',
    tier: 'Visitor',
    price: 370,
    image: aceLite,
    blurb: 'Light, stackable seating for training rooms, pantries and high-turnover areas.'
  }
];

export const formatChairPrice = (amount) => `RM${amount.toLocaleString('en-MY')}`;
