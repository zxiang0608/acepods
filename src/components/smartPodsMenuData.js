import menuAceSolo from '../../assets/ace-solo-cutout.png';
import menuAceSoloPlus from '../../assets/ace-solo-plus-cutout.png';
import menuAceDuo from '../../assets/ace-duo-cutout.png';
import menuAceMeeting from '../../assets/POD images/Team Pod 4 seater - Ace Meeting/All colours/ocean blue.png';
import menuAceMeetingXL from '../../assets/ace-meeting-XL-cutout.png';

export const smartPodsMenuItems = [
  {
    title: 'Ace Solo',
    description: 'Designed for individuals who need a quiet, private workspace.',
    image: menuAceSolo,
    to: '/pods/ace-solo'
  },
  {
    title: 'Ace Solo Plus',
    description: 'The perfect quiet workspace for two-person collaborations.',
    image: menuAceSoloPlus,
    to: '/pods/ace-solo-plus'
  },
  {
    title: 'Ace Solo Pro',
    description: 'Enhanced workspace and comfort',
    image: menuAceDuo,
    to: '/pods/ace-solo-pro'
  },
  {
    title: 'Ace Meeting',
    description: 'Sound-contained environment tailored for small team meetings.',
    image: menuAceMeeting,
    imageClassName: 'scale-[1.14] mix-blend-multiply',
    to: '/pods/ace-meeting'
  },
  {
    title: 'Ace Meeting XL',
    description: 'Provides ample space for larger team meetings and collaboration.',
    image: menuAceMeetingXL,
    imageClassName: 'mix-blend-multiply',
    to: '/pods/ace-meeting-xl'
  }
];
