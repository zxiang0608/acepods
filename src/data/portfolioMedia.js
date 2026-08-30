import amoreOfficeWide from '../../assets/Portfolio/Amorepacific/amorepacific-office-wide.jpg';
import amoreOfficeContext from '../../assets/Portfolio/Amorepacific/amorepacific-office-context.jpg';
import amorePodFront from '../../assets/Portfolio/Amorepacific/amorepacific-pod-front.jpg';
import amorePodWorktop from '../../assets/Portfolio/Amorepacific/amorepacific-pod-worktop.jpg';
import amorePodInterior from '../../assets/Portfolio/Amorepacific/amorepacific-pod-interior.jpg';
import amorePodDetail from '../../assets/Portfolio/Amorepacific/amorepacific-pod-detail.jpg';
import brenntagOfficeWide from '../../assets/Portfolio/Brenntag/brenntag-office-wide.jpg';
import brenntagPodsWide from '../../assets/Portfolio/Brenntag/brenntag-pods-wide.jpg';
import brenntagPodPair from '../../assets/Portfolio/Brenntag/brenntag-pod-pair.jpg';
import brenntagPodInUse from '../../assets/Portfolio/Brenntag/brenntag-pod-in-use.jpg';
import brenntagPodDetail from '../../assets/Portfolio/Brenntag/brenntag-pod-detail.jpg';
import brenntagPodFront from '../../assets/Portfolio/Brenntag/brenntag-pod-front.jpg';

const ownerApproved = {
  source: 'Ace Workplace Solutions Drive — owner-approved portfolio folder',
  reviewedOn: '2026-08-29',
  status: 'owner-approved',
  role: 'project-gallery'
};

export const portfolioProjectMedia = {
  Amorepacific: {
    ...ownerApproved,
    images: [
      { src: amoreOfficeWide, alt: 'Office pod installation for Amorepacific in a completed workplace', role: 'lead' },
      { src: amoreOfficeContext, alt: 'Office context around an Ace pod installation for Amorepacific', role: 'office-context' },
      { src: amorePodFront, alt: 'Installed office pod at Amorepacific', role: 'installed-pod' },
      { src: amorePodWorktop, alt: 'Office pod worktop at Amorepacific', role: 'interior-use' },
      { src: amorePodInterior, alt: 'Office pod interior at Amorepacific', role: 'interior-use' },
      { src: amorePodDetail, alt: 'Office pod finish detail at Amorepacific', role: 'detail' }
    ]
  },
  Brenntag: {
    ...ownerApproved,
    images: [
      { src: brenntagOfficeWide, alt: 'Office pod installation for Brenntag in a completed workplace', role: 'lead' },
      { src: brenntagPodsWide, alt: 'Installed office pods at Brenntag', role: 'office-context' },
      { src: brenntagPodPair, alt: 'Pair of installed office pods at Brenntag', role: 'installed-pod' },
      { src: brenntagPodInUse, alt: 'Office pod in use at Brenntag', role: 'interior-use' },
      { src: brenntagPodDetail, alt: 'Office pod finish detail at Brenntag', role: 'detail' },
      { src: brenntagPodFront, alt: 'Installed office pod at Brenntag', role: 'installed-pod' }
    ]
  }
};
