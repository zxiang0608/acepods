import menuAceSoloAsh from '../../assets/products/ace-solo/normalized/aceSoloShimoAshImage-normalized.png';
import menuAceSoloPlusGreyAsh from '../../assets/ace-plus-cutouts/ace-plus-grey-ash.png';
import menuAceFlex from '../../assets/ace-flex.png';
import menuAceFlexDuoHero from '../../assets/ace-flex-duo-hero.png';
import menuAceMeetingGreyAsh from '../../assets/POD images/Team Pod 4 seater - Ace Meeting/All colours/Grey ash.png';
import menuAceHubGreyAsh from '../../assets/POD images/TEAM POD 6 Seaters - Ace Meeting XL/All colours/Grey ash-01.png';
import { POD_SEO_BY_SLUG } from '../data/podSeoCatalog';

export const smartPodsMenuItems = [
  {
    title: 'Ace Solo',
    description: POD_SEO_BY_SLUG['ace-solo'].shortDesc,
    image: menuAceSoloAsh,
    to: '/pods/ace-solo'
  },
  {
    title: 'Ace Plus',
    description: POD_SEO_BY_SLUG['ace-plus'].shortDesc,
    image: menuAceSoloPlusGreyAsh,
    to: '/pods/ace-plus'
  },
  {
    title: 'Ace Flex',
    description: POD_SEO_BY_SLUG['ace-flex'].shortDesc,
    image: menuAceFlex,
    imageClassName: 'mix-blend-multiply',
    to: '/pods/ace-flex'
  },
  {
    title: 'Ace Flex Duo',
    description: POD_SEO_BY_SLUG['ace-flex-duo'].shortDesc,
    image: menuAceFlexDuoHero,
    to: '/pods/ace-flex-duo'
  },
  {
    title: 'Ace Meet',
    description: POD_SEO_BY_SLUG['ace-meet'].shortDesc,
    image: menuAceMeetingGreyAsh,
    imageClassName: 'scale-[1.14] mix-blend-multiply',
    to: '/pods/ace-meet'
  },
  {
    title: 'Ace Hub',
    description: POD_SEO_BY_SLUG['ace-hub'].shortDesc,
    image: menuAceHubGreyAsh,
    imageClassName: 'mix-blend-multiply',
    to: '/pods/ace-hub'
  }
];
