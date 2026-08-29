import supplierMaterialMarks from '../../assets/high-res-pod-cert.png';

const ACE_MODEL_SLUGS = ['ace-uno', 'ace-plus', 'ace-flex', 'ace-flex-duo', 'ace-meet', 'ace-hub'];

// Customer-facing marks authorised by Ace Workplace Solutions for the entire current Ace range.
// This is an owner-confirmed scope record, not an independent certification verification record.
export const ACE_RANGE_MATERIAL_MARKS = {
  image: supplierMaterialMarks,
  alt: 'Ace product material and certification marks',
  modelsCovered: ACE_MODEL_SLUGS,
  source: 'Ace Workplace Solutions owner confirmation',
  reviewedOn: '2026-08-29',
  verificationStatus: 'owner-confirmed',
  publicDisplayApproved: true
};

export const getProductMaterialMarks = (slug) =>
  ACE_RANGE_MATERIAL_MARKS.publicDisplayApproved && ACE_RANGE_MATERIAL_MARKS.modelsCovered.includes(slug)
    ? ACE_RANGE_MATERIAL_MARKS
    : null;
