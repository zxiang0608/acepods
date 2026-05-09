import menuAceSolo from '../../assets/ace-solo-cutout.png';
import menuAceSoloPlus from '../../assets/ace-solo-plus-cutout.png';
import menuAceDuo from '../../assets/ace-duo-cutout.png';
import menuAceFlexDuo from '../../assets/ace-flex-duo-hero.png';
import menuAceMeeting from '../../assets/POD images/Team Pod 4 seater - Ace Meeting/ocean-blue-cutout.png';
import menuAceMeetingXL from '../../assets/ace-meeting-XL-cutout.png';
import { POD_SEO_BY_SLUG } from '../data/podSeoCatalog';

export const smartPodsMenuItems = [
  {
    title: 'Ace Solo',
    description: POD_SEO_BY_SLUG['ace-solo'].shortDesc,
    image: menuAceSolo,
    to: '/pods/ace-solo'
  },
  {
    title: 'Ace Plus',
    description: POD_SEO_BY_SLUG['ace-plus'].shortDesc,
    image: menuAceSoloPlus,
    to: '/pods/ace-plus'
  },
  {
    title: 'Ace Flex',
    description: POD_SEO_BY_SLUG['ace-flex'].shortDesc,
    image: menuAceDuo,
    to: '/pods/ace-flex'
  },
  {
    title: 'Ace Flex Duo',
    description: POD_SEO_BY_SLUG['ace-flex-duo'].shortDesc,
    image: menuAceFlexDuo,
    to: '/pods/ace-flex-duo'
  },
  {
    title: 'Ace Meet',
    description: POD_SEO_BY_SLUG['ace-meet'].shortDesc,
    image: menuAceMeeting,
    imageClassName: 'scale-[1.14] mix-blend-multiply',
    to: '/pods/ace-meet'
  },
  {
    title: 'Ace Hub',
    description: POD_SEO_BY_SLUG['ace-hub'].shortDesc,
    image: menuAceMeetingXL,
    imageClassName: 'mix-blend-multiply',
    to: '/pods/ace-hub'
  }
];
