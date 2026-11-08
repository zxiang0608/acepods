/**
 * Research records for products that are not yet eligible for the
 * media-ready catalogue or merchant feed. The records may power clearly
 * labelled prelaunch pages, but remaining finish, acoustic, and project-term
 * evidence is still required before normal product publication.
 */

export const PROVISIONAL_PRODUCT_RESEARCH = Object.freeze([
  {
    slug: 'ace-pod-one',
    name: 'Ace Pod One',
    publicationStatus: 'pending-technical-and-commercial-review',
    source: {
      officialProductName: 'MONO Office Phone Booth',
      productPage: 'https://winpodacoustics.com/mono/',
      brochure: 'https://winpodacoustics.com/wp-content/uploads/2026/07/XBace-Brochure_Mono-Tetra.pdf',
      reviewedOn: '2026-09-07'
    },
    fields: {
      capacity: { status: 'verified', value: '1 person' },
      listedPrice: {
        status: 'not-published',
        reason: 'The official MONO source does not list Ace pricing; the customer-facing record uses the owner-confirmed finalPrice below.'
      },
      finalPrice: {
        status: 'verified',
        value: 15550,
        currency: 'MYR',
        basis: 'Standard single-pod Klang Valley total: RM14,650 pod + RM400 delivery per trip + RM500 installation = RM15,550; delivery updated by the owner on 19 October 2026.',
        confirmedOn: '2026-10-19'
      },
      intendedUse: {
        status: 'verified',
        value: ['Uninterrupted individual work', 'Important phone calls', 'Virtual meetings']
      },
      externalDimensions: {
        status: 'verified',
        value: { width: 1000, depth: 1000, height: 2170, unit: 'mm' }
      },
      internalDimensions: {
        status: 'verified',
        value: { width: 800, depth: 910, height: 2000, unit: 'mm' }
      },
      builtInTable: {
        status: 'verified',
        value: { width: 744, depth: 300, height: 25, unit: 'mm' }
      },
      materials: {
        status: 'verified',
        value: [
          '1.2 mm electro-galvanised steel structure',
          'Exterior epoxy powder coating',
          'Interior polyester-fibre acoustic board',
          'Black polyester-fibre carpet flooring',
          'Tempered-glass front door with aluminium frame',
          '10 mm tempered-glass rear panel'
        ]
      },
      equipment: {
        status: 'verified',
        value: [
          'Universal socket with ventilation-fan speed control and dimmable-light control, rated 110V–250V',
          'Two dual-speed bearing ventilation fans, 12VDC',
          'One 11W 4000K LED light',
          '12VDC motion sensor',
          'Maximum power draw 40W'
        ]
      },
      exteriorFinish: {
        status: 'verified',
        value: 'Standard exterior white; other colours are listed as extra-cost options.'
      },
      warranty: {
        status: 'verified',
        value: '1 year for manufacturing defects and electronic components'
      },
      weightAndPacking: {
        status: 'verified',
        value: {
          netWeight: '320 kg',
          packedWeight: '400 kg',
          packingSize: '2280W × 1140D × 670H mm',
          packedVolume: 'Approximately 1.9 m³'
        }
      },
      deliveryAndInstallation: {
        status: 'verified',
        value: {
          delivery: 'RM400 standard Klang Valley delivery per trip',
          installation: 'RM500 standard Klang Valley installation'
        },
        basis: 'Owner-confirmed as the same delivery and installation treatment as Ace Plus on 6 September 2026.',
        scopeNote: 'Outstation, restricted-access, and non-standard project scopes may vary.'
      },
      acousticClaim: {
        status: 'pending',
        value: 'The supplier brochure states “DSA - ISO 23351-1 Standard 23.5dB” for the Mono and Tetra brochure spread.',
        reason: 'A model-specific acoustic test report and configuration record were not supplied, so the figure is not published as an Ace product claim.'
      },
      technicalDrawing: {
        status: 'verified',
        source: 'XBace Mono/Tetra brochure, page 5',
        asset: 'assets/products/ace-pod-one/technical-drawing/ace-pod-one-dimensions.png',
        note: 'Dimension crop added from the owner-provided official brochure; no additional product-gallery image was added.'
      },
      approvedCatalogueImage: {
        status: 'approved',
        sourceFile: 'assets/products/ace-pod-one/gallery/supreme-satu-angle.png',
        publishedFile: 'assets/products/catalog/ace-pod-one.png',
        role: 'catalogue-master',
        approvedOn: '2026-09-06'
      },
      approvedGallery: {
        status: 'approved',
        source: 'https://supreme.com.my/products/satu-office-pod',
        approvedOn: '2026-09-06',
        displayOrder: [
          'assets/products/ace-pod-one/gallery/ace-pod-one-front.png',
          'assets/products/ace-pod-one/gallery/ace-pod-one-angle.png'
        ]
      },
      completeFinishSchedule: { status: 'pending' }
    }
  },
  {
    slug: 'ace-pod-four',
    name: 'Ace Pod Four',
    publicationStatus: 'pending-specification-review',
    source: {
      officialProductName: 'TETRA Meeting Pod',
      productPage: 'https://winpodacoustics.com/tetra/',
      brochure: 'https://winpodacoustics.com/wp-content/uploads/2026/07/XBace-Brochure_Mono-Tetra.pdf',
      reviewedOn: '2026-09-07'
    },
    fields: {
      capacity: { status: 'verified', value: 'Up to 4 people' },
      listedPrice: {
        status: 'not-published',
        reason: 'The official TETRA source does not list Ace pricing; the customer-facing record uses the owner-confirmed finalPrice below.'
      },
      finalPrice: {
        status: 'verified',
        value: 31550,
        currency: 'MYR',
        basis: 'Standard single-pod Klang Valley total: RM30,400 pod + RM400 delivery per trip + RM750 installation = RM31,550; delivery updated by the owner on 19 October 2026.',
        confirmedOn: '2026-10-19'
      },
      externalDimensions: {
        status: 'verified',
        value: { width: 2200, depth: 1200, height: 2170, unit: 'mm' }
      },
      internalDimensions: {
        status: 'verified',
        value: { width: 2000, depth: 1120, height: 2000, unit: 'mm' }
      },
      builtInTable: {
        status: 'verified',
        value: { width: 700, depth: 550, height: 25, unit: 'mm' }
      },
      intendedUse: {
        status: 'verified',
        value: ['Meetings', 'Brainstorming', 'One-to-one discussions', 'Private collaboration']
      },
      materials: {
        status: 'verified',
        value: [
          '1.2 mm electro-galvanised steel structure',
          'Exterior epoxy powder coating',
          'Interior polyester-fibre acoustic board',
          'Black polyester-fibre carpet flooring',
          'Tempered-glass front door with aluminium frame',
          '10 mm tempered-glass rear panel'
        ]
      },
      equipment: {
        status: 'verified',
        value: [
          'Universal 110V–250V power socket with fan-speed and dimmable-light controls',
          'Four dual-speed bearing ventilation fans, 12VDC',
          'Two 11W 4000K LED lights',
          '12VDC motion sensor',
          'Maximum power draw 62W'
        ]
      },
      exteriorFinish: { status: 'verified', value: 'Standard exterior white; other colours are listed as extra-cost options.' },
      deliveryAndInstallation: {
        status: 'verified',
        value: {
          delivery: 'RM400 standard Klang Valley delivery per trip',
          installation: 'RM750 standard Klang Valley installation'
        },
        basis: 'Owner-confirmed as the same delivery and installation treatment as Ace Meet on 6 September 2026.',
        scopeNote: 'Outstation, restricted-access, and non-standard project scopes may vary.'
      },
      warranty: { status: 'verified', value: '1 year for manufacturing defects and electronic components' },
      weightAndPacking: {
        status: 'verified',
        value: {
          netWeight: '650 kg',
          packedWeight: '800 kg',
          packingSize: '2280W × 1000D × 1420H mm + 1100W × 560D × 730H mm (sofa)',
          packedVolume: 'Approximately 3.24 m³ + 0.45 m³ (sofa)'
        }
      },
      acousticClaim: {
        status: 'pending',
        value: 'The supplier brochure states “DSA - ISO 23351-1 Standard 23.5dB” for the Mono and Tetra brochure spread.',
        reason: 'A model-specific acoustic test report and configuration record were not supplied, so the figure is not published as an Ace product claim.'
      },
      technicalDrawing: {
        status: 'verified',
        source: 'XBace Mono/Tetra brochure, page 5',
        asset: 'assets/products/ace-pod-four/technical-drawing/ace-pod-four-dimensions.png',
        note: 'Dimension crop added from the owner-provided official brochure; no additional product-gallery image was added.'
      },
      approvedCatalogueImage: {
        status: 'approved',
        sourceFile: 'assets/products/ace-pod-four/gallery/supreme-quattro-angle.png',
        publishedFile: 'assets/products/catalog/ace-pod-four.png',
        role: 'catalogue-master',
        approvedOn: '2026-09-06'
      },
      approvedGallery: {
        status: 'approved',
        source: 'https://supreme.com.my/products/quattro-office-pod',
        approvedOn: '2026-09-06',
        displayOrder: [
          'assets/products/ace-pod-four/gallery/ace-pod-four-front.png',
          'assets/products/ace-pod-four/gallery/ace-pod-four-angle.png',
          'assets/products/ace-pod-four/gallery/ace-pod-four-lifestyle.png'
        ]
      },
      completeFinishSchedule: { status: 'pending' }
    }
  }
]);
