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
import everllenceOfficeWide01 from '../../assets/Portfolio/Everllence/everllence-ace-plus-office-wide-01.jpg';
import everllenceInUse from '../../assets/Portfolio/Everllence/everllence-ace-plus-in-use.jpg';
import everllenceBrandedFront from '../../assets/Portfolio/Everllence/everllence-ace-plus-branded-front.jpg';
import everllenceOpenDoor from '../../assets/Portfolio/Everllence/everllence-ace-plus-open-door.jpg';
import everllenceInterior from '../../assets/Portfolio/Everllence/everllence-ace-plus-interior.jpg';
import taylorsAcePlusFront from "../../assets/Portfolio/Taylor's College/20260209_143054.jpg";
import taylorsAcePlusStool from "../../assets/Portfolio/Taylor's College/20260224_102358.jpg";
import taylorsAcePlusInterior from "../../assets/Portfolio/Taylor's College/20260224_102416.jpg";
import taylorsAcePlusOpenDoor from "../../assets/Portfolio/Taylor's College/20260224_102417.jpg";
import parkerFlexOfficeWide from '../../assets/Portfolio/Alphabet Capital/20250619_140819.jpg';
import parkerFlexInUse from '../../assets/Portfolio/Alphabet Capital/ace-duo-2.jpg';
import parkerFlexInstalled from '../../assets/Portfolio/Alphabet Capital/ace-duo-4.jpg';
import parkerFlexInterior from '../../assets/Portfolio/Alphabet Capital/wall-inside-2.jpg';
import aceHubOfficeWide from '../../assets/Portfolio/Ace hub/YYC_advisor_4.webp';
import aceHubOpenDoor from '../../assets/Portfolio/Ace hub/Untitled_design_15.webp';
import aceHubInteriorWide from '../../assets/Portfolio/Ace hub/20260313_145941.jpg';
import aceHubInteriorTable from '../../assets/Portfolio/Ace hub/20260313_145945.jpg';
import aceHubInteriorDetail from '../../assets/Portfolio/Ace hub/20260313_145948.jpg';

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

export const productPortfolioMedia = {
  'ace-plus': {
    ...ownerApproved,
    displayMode: 'mixed',
    description: 'A selection of completed Ace Plus installations, shown in context and in use across different workplaces.',
    displayImageOrder: [
      { projectName: 'Everllence', imageIndex: 0 },
      { projectName: "Taylor's College", imageIndex: 0 },
      { projectName: 'Everllence', imageIndex: 2 },
      { projectName: "Taylor's College", imageIndex: 1 },
      { projectName: 'Everllence', imageIndex: 4 }
    ],
    projects: [
      {
        projectName: 'Everllence',
        location: 'Kuala Lumpur',
        description: 'A completed Ace Plus installation shown in context, in use, and set up for focused work.',
        images: [
          {
            src: everllenceOfficeWide01,
            alt: 'Ace Plus installation in the Everllence open-plan office',
            role: 'lead',
            objectPosition: 'center 68%'
          },
          {
            src: everllenceInUse,
            alt: 'Ace Plus being used inside the Everllence workplace',
            role: 'in-use',
            objectPosition: 'center 56%'
          },
          {
            src: everllenceBrandedFront,
            alt: 'Front view of the installed Ace Plus pod at Everllence',
            role: 'installed-pod',
            objectPosition: 'center 48%'
          },
          {
            src: everllenceOpenDoor,
            alt: 'Ace Plus with the door open at Everllence',
            role: 'installed-pod',
            objectPosition: 'center 44%'
          },
          {
            src: everllenceInterior,
            alt: 'Ace Plus interior with worktop and lighting at Everllence',
            role: 'interior-use',
            objectPosition: 'center 48%'
          }
        ]
      },
      {
        projectName: "Taylor's College",
        location: 'Subang Jaya',
        description: "An Ace Plus installation at Taylor's College, shown from the front and configured for seated focused work.",
        images: [
          {
            src: taylorsAcePlusFront,
            alt: "Front view of the Ace Plus pod at Taylor's College",
            role: 'lead',
            objectPosition: 'center 48%'
          },
          {
            src: taylorsAcePlusStool,
            alt: "Ace Plus with a high stool at Taylor's College",
            role: 'in-use',
            objectPosition: 'center 50%'
          },
          {
            src: taylorsAcePlusInterior,
            alt: "Ace Plus interior and worktop at Taylor's College",
            role: 'interior-use',
            objectPosition: 'center 50%'
          },
          {
            src: taylorsAcePlusOpenDoor,
            alt: "Ace Plus with the door open at Taylor's College",
            role: 'installed-pod',
            objectPosition: 'center 50%'
          }
        ]
      }
    ]
  },
  'ace-flex': {
    ...ownerApproved,
    projectName: 'Parker Hannifin',
    location: 'Kuala Lumpur',
    description: 'A completed Ace Flex installation shown from the outside and in use inside a working office.',
    images: [
      {
        src: parkerFlexOfficeWide,
        alt: 'Ace Flex installation in the Parker Hannifin workplace',
        role: 'lead',
        objectPosition: 'center 52%'
      },
      {
        src: parkerFlexInUse,
        alt: 'Ace Flex in use inside the Parker Hannifin workplace',
        role: 'in-use',
        objectPosition: 'center 52%'
      },
      {
        src: parkerFlexInstalled,
        alt: 'Installed Ace Flex pod at Parker Hannifin',
        role: 'installed-pod',
        objectPosition: 'center 50%'
      },
      {
        src: parkerFlexInterior,
        alt: 'Ace Flex interior worktop at Parker Hannifin',
        role: 'interior-use',
        objectPosition: 'center 52%'
      }
    ]
  },
  'ace-meet': {
    ...ownerApproved,
    projectName: 'Brenntag',
    location: 'Shah Alam, Selangor',
    description: 'A completed Ace Meet installation shown in workplace context, in use, and from inside the meeting space.',
    images: [
      {
        src: brenntagOfficeWide,
        alt: 'Ace Meet installation in the Brenntag workplace',
        role: 'lead',
        objectPosition: 'center 52%'
      },
      {
        src: brenntagPodsWide,
        alt: 'Ace Meet installation viewed across the Brenntag office',
        role: 'office-context',
        objectPosition: 'center 52%'
      },
      {
        src: brenntagPodPair,
        alt: 'Installed Ace Meet pod at Brenntag',
        role: 'installed-pod',
        objectPosition: 'center 50%'
      },
      {
        src: brenntagPodInUse,
        alt: 'Ace Meet in use inside the Brenntag workplace',
        role: 'in-use',
        objectPosition: 'center 50%'
      },
      {
        src: brenntagPodDetail,
        alt: 'Ace Meet interior and finish detail at Brenntag',
        role: 'detail',
        objectPosition: 'center 50%'
      },
      {
        src: brenntagPodFront,
        alt: 'Front view of the installed Ace Meet pod at Brenntag',
        role: 'installed-pod',
        objectPosition: 'center 50%'
      }
    ]
  },
  'ace-hub': {
    ...ownerApproved,
    projectName: 'Ace Hub installation',
    description: 'A completed Ace Hub installation shown in workplace context and from inside the furnished meeting space.',
    images: [
      {
        src: aceHubOfficeWide,
        alt: 'Ace Hub installation in a completed workplace',
        role: 'lead',
        objectPosition: 'center 52%'
      },
      {
        src: aceHubOpenDoor,
        alt: 'Ace Hub with the door open in a completed workplace',
        role: 'installed-pod',
        objectPosition: 'center 50%'
      },
      {
        src: aceHubInteriorWide,
        alt: 'Ace Hub interior with meeting seating and work surface',
        role: 'interior-use',
        objectPosition: 'center 52%'
      },
      {
        src: aceHubInteriorTable,
        alt: 'Ace Hub meeting table and interior finish',
        role: 'interior-use',
        objectPosition: 'center 48%'
      },
      {
        src: aceHubInteriorDetail,
        alt: 'Ace Hub interior detail in a completed workplace',
        role: 'detail',
        objectPosition: 'center 50%'
      }
    ]
  }
};
