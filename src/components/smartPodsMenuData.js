import menuAceSolo from '../../assets/ace-solo-cutout.png';
import menuAceSoloPlus from '../../assets/ace-solo-plus-cutout.png';
import menuAceDuo from '../../assets/ace-duo-cutout.png';
import menuAceMeeting from '../../assets/POD images/Team Pod 4 seater - Ace Meeting/ocean-blue-cutout.png';
import menuAceMeetingXL from '../../assets/ace-meeting-XL-cutout.png';
import { POD_SEO_BY_SLUG } from '../data/podSeoCatalog';

export const smartPodsMenuItems = [
  {
    title: 'Ace Solo',
    description: 'Designed for individuals who need a quiet, private workspace.',
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
    description: 'Enhanced workspace and comfort',
    image: menuAceDuo,
    to: '/pods/ace-flex'
  },
  {
    title: 'Ace Meet',
    description: 'Sound-contained environment tailored for small team meetings.',
    image: menuAceMeeting,
    imageClassName: 'scale-[1.14] mix-blend-multiply',
    to: '/pods/ace-meet'
  },
  {
    title: 'Ace Hub',
    description: 'Provides ample space for larger team meetings and collaboration.',
    image: menuAceMeetingXL,
    imageClassName: 'mix-blend-multiply',
    to: '/pods/ace-hub'
  }
];
